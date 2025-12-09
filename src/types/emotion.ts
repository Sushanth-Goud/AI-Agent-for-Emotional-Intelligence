export interface EmotionAnalysis {
  emotion: string;
  confidence: number;
  intensity: number;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emotionAnalysis?: EmotionAnalysis;
  isCrisis?: boolean;
}

export interface SystemStatus {
  camera: 'active' | 'inactive';
  microphone: 'active' | 'inactive';
  textAnalysis: boolean;
  voiceDetection: boolean;
  facialRecognition: boolean;
}

export interface EmotionState {
  primary: string;
  confidence: number;
  history: EmotionAnalysis[];
}