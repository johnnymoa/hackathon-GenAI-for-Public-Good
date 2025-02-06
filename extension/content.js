// Create and inject styles for the info button and chat modal
const style = document.createElement('style');
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap');

  .accessibility-info-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background-color: #2980b9;
    color: white;
    border: none;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    z-index: 999999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Lexend', sans-serif;
    transition: all 0.3s ease;
  }

  .accessibility-info-button:hover {
    transform: scale(1.1);
    background-color: #1f6da3;
    box-shadow: 0 6px 12px rgba(0,0,0,0.3);
  }

  .chat-modal {
    display: none;
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 470px;
    height: 600px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    z-index: 999998;
    overflow: hidden;
    font-family: 'Lexend', sans-serif;
    transform-origin: bottom right;
  }

  .chat-modal.active {
    display: flex;
    flex-direction: column;
  }

  .chat-header {
    background: #2980b9;
    color: white;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    font-family: 'Lexend', sans-serif;
  }

  .chat-header-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 15px;
  }

  .chat-header-options {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    padding: 8px 15px;
    background: rgba(0, 0, 0, 0.1);
    font-size: 0.9em;
  }

  .auto-read-toggle {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    font-family: 'Lexend', sans-serif;
  }

  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
  }

  .toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 20px;
  }

  .toggle-slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  .toggle-switch input:checked + .toggle-slider {
    background-color: #2ecc71;
  }

  .toggle-switch input:checked + .toggle-slider:before {
    transform: translateX(20px);
  }

  .close-chat {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    padding: 0;
    font-family: 'Lexend', sans-serif;
  }

  #chat-container {
    flex-grow: 1;
    padding: 15px;
    overflow-y: auto;
    background: #f8f9fa;
    font-family: 'Lexend', sans-serif;
  }

  .message {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    max-width: 80%;
    word-wrap: break-word;
    white-space: pre-wrap;
    font-family: 'Lexend', sans-serif;
  }

  .message-content {
    margin-bottom: 8px;
  }

  .message-actions {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 8px;
    margin-top: 8px;
  }

  .user-message {
    background-color: #e3f2fd;
    margin-left: 20%;
  }

  .assistant-message {
    background-color: #ffffff;
    margin-right: 20%;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .play-audio-button {
    background-color: #2980b9;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 12px;
    cursor: pointer;
    margin-top: 5px;
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: 'Lexend', sans-serif;
  }

  .highlighted-elements {
    list-style: none;
    padding: 0;
    margin: 8px 0 0 0;
    font-family: 'Lexend', sans-serif;
  }

  .highlighted-elements li {
    margin: 4px 0;
  }

  .highlighted-elements a {
    color: #3498db;
    text-decoration: none;
    display: block;
    padding: 4px 8px;
    border-radius: 4px;
    transition: background-color 0.2s;
    font-family: 'Lexend', sans-serif;
  }

  .highlighted-elements a:hover {
    background-color: #f5f5f5;
  }

  .play-audio-button:hover {
    background-color: #1f6da3;
  }

  .play-audio-button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }

  .audio-loading {
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 2px solid #ffffff;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  #input-container {
    padding: 15px;
    background: white;
    border-top: 1px solid #eee;
    display: flex;
    gap: 10px;
    font-family: 'Lexend', sans-serif;
  }

  #user-input {
    flex-grow: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    font-family: 'Lexend', sans-serif;
  }

  #send-button {
    padding: 8px 15px;
    background-color: #2980b9;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Lexend', sans-serif;
  }

  #send-button:hover {
    background-color: #1f6da3;
  }

  #voice-record-button {
    padding: 8px 12px;
    background: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
    font-family: 'Lexend', sans-serif;
  }

  #voice-record-button:hover {
    background-color: #f0f0f0;
  }

  #voice-record-button.recording {
    background-color: #ff4444;
    color: white;
    border-color: #ff4444;
  }

  .accessibility-highlight {
    background-color: rgba(255, 235, 59, 0.5) !important;
    position: relative !important;
    z-index: 999997 !important;
    transition: all 0.3s ease;
    padding: 5px !important;
    margin: -2px !important;
    cursor: pointer !important;
  }

  .accessibility-highlight::after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border: 2px solid #ff9800;
    border-radius: 6px;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    .accessibility-info-button {
      width: 60px;
      height: 60px;
      font-size: 28px;
    }

    .chat-modal {
      width: 90%;
      height: 80%;
      bottom: 100px;
      right: 5%;
    }
  }

  /* Typing loader indicator styles */
  .typing-loader span {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 2px;
    background: #555;
    border-radius: 50%;
    animation: typing 1.4s infinite ease-in-out both;
  }

  .typing-loader span:nth-child(1) {
    animation-delay: -0.32s;
  }

  .typing-loader span:nth-child(2) {
    animation-delay: -0.16s;
  }

  @keyframes typing {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }
`;

document.head.appendChild(style);

// Create the chat modal HTML
function createChatModal() {
    const modal = document.createElement('div');
    modal.className = 'chat-modal';
    modal.innerHTML = `
        <div class="chat-header">
            <div class="chat-header-main">
                <span>Albertine</span>
                <button class="close-chat">×</button>
            </div>
            <div class="chat-header-options">
                <div class="auto-read-toggle">
                    <label class="toggle-switch">
                        <input type="checkbox" id="auto-read-toggle">
                        <span class="toggle-slider"></span>
                    </label>
                    <span>Auto-lecture</span>
                </div>
                <button class="reset-chat" title="Nouvelle session">Nouvelle session</button>
            </div>
        </div>
        <div id="chat-container"></div>
        <div id="input-container">
            <input type="text" id="user-input" placeholder="Tapez votre message...">
            <button id="voice-record-button" title="Enregistrer un message vocal">🎤</button>
            <button id="send-button">Envoyer</button>
            <audio id="audioPlayback" style="display: none;"></audio>
        </div>
    `;
    return modal;
}

// Create the info button
function createInfoButton() {
    console.log("Creating info button");
    const button = document.createElement('button');
    button.className = 'accessibility-info-button';
    button.innerHTML = 'A';
    button.setAttribute('aria-label', 'Information sur l\'accessibilité');
    button.title = 'Information sur l\'accessibilité';
    
    // Add click handler to show chat modal
    button.addEventListener('click', () => {
        const existingModal = document.querySelector('.chat-modal');
        if (existingModal) {
            existingModal.classList.add('active');
        } else {
            const modal = createChatModal();
            document.body.appendChild(modal);
            modal.classList.add('active');
            
            // Add event listeners for chat functionality
            setupChatEventListeners(modal);
        }
    });
    
    return button;
}

// Function to tag elements with unique accessibility IDs
function tagAccessibilityElements() {
    const elementTypes = {
        header: 'h1, h2, h3, h4, h5, h6',
        link: 'a',
        paragraph: 'p',
        button: 'button',
        input: 'input, textarea, select',
        landmark: '[role="navigation"], [role="main"], [role="search"]'
    };

    Object.entries(elementTypes).forEach(([type, selector]) => {
        Array.from(document.querySelectorAll(selector)).forEach((el, index) => {
            // Skip elements that are part of our accessibility interface
            if (el.closest('.accessibility-info-button') || el.closest('.chat-modal')) {
                return;
            }
            
            if (!el.getAttribute('data-accessibility-id')) {
                el.setAttribute('data-accessibility-id', `${type}-${index}`);
            }
        });
    });
}

// Function to clear existing highlights
function clearHighlights() {
    document.querySelectorAll('.accessibility-highlight').forEach(el => {
        el.classList.remove('accessibility-highlight');
    });
}

// Function to highlight and scroll to an element by ID
function highlightElementById(id) {
    const element = document.querySelector(`[data-accessibility-id="${id}"]`);
    if (element) {
        element.classList.add('accessibility-highlight');
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        console.log(element);
        
        // Check immediate children for aria-expanded attribute
        const immediateChildren = Array.from(element.children);
        const expandableChild = immediateChildren.find(child => child.hasAttribute('aria-expanded'));
        
        if (expandableChild && expandableChild.getAttribute('aria-expanded') === 'false') {
            expandableChild.click();
        }
    }
}

// Function to observe DOM changes
function observeDOMChanges() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                tagAccessibilityElements();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Update getPageContext function to include accessibility IDs
function getPageContext() {
    const pageInfo = {
        url: window.location.href,
        title: document.title,
        domain: window.location.hostname,
        path: window.location.pathname
    };
    
    const links = Array.from(document.querySelectorAll('a'))
        .filter(link => link.textContent.trim() !== '')
        .map(link => ({ 
            id: link.getAttribute('data-accessibility-id'),
            text: link.textContent.trim(), 
            href: link.href,
            element: link
        }));
    
    const headers = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
        .filter(header => header.textContent.trim() !== '')
        .map(header => ({ 
            id: header.getAttribute('data-accessibility-id'),
            tag: header.tagName, 
            text: header.textContent.trim(),
            element: header
        }));
    
    const paragraphs = Array.from(document.querySelectorAll('p'))
        .filter(p => p.textContent.trim() !== '')
        .map(p => ({ 
            id: p.getAttribute('data-accessibility-id'),
            text: p.textContent.trim(),
            element: p
        }));
    
    return { pageInfo, links, headers, paragraphs };
}

function setupChatEventListeners(modal) {
    const closeButton = modal.querySelector('.close-chat');
    const resetButton = modal.querySelector('.reset-chat');
    const input = modal.querySelector('#user-input');
    const sendButton = modal.querySelector('#send-button');
    const voiceButton = modal.querySelector('#voice-record-button');
    const chatContainer = modal.querySelector('#chat-container');
    let messages = [];
    
    // Add voice recording variables
    let mediaRecorder;
    let audioChunks = [];
    let recordingStream = null;
    let isRecording = false;

    async function startRecording() {
        try {
            audioChunks = [];
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: true,
                video: false
            });
            recordingStream = stream;
            mediaRecorder = new MediaRecorder(stream);
            
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.push(event.data);
                }
            };
            
            mediaRecorder.onstop = async () => {
                if (audioChunks.length > 0) {
                    // Show transcription loader indicator
                    const transcriptionLoader = document.createElement('div');
                    transcriptionLoader.className = 'message assistant-message';
                    transcriptionLoader.innerHTML = '<div class="message-content"><div class="typing-loader"><span></span><span></span><span></span></div><div>Transcription en cours...</div></div>';
                    chatContainer.appendChild(transcriptionLoader);
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                    
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    const formData = new FormData();
                    formData.append('file', audioBlob, 'recording.wav');
                    
                    try {
                        const response = await fetch('http://localhost:5001/api/stt2', {
                            method: 'POST',
                            body: formData
                        });
                        
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        
                        const transcription = await response.text();
                        transcriptionLoader.remove();
                        input.value = transcription;
                        // Programmatically trigger sending the transcribed message
                        sendMessage();
                    } catch (error) {
                        console.error('Error transcribing audio:', error);
                        transcriptionLoader.remove();
                        addMessage('Désolé, une erreur est survenue lors de la transcription audio.', 'assistant');
                    } finally {
                        // Stop all tracks to free up the microphone
                        stream.getTracks().forEach(track => track.stop());
                    }
                }
            };
            
            // Start recording with 1-second timeslices
            mediaRecorder.start(1000);
            voiceButton.classList.add('recording');
            voiceButton.textContent = '⏹️';
            isRecording = true;
            console.log("Recording started");
            
        } catch (error) {
            console.error('Error accessing microphone:', error);
            if (error.name === 'NotAllowedError') {
                addMessage('Veuillez autoriser l\'accès au microphone dans les paramètres de votre navigateur.', 'assistant');
            } else {
                addMessage('Désolé, impossible d\'accéder au microphone.', 'assistant');
            }
        }
    }

    function stopRecording() {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            voiceButton.classList.remove('recording');
            voiceButton.textContent = '🎤';
            isRecording = false;
            console.log("Recording stopped");
            
            // Clean up the stream
            if (recordingStream) {
                recordingStream.getTracks().forEach(track => track.stop());
                recordingStream = null;
            }
        }
    }

    // Add voice button click handler
    voiceButton.addEventListener('click', () => {
        if (!isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    });

    const domainKey = window.location.hostname;

    // Persist chat history for current domain
    function persistChatHistory() {
        chrome.storage.local.set({ ["chatHistory-" + domainKey]: messages });
    }
    
    // Render chat history (skipping system messages) without modifying stored messages
    function renderChatHistory() {
        chatContainer.innerHTML = "";
        messages.forEach(msg => {
            if (msg.role !== 'system') {
                addMessage(msg.content, msg.role, false);
            }
        });
    }

    // Get page context for system instructions
    const pageContext = getPageContext();
    
    const systemMessage = {
        role: 'system',
        content: `You are an accessibility assistant helping users navigate this webpage. Respond ONLY with JSON containing a "response" and "highlights".
    
Current Page Information:
- URL: ${pageContext.pageInfo.url}
- Title: ${pageContext.pageInfo.title}
- Domain: ${pageContext.pageInfo.domain}
- Path: ${pageContext.pageInfo.path}
    
Page Context:

Links:
${pageContext.links.map(link => `- ID: ${link.id}, Text: "${link.text}" (${link.href})`).join('\n')}
    
Headers:
${pageContext.headers.map(header => `- ID: ${header.id}, ${header.tag}: "${header.text}"`).join('\n')}
    
Paragraphs:
${pageContext.paragraphs.map(p => `- ID: ${p.id}, Text: "${p.text}"`).join('\n')}
    
Response Format:
{
    "response": "HTML of the Chat message responding to the user's question in html format, the response should be in the same language as the user's question",
    "highlights": ["header-0", "link-3"] // Array of data-accessibility-ids to highlight
}
    
Rules:
1. ALWAYS respond with valid JSON only
2. Reference elements ONLY by their data-accessibility-id in highlights array
3. Never mention the IDs in the response text
4. Only include relevant IDs in highlights array
5. Keep response natural and conversational
6. Never include markdown formatting
7. Highlight all elements retaining to the user's question
8. If the user ask to be guided through a process relating to the page, make him a numbered steps list then highlight progressively each step
9. Make sure to include in the response carriage return to make the response more readable`
    };
    
    // Modified addMessage function accepts a third optional parameter 'store' (default true).
    function addMessage(content, role, store = true) {
        // Do not render system messages
        if (role === 'system') {
            if (store) {
                messages.push({ role, content });
                persistChatHistory();
            }
            return;
        }
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}-message`;
        
        // Create content container
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = content;
        messageDiv.appendChild(contentDiv);

        if (role === 'assistant') {
            // Create actions container
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'message-actions';

            // Add play button
            const playButton = document.createElement('button');
            playButton.className = 'play-audio-button';
            playButton.innerHTML = 'Lire la réponse';
            
            const playAudio = async function() {
                try {
                    playButton.disabled = true;
                    const originalText = playButton.innerHTML;
                    playButton.innerHTML = '<span class="audio-loading"></span> Chargement...';
                    
                    // Strip HTML tags for TTS to avoid reading HTML markup
                    const textContent = content.replace(/<[^>]*>/g, '');
                    
                    const response = await fetch('http://localhost:5001/api/tts', {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'text/plain'
                        },
                        body: textContent
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    
                    // Get the audio data as a blob directly
                    const audioBlob = await response.blob();
                    if (!audioBlob) {
                        throw new Error('No audio data received');
                    }

                    // Create a new Audio element for each playback
                    const audio = new Audio();
                    const audioUrl = URL.createObjectURL(audioBlob);
                    audio.src = audioUrl;
                    
                    audio.onerror = (e) => {
                        console.error('Audio error:', e);
                        URL.revokeObjectURL(audioUrl);
                        playButton.disabled = false;
                        playButton.innerHTML = '❌ Erreur audio';
                        setTimeout(() => { playButton.innerHTML = originalText; }, 2000);
                    };
                    
                    audio.oncanplay = () => {
                        audio.play().catch(error => {
                            console.error('Playback error:', error);
                            URL.revokeObjectURL(audioUrl);
                            playButton.disabled = false;
                            playButton.innerHTML = '❌ Erreur lecture';
                            setTimeout(() => { playButton.innerHTML = originalText; }, 2000);
                        });
                    };
                    
                    audio.onended = () => {
                        URL.revokeObjectURL(audioUrl);
                        playButton.disabled = false;
                        playButton.innerHTML = originalText;
                    };
                    
                } catch (error) {
                    console.error('Error playing audio:', error);
                    playButton.disabled = false;
                    playButton.innerHTML = '❌ Erreur';
                    setTimeout(() => { playButton.innerHTML = originalText; }, 2000);
                }
            };
            
            playButton.onclick = playAudio;
            actionsDiv.appendChild(playButton);

            // Auto-play if toggle is enabled
            const autoReadToggle = document.querySelector('#auto-read-toggle');
            if (autoReadToggle && autoReadToggle.checked) {
                setTimeout(() => playAudio(), 500); // Small delay to ensure smooth UI
            }

            // Add highlighted elements if any
            const highlightedElements = document.querySelectorAll('.accessibility-highlight');
            if (highlightedElements.length > 0) {
                const highlightsList = document.createElement('ul');
                highlightsList.className = 'highlighted-elements';
                
                highlightedElements.forEach(element => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = '#';
                    let text = element.textContent.trim();
                    if (element.tagName === 'A') {
                        text = `🔗 ${text}`;
                    } else if (/^H[1-6]$/.test(element.tagName)) {
                        text = `📑 ${text}`;
                    } else if (element.tagName === 'P') {
                        text = `📝 ${text}`;
                    }
                    link.textContent = text;
                    link.onclick = (e) => {
                        e.preventDefault();
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    };
                    listItem.appendChild(link);
                    highlightsList.appendChild(listItem);
                });
                actionsDiv.appendChild(highlightsList);
            }

            messageDiv.appendChild(actionsDiv);
        }
        
        chatContainer.appendChild(messageDiv);
        // Scroll to the new message's top position
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (store) {
            messages.push({ role, content });
            persistChatHistory();
        }
    }
    
    // Load stored chat history for this domain, if it exists
    chrome.storage.local.get(["chatHistory-" + domainKey], (result) => {
        if (result["chatHistory-" + domainKey] && Array.isArray(result["chatHistory-" + domainKey]) && result["chatHistory-" + domainKey].length > 0) {
            messages = result["chatHistory-" + domainKey];
            renderChatHistory();
        } else {
            messages.push(systemMessage);
            addMessage('Bonjour! Je suis votre assistant d\'accessibilité. Je peux vous aider à trouver des informations sur cette page. Que recherchez-vous?', 'assistant');
        }
    });
    
    // Event listener to close the modal
    closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    // Event listener for reset/new session
    resetButton.addEventListener('click', () => {
        if (confirm('Voulez-vous démarrer une nouvelle session de chat?')) {
            messages = [systemMessage];
            chatContainer.innerHTML = '';
            addMessage('Bonjour! Je suis votre assistant d\'accessibilité. Je peux vous aider à trouver des informations sur cette page. Que recherchez-vous?', 'assistant');
            persistChatHistory();
        }
    });
    
    // Modify sendMessage function to add loader indicator
    async function sendMessage() {
        const content = input.value.trim();
        if (!content) return;

        addMessage(content, 'user');
        input.value = '';

        // Add loader indicator as assistant message loader
        const loaderDiv = document.createElement('div');
        loaderDiv.className = 'message assistant-message';
        loaderDiv.innerHTML = '<div class="message-content"><div class="typing-loader"><span></span><span></span><span></span></div></div>';
        chatContainer.appendChild(loaderDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        try {
            const response = await fetch('http://localhost:5001/api/chat-json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: messages,
                    stream: false
                })
            });

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }

            // Clear previous highlights
            clearHighlights();
            if (data.highlights && Array.isArray(data.highlights)) {
                data.highlights.forEach(highlightElementById);
            }

            // Remove loader and add actual assistant message
            loaderDiv.remove();
            addMessage(data.response, 'assistant');

        } catch (error) {
            console.error('Error:', error);
            loaderDiv.remove();
            addMessage('Désolé, une erreur est survenue. Veuillez réessayer.', 'assistant');
        }
    }

    sendButton.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Add welcome message is now handled after loading history if none exists
}

// Function to show or hide the button
function toggleInfoButton(show) {
    console.log("Toggle info button called with show:", show);
    let button = document.querySelector('.accessibility-info-button');
    
    if (show && !button) {
        console.log("Attempting to create and append button");
        button = createInfoButton();
        document.body.appendChild(button);
        console.log("Button appended to body");
    } else if (!show && button) {
        console.log("Removing button");
        button.remove();
        // Also remove the modal if it exists
        const modal = document.querySelector('.chat-modal');
        if (modal) {
            modal.remove();
        }
    }
}

// Make sure document is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeButton);
} else {
    initializeButton();
}

function initializeButton() {
    console.log("Initializing button");
    // Tag elements with accessibility IDs
    tagAccessibilityElements();
    
    // Set up DOM observer
    observeDOMChanges();
    
    // Check storage for initial state
    chrome.storage.local.get(['accessEnabled'], (result) => {
        console.log("Storage state retrieved:", result);
        const isEnabled = result.accessEnabled !== undefined ? result.accessEnabled : true;
        console.log("Button should be enabled:", isEnabled);
        toggleInfoButton(isEnabled);
    });
}

// Listen for changes to the toggle state
chrome.storage.onChanged.addListener((changes, namespace) => {
    console.log("Storage changed:", changes);
    if (namespace === 'sync' && changes.accessEnabled) {
        toggleInfoButton(changes.accessEnabled.newValue);
    }
});