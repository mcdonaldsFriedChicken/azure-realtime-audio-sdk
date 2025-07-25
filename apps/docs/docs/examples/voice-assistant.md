---
sidebar_position: 1
---

# 语音助手示例

本示例展示如何使用 Azure Realtime Audio SDK 构建一个功能完整的语音助手应用。

## 🎯 功能特性

我们将构建一个智能语音助手，具备以下功能：

- 🎤 **语音识别** - 实时识别用户语音输入
- 🗣️ **语音合成** - 生成自然的语音回答
- 🔄 **状态管理** - 智能的对话状态切换
- 📱 **响应式界面** - 适配各种设备屏幕
- 🎨 **可视化指示** - 直观的语音活动指示器
- 📝 **对话历史** - 显示完整的对话记录

## 📋 完整实现

### HTML 结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>智能语音助手</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="./style.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <!-- 头部 -->
        <header class="header">
            <div class="logo">
                <i class="fas fa-microphone-alt"></i>
                <h1>智能语音助手</h1>
            </div>
            <div class="status-indicator" id="statusIndicator">
                <span class="status-dot"></span>
                <span class="status-text">准备就绪</span>
            </div>
        </header>

        <!-- 主界面 -->
        <main class="main">
            <!-- 语音可视化器 -->
            <div class="voice-visualizer" id="voiceVisualizer">
                <div class="wave-container">
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                </div>
            </div>

            <!-- 控制按钮 -->
            <div class="controls">
                <button id="recordBtn" class="record-btn">
                    <i class="fas fa-microphone"></i>
                    <span>开始对话</span>
                </button>
                <button id="stopBtn" class="stop-btn" disabled>
                    <i class="fas fa-stop"></i>
                    <span>停止</span>
                </button>
                <button id="clearBtn" class="clear-btn">
                    <i class="fas fa-trash"></i>
                    <span>清空</span>
                </button>
            </div>

            <!-- 对话历史 -->
            <div class="conversation-panel">
                <div class="conversation-header">
                    <h3><i class="fas fa-comments"></i> 对话记录</h3>
                    <div class="conversation-stats">
                        <span id="conversationCount">0 轮对话</span>
                    </div>
                </div>
                <div class="conversation-content" id="conversationContent">
                    <div class="welcome-message">
                        <i class="fas fa-robot"></i>
                        <p>你好！我是你的智能语音助手。点击「开始对话」按钮，我们就可以开始聊天了。</p>
                    </div>
                </div>
            </div>
        </main>

        <!-- 设置面板 -->
        <div class="settings-panel" id="settingsPanel">
            <div class="settings-header">
                <h3><i class="fas fa-cog"></i> 设置</h3>
                <button class="close-btn" id="closeSettings">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="settings-content">
                <div class="setting-group">
                    <label for="voiceSelect">语音选择：</label>
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
                    <label for="temperatureSlider">创造性（温度）：</label>
                    <input type="range" id="temperatureSlider" min="0" max="1" step="0.1" value="0.7">
                    <span id="temperatureValue">0.7</span>
                </div>
                <div class="setting-group">
                    <label for="instructionsText">系统指令：</label>
                    <textarea id="instructionsText" rows="3" placeholder="你是一个友好的AI助手..."></textarea>
                </div>
            </div>
        </div>

        <!-- 设置按钮 -->
        <button class="settings-btn" id="settingsBtn">
            <i class="fas fa-cog"></i>
        </button>
    </div>

    <script type="module" src="./voice-assistant.js"></script>
</body>
</html>
```

### CSS 样式

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

/* 头部样式 */
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
  font-size: 28px;
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

/* 主界面样式 */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* 语音可视化器 */
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

/* 控制按钮 */
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

/* 对话面板 */
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

/* 设置面板 */
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

/* 响应式设计 */
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

/* 滚动条样式 */
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

### JavaScript 实现

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

  // UI 元素
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
        instructions: `你是一个友好且专业的AI语音助手。请用自然、亲切的语调回答用户问题。
        保持回答简洁明了，避免过长的段落。如果用户提出复杂问题，可以先给出概要，然后询问是否需要详细解释。`,
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
    // 初始化完成
    this.client.once('init', (session) => {
      console.log('🎉 语音助手已就绪:', session);
      this.updateStatus('connected', '已连接', 'success');
    });

    // 用户开始说话
    this.client.on('input_audio_buffer.speech_started', () => {
      console.log('🎤 检测到语音输入');
      this.updateStatus('listening', '正在聆听...', 'primary');
      this.voiceVisualizer.className = 'voice-visualizer listening active';
    });

    // 用户停止说话
    this.client.on('input_audio_buffer.speech_stopped', () => {
      console.log('🤫 语音输入结束');
      this.voiceVisualizer.className = 'voice-visualizer';
    });

    // AI 开始生成响应
    this.client.on('response.created', (response) => {
      console.log('🤔 AI 开始思考...');
      this.updateStatus('thinking', 'AI 正在思考...', 'warning');
      this.voiceVisualizer.className = 'voice-visualizer thinking active';
    });

    // 接收音频数据
    this.client.on('response.audio.delta', (audioData) => {
      if (!this.isPlaying) {
        this.updateStatus('speaking', 'AI 正在回答...', 'success');
        this.voiceVisualizer.className = 'voice-visualizer speaking active';
        this.isPlaying = true;
      }
      this.playAudioChunk(audioData.delta);
    });

    // 接收文本数据
    let currentAssistantMessage: HTMLElement | null = null;
    this.client.on('response.text.delta', (textData) => {
      if (!currentAssistantMessage) {
        currentAssistantMessage = this.addMessage('assistant', '');
      }
      this.appendToMessage(currentAssistantMessage, textData.delta);
    });

    // 响应完成
    this.client.on('response.done', (response) => {
      console.log('✅ 响应完成:', response);
      this.updateStatus('connected', '对话完成', 'success');
      this.voiceVisualizer.className = 'voice-visualizer';
      this.isPlaying = false;
      currentAssistantMessage = null;
      this.conversationCount++;
      this.updateConversationCount();
    });

    // 错误处理
    this.client.on('error', (error) => {
      console.error('❌ 发生错误:', error);
      this.updateStatus('error', '连接错误', 'error');
      this.voiceVisualizer.className = 'voice-visualizer';
      this.handleError(error);
    });
  }

  private setupEventListeners() {
    // 录音按钮
    this.recordBtn.addEventListener('click', () => {
      if (!this.isRecording) {
        this.startRecording();
      } else {
        this.stopRecording();
      }
    });

    // 停止按钮
    this.stopBtn.addEventListener('click', () => {
      this.stopRecording();
      this.client.cancelResponse();
    });

    // 清空按钮
    this.clearBtn.addEventListener('click', () => {
      this.clearConversation();
    });

    // 设置按钮
    this.settingsBtn.addEventListener('click', () => {
      this.settingsPanel.classList.toggle('open');
    });

    // 关闭设置
    document.getElementById('closeSettings')?.addEventListener('click', () => {
      this.settingsPanel.classList.remove('open');
    });

    // 设置项监听
    this.setupSettingsListeners();

    // 键盘快捷键
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

    // 语音选择
    voiceSelect.addEventListener('change', () => {
      // 在下次会话时应用新设置
      this.updateSessionConfig();
    });

    // 温度设置
    temperatureSlider.addEventListener('input', () => {
      temperatureValue.textContent = temperatureSlider.value;
      this.updateSessionConfig();
    });

    // 指令设置
    instructionsText.addEventListener('blur', () => {
      this.updateSessionConfig();
    });
  }

  private updateSessionConfig() {
    const voiceSelect = document.getElementById('voiceSelect') as HTMLSelectElement;
    const temperatureSlider = document.getElementById('temperatureSlider') as HTMLInputElement;
    const instructionsText = document.getElementById('instructionsText') as HTMLTextAreaElement;

    // 这里可以更新会话配置，但需要重新初始化客户端
    console.log('设置已更新:', {
      voice: voiceSelect.value,
      temperature: parseFloat(temperatureSlider.value),
      instructions: instructionsText.value
    });
  }

  private async startRecording() {
    try {
      // 请求麦克风权限
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // 创建 MediaRecorder
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=pcm'
      });

      // 处理音频数据
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.processAudioData(event.data);
        }
      };

      // 开始录制
      this.mediaRecorder.start(100); // 每100ms发送一次数据
      this.isRecording = true;

      // 更新UI
      this.recordBtn.innerHTML = '<i class="fas fa-stop"></i><span>停止录音</span>';
      this.recordBtn.classList.add('recording');
      this.stopBtn.disabled = false;
      this.updateStatus('recording', '正在录音...', 'error');

      // 添加用户消息占位符
      this.addMessage('user', '(正在说话...)');

    } catch (error) {
      console.error('❌ 无法访问麦克风:', error);
      this.updateStatus('error', '麦克风访问失败', 'error');
      alert('无法访问麦克风，请检查权限设置。');
    }
  }

  private stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
      this.client.commitAudio();
      this.isRecording = false;

      // 更新UI
      this.recordBtn.innerHTML = '<i class="fas fa-microphone"></i><span>开始对话</span>';
      this.recordBtn.classList.remove('recording');
      this.stopBtn.disabled = true;
      this.updateStatus('processing', '处理中...', 'warning');

      // 更新最后一条用户消息
      const lastMessage = this.conversationContent.lastElementChild;
      if (lastMessage?.classList.contains('user')) {
        const content = lastMessage.querySelector('.message-content');
        if (content?.textContent === '(正在说话...)') {
          content.textContent = '(语音输入)';
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
      // 解码 base64 音频
      const audioData = atob(base64Audio);
      const arrayBuffer = new ArrayBuffer(audioData.length);
      const view = new Uint8Array(arrayBuffer);
      
      for (let i = 0; i < audioData.length; i++) {
        view[i] = audioData.charCodeAt(i);
      }

      // 解码并播放音频
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.audioContext.destination);
      source.start();

    } catch (error) {
      console.error('❌ 音频播放失败:', error);
    }
  }

  private addMessage(role: 'user' | 'assistant', content: string): HTMLElement {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    const now = new Date();
    const timeStr = now.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    messageDiv.innerHTML = `
      <div class="message-content">
        ${content}
        <div class="message-time">${timeStr}</div>
      </div>
    `;

    // 移除欢迎消息
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
    
    // 更新状态点颜色
    const colors = {
      'success': '#34a853',
      'primary': '#4285f4',
      'warning': '#fbbc04',
      'error': '#ea4335'
    };
    
    statusDot.style.backgroundColor = colors[colorType] || colors.success;
  }

  private updateConversationCount() {
    this.conversationCountEl.textContent = `${this.conversationCount} 轮对话`;
  }

  private clearConversation() {
    this.conversationContent.innerHTML = `
      <div class="welcome-message">
        <i class="fas fa-robot"></i>
        <p>对话已清空。点击「开始对话」按钮开始新的对话。</p>
      </div>
    `;
    this.conversationCount = 0;
    this.updateConversationCount();
  }

  private handleError(error: any) {
    let errorMessage = '发生未知错误';
    
    switch (error.type) {
      case 'connection_error':
        errorMessage = '网络连接错误，请检查网络设置';
        break;
      case 'authentication_error':
        errorMessage = '身份验证失败，请检查API密钥';
        break;
      case 'rate_limit_error':
        errorMessage = '请求频率过高，请稍后再试';
        break;
    }

    // 显示错误提示
    const errorDiv = document.createElement('div');
    errorDiv.className = 'message assistant';
    errorDiv.innerHTML = `
      <div class="message-content" style="background-color: #ffebee; color: #c62828;">
        <i class="fas fa-exclamation-triangle"></i> ${errorMessage}
        <div class="message-time">${new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</div>
      </div>
    `;
    
    this.conversationContent.appendChild(errorDiv);
    this.scrollToBottom();
  }

  public destroy() {
    // 清理资源
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

// 初始化应用
let voiceAssistant: VoiceAssistant;

document.addEventListener('DOMContentLoaded', () => {
  voiceAssistant = new VoiceAssistant();
});

// 页面卸载时清理
window.addEventListener('beforeunload', () => {
  voiceAssistant?.destroy();
});

export default VoiceAssistant;
```

## 🔧 配置说明

### 环境变量设置

在项目根目录创建 `.env` 文件：

```bash
AZURE_OPENAI_ENDPOINT=your-resource.openai.azure.com
AZURE_OPENAI_API_KEY=your-api-key-here
AZURE_OPENAI_DEPLOYMENT=gpt-4o-realtime-preview
AZURE_OPENAI_API_VERSION=2024-10-01-preview
```

### 构建配置

如果使用 Webpack，需要配置环境变量：

```javascript
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  // ... 其他配置
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

## 🎮 功能特性详解

### 1. 智能状态管理

应用会根据对话状态自动切换UI显示：

- **连接状态** - 显示绿色指示器
- **录音状态** - 红色脉冲效果
- **聆听状态** - 蓝色波形动画
- **思考状态** - 黄色思考指示
- **回答状态** - 绿色说话动画

### 2. 音频可视化

语音可视化器提供直观的视觉反馈：

- **波形动画** - 显示音频活动
- **颜色变化** - 不同状态对应不同颜色
- **动画效果** - 平滑的状态转换

### 3. 对话管理

完整的对话记录功能：

- **消息分类** - 区分用户和AI消息
- **时间戳** - 显示消息时间
- **滚动定位** - 自动滚动到最新消息
- **清空功能** - 一键清空对话历史

### 4. 可定制设置

用户可以调整多项设置：

- **语音选择** - 6种不同的AI语音
- **创造性控制** - 调整回答的创造性程度
- **系统指令** - 自定义AI行为

## 🚀 部署指南

### 1. 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 2. 生产部署

```bash
# 构建项目
npm run build

# 部署到服务器
# 将 dist 目录下的文件上传到 Web 服务器
```

### 3. HTTPS 要求

:::warning 重要提醒
语音功能需要 HTTPS 环境才能正常工作。在生产环境中，请确保：

1. 配置 SSL 证书
2. 强制使用 HTTPS
3. 设置安全的 CSP 策略
:::

## 🔍 故障排除

### 常见问题

1. **麦克风无法访问**
   - 检查浏览器权限设置
   - 确保在 HTTPS 环境下运行
   - 尝试重新加载页面

2. **音频播放异常**
   - 检查音频格式设置
   - 确认浏览器兼容性
   - 检查音频上下文初始化

3. **连接失败**
   - 验证 API 密钥和端点
   - 检查网络连接
   - 查看浏览器控制台错误

## 🎯 扩展功能

基于这个示例，您可以继续添加：

- **多语言支持** - 支持不同语言的对话
- **语音指令** - 特殊语音命令处理
- **对话导出** - 导出对话记录
- **主题切换** - 明暗主题支持
- **快捷键** - 更多键盘快捷操作

## 相关文档

<!--
- [API 参考](/docs/api-reference/client) - 详细的客户端API
<!-- - [状态管理指南](../guides/state-management.md) - 状态管理最佳实践 -->
<!-- - [音频处理指南](../guides/audio-handling.md) - 音频优化技巧 -->
--> 