from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
import os
from openai import OpenAI
from mistralai import Mistral
from dotenv import load_dotenv
import json
from tts.tts import synthesize

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__, static_url_path='/static')
# Configure CORS to allow all origins with proper headers
CORS(app, resources={
    r"/api/*": {
        "origins": "*",
        "allow_headers": ["Content-Type", "Authorization"],
        "methods": ["POST", "OPTIONS"]
    }
})

# API configuration
API_PROVIDER = os.getenv("API_PROVIDER", "albert")  # Default to albert if not specified

# Albert (OpenAI) client configuration
albert_base_url = "https://albert.api.etalab.gouv.fr/v1"
albert_api_key = os.getenv("API_KEY")
albert_client = OpenAI(base_url=albert_base_url, api_key=albert_api_key)

# Mistral client configuration
mistral_api_key = os.getenv("MISTRAL_API_KEY")
mistral_client = Mistral(api_key=mistral_api_key)

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/api/chat', methods=['POST'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def chat():
    try:
        data = request.json
        messages = data.get('messages', [])
        stream = data.get('stream', False)
        provider = data.get('provider', API_PROVIDER)

        if provider == "albert":
            response = albert_client.chat.completions.create(
                model="neuralmagic/Meta-Llama-3.1-70B-Instruct-FP8",
                messages=messages,
                stream=stream,
                temperature=0.7
            )

            if not stream:
                return jsonify({
                    'content': response.choices[0].message.content,
                    'role': response.choices[0].message.role
                })
            else:
                def generate():
                    for chunk in response:
                        if chunk.choices[0].finish_reason is not None:
                            break
                        if chunk.choices[0].delta.content:
                            yield f"data: {chunk.choices[0].delta.content}\n\n"
                
                return app.response_class(
                    generate(),
                    mimetype='text/event-stream',
                    headers={
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'text/event-stream'
                    }
                )
        else:  # provider == "mistral"
            if stream:
                response = mistral_client.chat.stream(
                    model="mistral-large-latest",
                    messages=messages
                )
                
                def generate():
                    for chunk in response:
                        if chunk.data.choices[0].delta.content:
                            yield f"data: {chunk.data.choices[0].delta.content}\n\n"
                
                return app.response_class(
                    generate(),
                    mimetype='text/event-stream',
                    headers={
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'text/event-stream'
                    }
                )
            else:
                response = mistral_client.chat.complete(
                    model="mistral-large-latest",
                    messages=messages
                    # ,
                    #   response_format = {
                    #     "type": "json_object"
                    # }
                )
                return jsonify({
                    'content': response.choices[0].message.content,
                    'role': response.choices[0].message.role
                })

    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route('/api/chat-json', methods=['POST'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def chat_json():
    try:
        data = request.json
        messages = data.get('messages', [])
        stream = data.get('stream', False)
        provider = "mistral"

        if provider == "albert":
            response = albert_client.chat.completions.create(
                model="neuralmagic/Meta-Llama-3.1-70B-Instruct-FP8",
                messages=messages,
                stream=stream,
                temperature=0.7
            )

            return jsonify({
                'content': response.choices[0].message.content,
                'role': response.choices[0].message.role
            })
           
        else:  # provider == "mistral"
            response = mistral_client.chat.complete(
                model="mistral-large-latest",
                messages=messages,
                temperature=0.1,
                top_p=0.1,
                response_format = {
                    "type": "json_object"
                }
            )
            return jsonify(json.loads(response.choices[0].message.content))

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@app.route("/api/tts", methods=["POST"])
def app_synthesize() -> bytes:
    text = request.data.decode("utf-8")
    text = text.strip()
    return synthesize(text)

@app.route('/api/stt', methods=['POST'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def app_transcribe():
    try:
        file = request.files.get('file')
        data = {
            "model": "openai/whisper-large-v3",
            "response_format": "json",
            "temperature": 0.2,
            "file": file.read(),
        }
        response = albert_client.audio.transcriptions.create(**data)
        return response.text

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# New route: stt2 using OpenAI's official API for Whisper
@app.route('/api/stt2', methods=['POST'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def stt2():
    try:
        file = request.files.get('file')
        if not file:
            return jsonify({'error': 'No file provided'}), 400

        # Initialize OpenAI client properly
        openai_client = OpenAI(
            api_key=os.getenv("OPENAI_API_KEY"),
            base_url="https://api.openai.com/v1"
        )

        # Create a temporary file to store the audio
        import tempfile
        temp_dir = tempfile.mkdtemp()
        temp_path = os.path.join(temp_dir, 'audio.wav')
        
        try:
            file.save(temp_path)
            
            # Check file size (25MB limit)
            file_size = os.path.getsize(temp_path)
            if file_size > 25 * 1024 * 1024:
                return jsonify({'error': 'File size exceeds 25MB limit'}), 400

            # Open and transcribe the file
            with open(temp_path, 'rb') as audio_file:
                transcription = openai_client.audio.transcriptions.create(
                    model="whisper-1",
                    file=audio_file,
                    response_format="text"
                )
            
            return transcription

        finally:
            # Clean up temporary files
            import shutil
            shutil.rmtree(temp_dir, ignore_errors=True)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Change to unused port