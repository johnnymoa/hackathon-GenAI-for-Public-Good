import io
import wave
from piper.voice import PiperVoice

voice = PiperVoice.load(
    model_path="tts/fr-fr_FR-siwis-medium.onnx",
    config_path="tts/fr-fr_FR-siwis-medium.json"
)

def synthesize(text: str) -> bytes:

    with io.BytesIO() as wav_io:
        with wave.open(wav_io, "wb") as wav_file:
            voice.synthesize(text, wav_file)

        return wav_io.getvalue()
