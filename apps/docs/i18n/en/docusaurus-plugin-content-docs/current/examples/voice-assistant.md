---
sidebar_position: 1
---

# Voice Assistant Example

This example demonstrates how to build a fully functional voice assistant application using Azure Realtime Audio SDK.

## 🎯 Features

We will build an intelligent voice assistant with the following features:

- 🎤 **Speech Recognition** - Real-time recognition of user voice input
- 🗣️ **Speech Synthesis** - Generate natural voice responses
- 🔄 **State Management** - Intelligent conversation state transitions
- 📱 **Responsive Interface** - Adapts to various device screens
- 🎨 **Visual Indicators** - Intuitive voice activity indicators
- 📝 **Conversation History** - Display complete conversation records

## 📋 Complete Implementation

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Intelligent Voice Assistant</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="./style.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <!-- Header -->
        <header class="header">
            <div class="logo">
                <i class="fas fa-microphone-alt"></i>
                <h1>Intelligent Voice Assistant</h1>
            </div>
            <div class="status-indicator" id="statusIndicator">
                <span class="status-dot"></span>
                <span class="status-text">Ready</span>
            </div>
        </header>

        <!-- Main Interface -->
        <main class="main">
            <!-- Voice Visualizer -->
            <div class="voice-visualizer" id="voiceVisualizer">
                <div class="wave-container">
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                </div>
            </div>

            <!-- Control Buttons -->
            <div class="controls">
                <button id="recordBtn" class="record-btn">
                    <i class="fas fa-microphone"></i>
                    <span>Start Conversation</span>
                </button>
                <button id="stopBtn" class="stop-btn" disabled>
                    <i class="fas fa-stop"></i>
                    <span>Stop</span>
                </button>
                <button id="clearBtn" class="clear-btn">
                    <i class="fas fa-trash"></i>
                    <span>Clear</span>
                </button>
            </div>

            <!-- Conversation History -->
            <div class="conversation-panel">
                <div class="conversation-header">
                    <h3><i class="fas fa-comments"></i> Conversation History</h3>
                    <div class="conversation-stats">
                        <span id="conversationCount">0 conversations</span>
                    </div>
                </div>
                <div class="conversation-content" id="conversationContent">
                    <div class="welcome-message">
                        <i class="fas fa-robot"></i>
                        <p>Hello! I'm your intelligent voice assistant. Click the "Start Conversation" button to begin chatting.</p>
                    </div>
                </div>
            </div>
        </main>

        <!-- Settings Panel -->
        <div class="settings-panel" id="settingsPanel">
            <div class="settings-header">
                <h3><i class="fas fa-cog"></i> Settings</h3>
                <button class="close-btn" id="closeSettings">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="settings-content">
                <div class="setting-group">
                    <label for="voiceSelect">Voice Selection:</label>
                    <select id="voiceSelect">
                        <option value="alloy">Alloy</option>
                        <option value="echo">Echo</option>
                        <option value="fable">Fable</option>
                        <option value="onyx">Onyx</option>
                        <option value="nova">Nova</option>
                        <option value="shimmer">Shimmer</option>
                    </select>
                </div>
                <div class="setting-group">
                    <label for="temperatureSlider">Creativity (Temperature):</label>
                    <input type="range" id="temperatureSlider" min="0" max="1" step="0.1" value="0.7">
                    <span id="temperatureValue">0.7</span>
                </div>
                <div class="setting-group">
                    <label for="instructionsText">System Instructions:</label>
                    <textarea id="instructionsText" rows="3" placeholder="You are a friendly AI assistant..."></textarea>
                </div>
            </div>
        </div>

        <!-- Settings Button -->
        <button class="settings-btn" id="settingsBtn">
            <i class="fas fa-cog"></i>
        </button>
    </div>

    <script type="module" src="./voice-assistant.js"></script>
</body>
</html>
```

### CSS Styles

```css
/* style.css */
:root {
  --primary-color: #4285f4;
  --success-color: #34a853;
  --warning-color: #fbbc04;
  --error-color: #ea4335;
  --background-color: #f8f9fa;
  --card-background: #ffffff;
  --text-color: #202124;
  --text-secondary: #5f6368;
  --border-color: #dadce0;
  --shadow: 0 2px 10px rgba(0,0,0,0.1);
  --border-radius: 12px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header Styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  margin-bottom: 30px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo i {
  color: var(--primary-color);
  font-size: 24px;
}

.logo h1 {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-color); 
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--card-background);
  border-radius: 20px;
  box-shadow: var(--shadow);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--success-color);
  animation: pulse 2s infinite;
}

.status-text {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

/* Main Interface Styles */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* Voice Visualizer */
.voice-visualizer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background: var(--card-background);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  margin-bottom: 20px;
}

.wave-container {
  display: flex;
  align-items: center;
  gap: 4px;
}

.wave {
  width: 4px;
  height: 20px;
  background: var(--primary-color);
  border-radius: 2px;
  animation: wave 1.5s ease-in-out infinite;
}

.wave:nth-child(2) { animation-delay: 0.1s; }
.wave:nth-child(3) { animation-delay: 0.2s; }
.wave:nth-child(4) { animation-delay: 0.3s; }
.wave:nth-child(5) { animation-delay: 0.4s; }

@keyframes wave {
  0%, 100% { height: 20px; }
  50% { height: 60px; }
}

.voice-visualizer.active .wave {
  animation-duration: 0.8s;
}

.voice-visualizer.listening {
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
}

.voice-visualizer.thinking {
  background: linear-gradient(135deg, #fff3e0, #ffcc80);
}

.voice-visualizer.speaking {
  background: linear-gradient(135deg, #e8f5e8, #a5d6a7);
}

/* Control Buttons */
.controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
} 

.controls button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px;
  border: none;
  border-radius: var(--border-radius);
  background: var(--card-background);
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow);
  min-width: 120px;
}

.controls button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.record-btn {
  background: var(--primary-color) !important;
  color: white !important;
}

.record-btn.recording {
  background: var(--error-color) !important;
  animation: pulse-red 1s infinite;
}

@keyframes pulse-red {
  0% { box-shadow: 0 0 0 0 rgba(234, 67, 53, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(234, 67, 53, 0); }
  100% { box-shadow: 0 0 0 0 rgba(234, 67, 53, 0); }
}

.stop-btn {
  background: var(--warning-color) !important;
  color: white !important;
}

.clear-btn {
  background: var(--error-color) !important;
  color: white !important;
}

/* Conversation Panel */
.conversation-panel {
  background: var(--card-background);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.conversation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 1px solid var(--border-color);
}

.conversation-header h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  color: var(--text-color);
}

.conversation-stats {
  color: var(--text-secondary);
  font-size: 14px;
}

.conversation-content {
  max-height: 400px;
  overflow-y: auto;
  padding: 20px;
}

.welcome-message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: #f0f7ff;
  border-radius: 8px;
  color: var(--text-secondary);
}

.welcome-message i {
  color: var(--primary-color);
  font-size: 24px;
}

.message {
  display: flex;
  margin-bottom: 16px;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.user {
  justify-content: flex-end;
}

.message.assistant {
  justify-content: flex-start;
}

.message-content {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  position: relative;
}

.message.user .message-content {
  background: var(--primary-color);
  color: white;
}

.message.assistant .message-content {
  background: #f1f3f4;
  color: var(--text-color);
}

.message-time {
  font-size: 11px;
  opacity: 0.7;
  margin-top: 4px;
}

/* Settings Panel */
.settings-panel {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100vh;
  background: var(--card-background);
  box-shadow: -2px 0 10px rgba(0,0,0,0.1);
  transition: right 0.3s ease;
  z-index: 1000;
}

.settings-panel.open {
  right: 0;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 1px solid var(--border-color);
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: var(--text-secondary);
}

.settings-content {
  padding: 20px;
}

.setting-group {
  margin-bottom: 24px;
}

.setting-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-color);
}

.setting-group select,
.setting-group input,
.setting-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
}

.setting-group textarea {
  resize: vertical;
  min-height: 80px;
}

.settings-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  border: none;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(66, 133, 244, 0.4);
  transition: all 0.3s ease;
}

.settings-btn:hover {
  transform: scale(1.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
  
  .controls {
    flex-direction: column;
    align-items: center;
  }
  
  .controls button {
    width: 100%;
    max-width: 200px;
  }
  
  .settings-panel {
    width: 100%;
    right: -100%;
  }
  
  .conversation-content {
    max-height: 300px;
  }
}

/* Scrollbar Styles */
.conversation-content::-webkit-scrollbar {
  width: 6px;
}

.conversation-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.conversation-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.conversation-content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
```

### JavaScript Implementation

```typescript
// voice-assistant.js
import { AzureRealTimeAudio, ModelStatusEnum } from '@azure-realtime-audio/core';

class VoiceAssistant {
  private client: AzureRealTimeAudio;
  private mediaRecorder: MediaRecorder | null = null;
  private audioContext: AudioContext | null = null;
  private isRecording = false;
  private conversationCount = 0;
  private currentAudioQueue: ArrayBuffer[] = [];
  private isPlaying = false;

  // UI Elements
  private recordBtn: HTMLButtonElement;
  private stopBtn: HTMLButtonElement;
  private clearBtn: HTMLButtonElement;
  private statusIndicator: HTMLElement;
  private voiceVisualizer: HTMLElement;
  private conversationContent: HTMLElement;
  private conversationCountEl: HTMLElement;
  private settingsPanel: HTMLElement;
  private settingsBtn: HTMLButtonElement;

  constructor() {
    this.initializeUI();
    this.initializeClient();
    this.setupEventListeners();
  }

  private initializeUI() {
    this.recordBtn = document.getElementById('recordBtn') as HTMLButtonElement;
    this.stopBtn = document.getElementById('stopBtn') as HTMLButtonElement;
    this.clearBtn = document.getElementById('clearBtn') as HTMLButtonElement;
    this.statusIndicator = document.getElementById('statusIndicator')!;
    this.voiceVisualizer = document.getElementById('voiceVisualizer')!;
    this.conversationContent = document.getElementById('conversationContent')!;
    this.conversationCountEl = document.getElementById('conversationCount')!;
    this.settingsPanel = document.getElementById('settingsPanel')!;
    this.settingsBtn = document.getElementById('settingsBtn') as HTMLButtonElement;
  }

  private initializeClient() {
    this.client = new AzureRealTimeAudio({
      hostName: process.env.AZURE_OPENAI_ENDPOINT!,
      apiVersion: '2024-10-01-preview',
      deployment: 'gpt-4o-realtime-preview',
      apiKey: process.env.AZURE_OPENAI_API_KEY!,
      sessionConfig: {
        voice: 'alloy',
        instructions: `You are a friendly and professional AI voice assistant. Please respond in a natural, 
        approachable tone. Keep your answers concise and clear, avoiding overly long paragraphs. 
        If users ask complex questions, provide a summary first and ask if they need detailed explanations.`,
        input_audio_format: 'pcm16',
        output_audio_format: 'pcm16',
        turn_detection: {
          type: 'server_vad',
          threshold: 0.6,
          silence_duration_ms: 800,
          prefix_padding_ms: 300
        },
        temperature: 0.7
      }
    });

    this.setupClientEvents();
  }

  private setupClientEvents() {
    // Initialization complete
    this.client.once('init', (session) => {
      console.log('🎉 Voice assistant ready:', session);
      this.updateStatus('connected', 'Conversation complete', 'success');
      this.voiceVisualizer.className = 'voice-visualizer';
      this.isPlaying = false;
    });

    // User starts speaking
    this.client.on('input_audio_buffer.speech_started', () => {
      console.log('🎤 Voice input detected');
      this.updateStatus('listening', 'Listening...', 'primary');
      this.voiceVisualizer.className = 'voice-visualizer listening active';
    });

    // User stops speaking
    this.client.on('input_audio_buffer.speech_stopped', () => {
      console.log('🤫 Voice input ended');
      this.voiceVisualizer.className = 'voice-visualizer';
    });

    // AI starts generating response
    this.client.on('response.created', (response) => {
      console.log('🤔 AI starts thinking...');
      this.updateStatus('thinking', 'AI is thinking...', 'warning');
      this.voiceVisualizer.className = 'voice-visualizer thinking active';
    });

    // Receive audio data
    this.client.on('response.audio.delta', (audioData) => {
      if (!this.isPlaying) {
        this.updateStatus('speaking', 'AI is responding...', 'success');
        this.voiceVisualizer.className = 'voice-visualizer speaking active';
        this.isPlaying = true;
      }
      this.playAudioChunk(audioData.delta);
    });

    // Receive text data
    let currentAssistantMessage: HTMLElement | null = null;
    this.client.on('response.text.delta', (textData) => {
      if (!currentAssistantMessage) {
        currentAssistantMessage = this.addMessage('assistant', '');
      }
      this.appendToMessage(currentAssistantMessage, textData.delta);
    });

    // Response complete
    this.client.on('response.done', (response) => {
      console.log('✅ Response complete:', response);
      this.updateStatus('connected', 'Conversation complete', 'success');
      this.voiceVisualizer.className = 'voice-visualizer';
      this.isPlaying = false;
      currentAssistantMessage = null;
      this.conversationCount++;
      this.updateConversationCount();
    });

    // Error handling
    this.client.on('error', (error) => {
      console.error('❌ Error occurred:', error);
      this.updateStatus('error', 'Connection error', 'error');
      this.voiceVisualizer.className = 'voice-visualizer';
      this.handleError(error);
    });
  }

  private updateStatus(type: string, message: string, colorType: string) {
    const statusDot = this.statusIndicator.querySelector('.status-dot') as HTMLElement;
    const statusText = this.statusIndicator.querySelector('.status-text') as HTMLElement;
    
    statusText.textContent = message;
    
    // Update status dot color
    const colors = {
      'success': '#34a853',
      'primary': '#4285f4',
      'warning': '#fbbc04',
      'error': '#ea4335'
    };
    
    statusDot.style.backgroundColor = colors[colorType] || colors.success;
  }

  private addMessage(role: 'user' | 'assistant', content: string): HTMLElement {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    messageDiv.innerHTML = `
      <div class="message-content">
        ${content}
        <div class="message-time">${timeStr}</div>
      </div>
    `;

    // Remove welcome message
    const welcomeMessage = this.conversationContent.querySelector('.welcome-message');
    if (welcomeMessage) {
      welcomeMessage.remove();
    }

    this.conversationContent.appendChild(messageDiv);
    this.scrollToBottom();
    
    return messageDiv;
  }

  private appendToMessage(messageElement: HTMLElement, text: string) {
    const content = messageElement.querySelector('.message-content');
    if (content) {
      const timeDiv = content.querySelector('.message-time');
      const currentText = content.textContent?.replace(timeDiv?.textContent || '', '') || '';
      content.innerHTML = `${currentText}${text}<div class="message-time">${timeDiv?.textContent}</div>`;
    }
  }

  private scrollToBottom() {
    this.conversationContent.scrollTop = this.conversationContent.scrollHeight;
  }

  private updateConversationCount() {
    this.conversationCountEl.textContent = `${this.conversationCount} conversations`;
  }

  private clearConversation() {
    this.conversationContent.innerHTML = `
      <div class="welcome-message">
        <i class="fas fa-robot"></i>
        <p>Conversation cleared. Click "Start Conversation" to begin a new chat.</p>
      </div>
    `;
    this.conversationCount = 0;
    this.updateConversationCount();
  }

  private handleError(error: any) {
    let errorMessage = 'Unknown error occurred';
    
    switch (error.type) {
      case 'connection_error':
        errorMessage = 'Network connection error, please check your network settings';
        break;
      case 'authentication_error':
        errorMessage = 'Authentication failed, please check your API key';
        break;
      case 'rate_limit_error':
        errorMessage = 'Request rate too high, please try again later';
        break;
    }
    // Display error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'message assistant';
    errorDiv.innerHTML = `
      <div class="message-content" style="background-color: #ffebee; color: #c62828;">
        <i class="fas fa-exclamation-triangle"></i> ${errorMessage}
        <div class="message-time">${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
      </div>
    `;
    
    this.conversationContent.appendChild(errorDiv);
    this.scrollToBottom();
  }

  public destroy() {
    // Clean up resources
    if (this.mediaRecorder && this.isRecording) {
      this.stopRecording();
    }
    
    if (this.audioContext) {
      this.audioContext.close();
    }
    
    this.client.offAll();
    this.client.close();
  }
}

// Initialize application
let voiceAssistant: VoiceAssistant;

document.addEventListener('DOMContentLoaded', () => {
  voiceAssistant = new VoiceAssistant();
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
  voiceAssistant?.destroy();
});

export default VoiceAssistant;
```

## 🔧 Configuration

### Environment Variables Setup

Create a `.env` file in your project root:

```bash
AZURE_OPENAI_ENDPOINT=your-resource.openai.azure.com
AZURE_OPENAI_API_KEY=your-api-key-here
AZURE_OPENAI_DEPLOYMENT=gpt-4o-realtime-preview
AZURE_OPENAI_API_VERSION=2024-10-01-preview
```

### Build Configuration

If using Webpack, configure environment variables:

```javascript
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  // ... other configuration
  plugins: [
    new webpack.DefinePlugin({
      'process.env.AZURE_OPENAI_ENDPOINT': JSON.stringify(process.env.AZURE_OPENAI_ENDPOINT),
      'process.env.AZURE_OPENAI_API_KEY': JSON.stringify(process.env.AZURE_OPENAI_API_KEY),
      'process.env.AZURE_OPENAI_DEPLOYMENT': JSON.stringify(process.env.AZURE_OPENAI_DEPLOYMENT),
      'process.env.AZURE_OPENAI_API_VERSION': JSON.stringify(process.env.AZURE_OPENAI_API_VERSION),
    }),
  ],
};
```

## 🎮 Feature Details

### 1. Intelligent State Management

The application automatically switches UI display based on conversation state:

- **Connection State** - Green indicator
- **Recording State** - Red pulsing effect
- **Listening State** - Blue waveform animation
- **Thinking State** - Yellow thinking indicator
- **Speaking State** - Green speaking animation

### 2. Audio Visualization

Voice visualizer provides intuitive visual feedback:

- **Waveform Animation** - Shows audio activity
- **Color Changes** - Different colors for different states
- **Animation Effects** - Smooth state transitions

### 3. Conversation Management

Complete conversation recording functionality:

- **Message Classification** - Distinguish between user and AI messages
- **Timestamps** - Display message time
- **Auto-scroll** - Automatically scroll to latest message
- **Clear Function** - One-click conversation history clearing

### 4. Customizable Settings

Users can adjust multiple settings:

- **Voice Selection** - 6 different AI voices
- **Creativity Control** - Adjust response creativity level
- **System Instructions** - Customize AI behavior

## 🚀 Deployment Guide

### 1. Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production version
npm run build
```

### 2. Production Deployment

```bash
# Build project
npm run build

# Deploy to server
# Upload files from dist directory to web server
```

### 3. HTTPS Requirements

:::warning Important Note
Voice functionality requires HTTPS environment to work properly. In production, ensure:

1. Configure SSL certificate
2. Force HTTPS usage
3. Set secure CSP policy
:::

## 🔍 Troubleshooting

### Common Issues

1. **Cannot Access Microphone**
   - Check browser permission settings
   - Ensure running in HTTPS environment
   - Try reloading the page

2. **Audio Playback Issues**
   - Check audio format settings
   - Confirm browser compatibility
   - Check audio context initialization

3. **Connection Failures**
   - Verify API key and endpoint
   - Check network connection
   - Review browser console errors

## 🎯 Extended Features

Based on this example, you can continue adding:

- **Multi-language Support** - Support conversations in different languages
- **Voice Commands** - Special voice command processing
- **Conversation Export** - Export conversation records
- **Theme Switching** - Light/dark theme support
- **More Shortcuts** - Additional keyboard shortcuts

## Related Documentation

<!--
- [API Reference](/docs/api-reference/client) - Detailed client API
<!-- - [State Management Guide](../guides/state-management.md) - State management best practices -->
<!-- - [Audio Processing Guide](../guides/audio-handling.md) - Audio optimization techniques -->
--> 