import type { RealtimeRealtimeServerVadTurnDetection } from '../lib/api';
import type { ModelStatusType } from '../lib/constants';
import { describe, expect, it } from 'vitest';
import { DEFAULT_SESSION_CONFIG, ModelStatusEnum } from '../lib/constants';

describe('constants', () => {
  describe('dEFAULT_SESSION_CONFIG', () => {
    it('should have correct default voice', () => {
      expect(DEFAULT_SESSION_CONFIG.voice).toBe('alloy');
    });

    it('should have default instructions', () => {
      expect(DEFAULT_SESSION_CONFIG.instructions).toBe('Call provided tools if appropriate for the user\'s input.');
    });

    it('should have correct input audio format', () => {
      expect(DEFAULT_SESSION_CONFIG.input_audio_format).toBe('pcm16');
    });

    it('should have input audio transcription configuration', () => {
      expect(DEFAULT_SESSION_CONFIG.input_audio_transcription).toEqual({
        model: 'whisper-1',
      });
    });

    it('should have turn detection configuration', () => {
      expect(DEFAULT_SESSION_CONFIG.turn_detection).toEqual({
        threshold: 0.4,
        silence_duration_ms: 600,
        type: 'server_vad',
      });
    });

    it('should be a valid session config object', () => {
      expect(DEFAULT_SESSION_CONFIG).toBeTypeOf('object');
      expect(DEFAULT_SESSION_CONFIG).not.toBeNull();
    });
  });

  describe('modelStatusEnum', () => {
    it('should have IDLE status', () => {
      expect(ModelStatusEnum.IDLE).toBe('idle');
    });

    it('should have LISTENING status', () => {
      expect(ModelStatusEnum.LISTENING).toBe('listening');
    });

    it('should have THINKING status', () => {
      expect(ModelStatusEnum.THINKING).toBe('thinking');
    });

    it('should have SPEAKING status', () => {
      expect(ModelStatusEnum.SPEAKING).toBe('speaking');
    });

    it('should have all expected enum values', () => {
      const expectedValues = ['idle', 'listening', 'thinking', 'speaking'];
      const actualValues = Object.values(ModelStatusEnum);

      expect(actualValues).toEqual(expectedValues);
      expect(actualValues).toHaveLength(4);
    });

    it('should have consistent enum keys and values', () => {
      expect(ModelStatusEnum.IDLE).toBe('idle');
      expect(ModelStatusEnum.LISTENING).toBe('listening');
      expect(ModelStatusEnum.THINKING).toBe('thinking');
      expect(ModelStatusEnum.SPEAKING).toBe('speaking');
    });
  });

  describe('modelStatusType', () => {
    it('should accept ModelStatusEnum values', () => {
      const testStatus: ModelStatusType = ModelStatusEnum.IDLE;
      expect(testStatus).toBe('idle');
    });

    it('should accept string literal values', () => {
      const testStatus: ModelStatusType = 'listening';
      expect(testStatus).toBe('listening');
    });

    it('should work with all enum values as types', () => {
      const idleStatus: ModelStatusType = 'idle';
      const listeningStatus: ModelStatusType = 'listening';
      const thinkingStatus: ModelStatusType = 'thinking';
      const speakingStatus: ModelStatusType = 'speaking';

      expect(idleStatus).toBe(ModelStatusEnum.IDLE);
      expect(listeningStatus).toBe(ModelStatusEnum.LISTENING);
      expect(thinkingStatus).toBe(ModelStatusEnum.THINKING);
      expect(speakingStatus).toBe(ModelStatusEnum.SPEAKING);
    });
  });

  describe('configuration validation', () => {
    it('should have valid threshold range for turn detection', () => {
      const threshold = (DEFAULT_SESSION_CONFIG.turn_detection as RealtimeRealtimeServerVadTurnDetection)?.threshold;
      expect(threshold).toBeGreaterThanOrEqual(0);
      expect(threshold).toBeLessThanOrEqual(1);
    });

    it('should have reasonable silence duration', () => {
      const silenceDuration = (DEFAULT_SESSION_CONFIG.turn_detection as RealtimeRealtimeServerVadTurnDetection)?.silence_duration_ms;
      expect(silenceDuration).toBeGreaterThan(0);
      expect(silenceDuration).toBeLessThan(10000); // Less than 10 seconds
    });

    it('should have valid audio format', () => {
      const validFormats = ['pcm16', 'g711_ulaw', 'g711_alaw'];
      expect(validFormats).toContain(DEFAULT_SESSION_CONFIG.input_audio_format);
    });

    it('should have valid voice option', () => {
      const validVoices = ['alloy', 'shimmer', 'echo'];
      expect(validVoices).toContain(DEFAULT_SESSION_CONFIG.voice);
    });

    it('should have valid turn detection type', () => {
      const validTypes = ['server_vad', 'none'];
      expect(validTypes).toContain(DEFAULT_SESSION_CONFIG.turn_detection?.type);
    });
  });
});
