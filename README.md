# Albertine - Web Accessibility Assistant - GenAI Hackathon for Public Good

A Chrome extension designed to make the internet more accessible and less overwhelming by providing AI-powered navigation and accessibility features.

## 🌟 Project Overview

This project was developed for the GenAI Hackathon for Public Good with the mission of making the web more accessible to everyone. By combining the power of various AI models and accessibility tools, we've created a solution that helps users navigate and interact with web content more effectively.

## ✨ Features

- **Smart Web Navigation**: Helps users navigate complex websites with AI-powered assistance
- **Voice Interaction**: Supports voice commands and text-to-speech functionality
- **Speech-to-Text**: Converts spoken words to text using   Whisper 
- **AI-Powered Assistance**: Leverages Mistral or Albert API for intelligent content processing
- **Text-to-Speech**: Uses Piper for high-quality voice synthesis

## 🛠️ Technical Stack

### Frontend
- Google Chrome Extension
- HTML/CSS/JavaScript
- Chrome Extension APIs

### Backend
- Flask (Python web framework)
- AI Models and APIs:
  - Mistral/Albert API for inference
  - OpenAI Whisper/Albert API for speech-to-text
  - Piper for text-to-speech synthesis

## 🚀 Getting Started

### Prerequisites
- Google Chrome browser
- Python 3.x
- Required Python packages (install using `pip install -r requirements.txt`)

### Installation
1. Clone the repository
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Load the Chrome extension:
   - Open Chrome
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `extension` folder

### Configuration
1. Set up your environment variables in `.env` file:
   ```
   MISTRAL_API_KEY=your_key_here
   API_KEY=your_key_here
   ```

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- GenAI Hackathon for Public Good organizers
- All contributors and testers
- Open-source AI community

## Team Members

- Myriam Fogelman
- Fana Rakotoasibola
- Johnny Moacdieh
- Richard Jarry


---

Made with ❤️ for making the web more accessible to everyone.
