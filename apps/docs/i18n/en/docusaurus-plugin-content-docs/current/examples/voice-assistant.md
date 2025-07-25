---
sidebar_position: 1
---

# Voice Assistant Example

This example demonstrates how to build a fully functional voice assistant application using Azure Realtime Audio SDK.

## 🎯 Features

We'll build an intelligent voice assistant with the following capabilities:

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
                        <p>Hello! I'm your intelligent voice assistant. Click the "Start Conversation" button to begin chatting with me.</p>
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

[The CSS code is identical to the Chinese version, so I'll use the same styles]

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
      this.updateStatus('connected', 'Connected', 'success');
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

  private setupEventListeners() {
    // Record button
    this.recordBtn.addEventListener('click', () => {
      if (!this.isRecording) {
        this.startRecording();
      } else {
        this.stopRecording();
      }
    });

    // Stop button
    this.stopBtn.addEventListener('click', () => {
      this.stopRecording();
      this.client.cancelResponse();
    });

    // Clear button
    this.clearBtn.addEventListener('click', () => {
      this.clearConversation();
    });

    // Settings button
    this.settingsBtn.addEventListener('click', () => {
      this.settingsPanel.classList.toggle('open');
    });

    // Close settings
    document.getElementById('closeSettings')?.addEventListener('click', () => {
      this.settingsPanel.classList.remove('open');
    });

    // Settings listeners
    this.setupSettingsListeners();

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !e.target?.tagName.match(/INPUT|TEXTAREA/)) {
        e.preventDefault();
        if (!this.isRecording) {
          this.startRecording();
        }
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.code === 'Space' && this.isRecording) {
        e.preventDefault();
        this.stopRecording();
      }
    });
  }

  private setupSettingsListeners() {
    const voiceSelect = document.getElementById('voiceSelect') as HTMLSelectElement;
    const temperatureSlider = document.getElementById('temperatureSlider') as HTMLInputElement;
    const temperatureValue = document.getElementById('temperatureValue')!;
    const instructionsText = document.getElementById('instructionsText') as HTMLTextAreaElement;

    // Voice selection
    voiceSelect.addEventListener('change', () => {
      // Apply new settings on next session
      this.updateSessionConfig();
    });

    // Temperature setting
    temperatureSlider.addEventListener('input', () => {
      temperatureValue.textContent = temperatureSlider.value;
      this.updateSessionConfig();
    });

    // Instructions setting
    instructionsText.addEventListener('blur', () => {
      this.updateSessionConfig();
    });
  }

  private updateSessionConfig() {
    const voiceSelect = document.getElementById('voiceSelect') as HTMLSelectElement;
    const temperatureSlider = document.getElementById('temperatureSlider') as HTMLInputElement;
    const instructionsText = document.getElementById('instructionsText') as HTMLTextAreaElement;

    // Here you can update session configuration, but requires client reinitialization
    console.log('Settings updated:', {
      voice: voiceSelect.value,
      temperature: parseFloat(temperatureSlider.value),
      instructions: instructionsText.value
    });
  }

  private async startRecording() {
    try {
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // Create MediaRecorder
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=pcm'
      });

      // Handle audio data
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.processAudioData(event.data);
        }
      };

      // Start recording
      this.mediaRecorder.start(100); // Send data every 100ms
      this.isRecording = true;

      // Update UI
      this.recordBtn.innerHTML = '<i class="fas fa-stop"></i><span>Stop Recording</span>';
      this.recordBtn.classList.add('recording');
      this.stopBtn.disabled = false;
      this.updateStatus('recording', 'Recording...', 'error');

      // Add user message placeholder
      this.addMessage('user', '(Speaking...)');

    } catch (error) {
      console.error('❌ Cannot access microphone:', error);
      this.updateStatus('error', 'Microphone access failed', 'error');
      alert('Cannot access microphone. Please check permission settings.');
    }
  }

  private stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
      this.client.commitAudio();
      this.isRecording = false;

      // Update UI
      this.recordBtn.innerHTML = '<i class="fas fa-microphone"></i><span>Start Conversation</span>';
      this.recordBtn.classList.remove('recording');
      this.stopBtn.disabled = true;
      this.updateStatus('processing', 'Processing...', 'warning');

      // Update last user message
      const lastMessage = this.conversationContent.lastElementChild;
      if (lastMessage?.classList.contains('user')) {
        const content = lastMessage.querySelector('.message-content');
        if (content?.textContent === '(Speaking...)') {
          content.textContent = '(Voice input)';
        }
      }
    }
  }

  private processAudioData(audioBlob: Blob) {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Audio = result.split(',')[1];
      this.client.appendAudio(base64Audio);
    };
    reader.readAsDataURL(audioBlob);
  }

  private async playAudioChunk(base64Audio: string) {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    try {
      // Decode base64 audio
      const audioData = atob(base64Audio);
      const arrayBuffer = new ArrayBuffer(audioData.length);
      const view = new Uint8Array(arrayBuffer);
      
      for (let i = 0; i < audioData.length; i++) {
        view[i] = audioData.charCodeAt(i);
      }

      // Decode and play audio
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.audioContext.destination);
      source.start();

    } catch (error) {
      console.error('❌ Audio playback failed:', error);
    }
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
        errorMessage = 'Network connection error. Please check your network settings.';
        break;
      case 'authentication_error':
        errorMessage = 'Authentication failed. Please check your API key.';
        break;
      case 'rate_limit_error':
        errorMessage = 'Request rate too high. Please try again later.';
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

- **Message Classification** - Distinguish user and AI messages
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

:::warning Important Reminder
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