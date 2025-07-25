---
sidebar_position: 3
---

# Quick Start

This guide will get you up and running with Azure Realtime Audio SDK in 5 minutes, building your first real-time voice conversation application.

## 🎯 Goal

By the end of this guide, you'll have a basic voice conversation application that can:
- Initialize connection with Azure OpenAI
- Handle audio input and output
- Manage conversation states
- Respond to voice interaction events

## 📋 Prerequisites

Before starting, make sure you have:

1. ✅ [Installed the SDK](./installation.md)
2. ✅ Configured Azure OpenAI Service
3. ✅ Set up environment variables

## 🚀 Step 1: Create Basic Client

First, let's create a basic Azure Realtime Audio client:

```typescript
import { AzureRealTimeAudio } from '@azure-realtime-audio/core';

// Create client instance
const client = new AzureRealTimeAudio({
  hostName: process.env.AZURE_OPENAI_ENDPOINT!,
  apiVersion: process.env.AZURE_OPENAI_API_VERSION!,
  deployment: process.env.AZURE_OPENAI_DEPLOYMENT!,
  apiKey: process.env.AZURE_OPENAI_API_KEY!,
  sessionConfig: {
    voice: 'alloy',
    instructions: 'You are a friendly AI assistant. Please answer questions concisely in English.',
    input_audio_format: 'pcm16',
    output_audio_format: 'pcm16',
  }
});
```

## 🎧 Step 2: Set Up Event Listeners

Set up basic event listeners to handle connection and audio data:

```typescript
// Listen for initialization completion
client.once('init', (session) => {
  console.log('🎉 Connection successful! Session established:', session);
});

// Listen for audio responses
client.on('response.audio.delta', (audioData) => {
  console.log('🔊 Received audio data:', audioData.delta.length, 'bytes');
  // Play audio data here
  playAudioData(audioData.delta);
});

// Listen for text responses
client.on('response.text.delta', (textData) => {
  console.log('📝 Received text:', textData.delta);
  // Display text here
  displayText(textData.delta);
});

// Listen for conversation completion
client.on('response.done', (response) => {
  console.log('✅ Conversation completed:', response);
});

// Listen for errors
client.on('error', (error) => {
  console.error('❌ Error occurred:', error);
});
```

## 🎤 Step 3: Handle Audio Input

### Audio Recording in Browser

```typescript
async function startRecording() {
  try {
    // Request microphone permission
    const stream = await navigator.mediaDevices.getUserMedia({ 
      audio: {
        sampleRate: 16000,
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
      } 
    });

    // Create MediaRecorder
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'audio/webm;codecs=pcm'
    });

    // Handle audio data
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        // Convert audio data to base64
        const reader = new FileReader();
        reader.onload = () => {
          const base64Audio = (reader.result as string).split(',')[1];
          // Send audio data to AI
          client.appendAudio(base64Audio);
        };
        reader.readAsDataURL(event.data);
      }
    };

    // Start recording
    mediaRecorder.start(100); // Send data every 100ms

    return mediaRecorder;
  } catch (error) {
    console.error('❌ Cannot access microphone:', error);
  }
}
```

### Stop Recording and Commit Audio

```typescript
function stopRecording(mediaRecorder: MediaRecorder) {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    // Commit audio buffer for processing
    client.commitAudio();
  }
}
```

## 🔊 Step 4: Handle Audio Output

### Simple Audio Playback

```typescript
let audioContext: AudioContext;
let audioQueue: AudioBuffer[] = [];
let isPlaying = false;

// Initialize audio context
function initAudioContext() {
  audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
}

// Play audio data
async function playAudioData(base64Audio: string) {
  if (!audioContext) {
    initAudioContext();
  }

  try {
    // Decode base64 audio data
    const audioData = atob(base64Audio);
    const arrayBuffer = new ArrayBuffer(audioData.length);
    const view = new Uint8Array(arrayBuffer);
    
    for (let i = 0; i < audioData.length; i++) {
      view[i] = audioData.charCodeAt(i);
    }

    // Decode audio
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    // Play audio
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();

  } catch (error) {
    console.error('❌ Audio playback failed:', error);
  }
}

// Display text
function displayText(text: string) {
  const textElement = document.getElementById('conversation-text');
  if (textElement) {
    textElement.textContent += text;
  }
}
```

## 🎮 Step 5: Create User Interface

Create a simple HTML interface:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Azure Realtime Audio SDK Demo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .status {
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            font-weight: bold;
        }
        .status.connected { background-color: #d4edda; color: #155724; }
        .status.listening { background-color: #d1ecf1; color: #0c5460; }
        .status.thinking { background-color: #fff3cd; color: #856404; }
        .status.speaking { background-color: #f8d7da; color: #721c24; }
        .controls {
            margin: 20px 0;
            text-align: center;
        }
        button {
            padding: 12px 24px;
            margin: 5px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .record-btn {
            background-color: #007bff;
            color: white;
        }
        .record-btn:hover {
            background-color: #0056b3;
        }
        .record-btn.recording {
            background-color: #dc3545;
        }
        #conversation-text {
            min-height: 200px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
            white-space: pre-wrap;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎙️ Azure Realtime Audio SDK Demo</h1>
        
        <div id="status" class="status">Ready to connect...</div>
        
        <div class="controls">
            <button id="recordBtn" class="record-btn">Start Speaking</button>
            <button id="clearBtn">Clear Conversation</button>
        </div>
        
        <div id="conversation-text"></div>
    </div>

    <script src="your-app.js"></script>
</body>
</html>
```

## 🔄 Step 6: Integrate All Features

```typescript
// Complete application logic
class VoiceChat {
  private client: AzureRealTimeAudio;
  private mediaRecorder: MediaRecorder | null = null;
  private isRecording = false;

  constructor() {
    this.initClient();
    this.setupUI();
  }

  private initClient() {
    this.client = new AzureRealTimeAudio({
      hostName: process.env.AZURE_OPENAI_ENDPOINT!,
      apiVersion: process.env.AZURE_OPENAI_API_VERSION!,
      deployment: process.env.AZURE_OPENAI_DEPLOYMENT!,
      apiKey: process.env.AZURE_OPENAI_API_KEY!,
      sessionConfig: {
        voice: 'alloy',
        instructions: 'You are a friendly AI assistant. Please answer questions concisely in English.',
        input_audio_format: 'pcm16',
        output_audio_format: 'pcm16',
      }
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.client.once('init', () => {
      this.updateStatus('connected', '✅ Connected - Ready to chat');
    });

    this.client.on('input_audio_buffer.speech_started', () => {
      this.updateStatus('listening', '🎤 Listening...');
    });

    this.client.on('response.created', () => {
      this.updateStatus('thinking', '🤔 AI is thinking...');
    });

    this.client.on('response.audio.delta', (audioData) => {
      this.updateStatus('speaking', '🗣️ AI is responding...');
      playAudioData(audioData.delta);
    });

    this.client.on('response.text.delta', (textData) => {
      displayText(textData.delta);
    });

    this.client.on('response.done', () => {
      this.updateStatus('connected', '✅ Conversation complete - Ready for next question');
    });

    this.client.on('error', (error) => {
      console.error('Connection error:', error);
      this.updateStatus('error', '❌ Connection error, please refresh and try again');
    });
  }

  private setupUI() {
    const recordBtn = document.getElementById('recordBtn');
    const clearBtn = document.getElementById('clearBtn');

    recordBtn?.addEventListener('click', () => {
      if (!this.isRecording) {
        this.startRecording();
      } else {
        this.stopRecording();
      }
    });

    clearBtn?.addEventListener('click', () => {
      this.clearConversation();
    });
  }

  private async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          const reader = new FileReader();
          reader.onload = () => {
            const base64Audio = (reader.result as string).split(',')[1];
            this.client.appendAudio(base64Audio);
          };
          reader.readAsDataURL(event.data);
        }
      };

      this.mediaRecorder.start(100);
      this.isRecording = true;
      
      const btn = document.getElementById('recordBtn') as HTMLButtonElement;
      btn.textContent = 'Stop Speaking';
      btn.classList.add('recording');

    } catch (error) {
      console.error('Recording failed:', error);
    }
  }

  private stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.client.commitAudio();
      this.isRecording = false;

      const btn = document.getElementById('recordBtn') as HTMLButtonElement;
      btn.textContent = 'Start Speaking';
      btn.classList.remove('recording');
    }
  }

  private updateStatus(type: string, message: string) {
    const statusEl = document.getElementById('status');
    if (statusEl) {
      statusEl.className = `status ${type}`;
      statusEl.textContent = message;
    }
  }

  private clearConversation() {
    const textEl = document.getElementById('conversation-text');
    if (textEl) {
      textEl.textContent = '';
    }
  }
}

// Start the application
const app = new VoiceChat();
```

## 🎉 Complete!

Congratulations! You now have a working real-time voice conversation application. Your app can:

- ✅ Connect to Azure OpenAI Realtime API
- ✅ Record and send audio
- ✅ Receive and play AI voice responses
- ✅ Display conversation status
- ✅ Handle error situations

## 🚀 Next Steps

Now that you've mastered the basics, you can explore more advanced features:

1. **[View Complete Examples](./examples/voice-assistant.md)** - Learn more complex application scenarios
2. **[Understand State Management](./guides/state-management.md)** - Deep dive into conversation states <!-- 已注释：文档未创建 -->
3. **[Audio Processing Optimization](./guides/audio-handling.md)** - Improve audio quality <!-- 已注释：文档未创建 -->
4. **[Function Calling Integration](./examples/function-calling.md)** - Extend AI capabilities
5. **[Performance Optimization](./best-practices/performance.md)** - Build production-ready applications

## ❓ Need Help?

If you encounter any issues:

- 📖 Check the [API Documentation](/docs/api-reference/client)
- 💬 Join the [Discord Community](https://discord.gg/666U6JTCQY)
- 🐛 [Submit an Issue](https://github.com/JsonLee12138/azure-realtime-audio-sdk/issues) 