import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Bot } from 'lucide-react';
import ChatInterface from '../components/ChatInterface';
import EmotionAnalysis from '../components/EmotionAnalysis';
import StatusPanel from '../components/StatusPanel';
import SettingsDialog from '../components/SettingsDialog';
import HelpDialog from '../components/HelpDialog';
import { EmotionState, SystemStatus } from '../types/emotion';

export default function Index() {
  const [emotionState, setEmotionState] = useState<EmotionState>({
    primary: 'neutral',
    confidence: 17,
    history: []
  });

  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    camera: 'inactive',
    microphone: 'inactive',
    textAnalysis: true,
    voiceDetection: true,
    facialRecognition: true
  });

  const handleCameraStatusChange = (status: 'active' | 'inactive') => {
    setSystemStatus(prev => ({ ...prev, camera: status }));
  };

  const handleMicrophoneStatusChange = (status: 'active' | 'inactive') => {
    setSystemStatus(prev => ({ ...prev, microphone: status }));
  };

  const handleVoiceDetected = (text: string) => {
    console.log('Voice detected:', text);
    // Handle voice input here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 font-inter">
      {/* Header */}
      <div className="border-b bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  EA
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  EmotionAI Agent
                </h1>
                <p className="text-sm text-gray-600 font-medium">Multi-Modal Empathetic AI Assistant</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2">
                <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50 hover:bg-green-100 transition-colors">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Text Analysis
                </Badge>
                <Badge variant="outline" className={`transition-colors ${
                  systemStatus.microphone === 'active' 
                    ? 'text-blue-600 border-blue-300 bg-blue-50' 
                    : 'text-gray-500 border-gray-300 bg-gray-50'
                }`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    systemStatus.microphone === 'active' ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'
                  }`}></div>
                  Voice Detection
                </Badge>
                <Badge variant="outline" className={`transition-colors ${
                  systemStatus.camera === 'active' 
                    ? 'text-purple-600 border-purple-300 bg-purple-50' 
                    : 'text-gray-500 border-gray-300 bg-gray-50'
                }`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    systemStatus.camera === 'active' ? 'bg-purple-500 animate-pulse' : 'bg-gray-400'
                  }`}></div>
                  Facial Recognition
                </Badge>
              </div>
              
              <div className="flex items-center gap-1">
                <SettingsDialog />
                <HelpDialog />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-full shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Bot className="text-purple-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-gray-800">EmotionAI Assistant</CardTitle>
                    <p className="text-sm text-gray-600">Your empathetic AI companion</p>
                  </div>
                  <Badge variant="secondary" className="bg-white/80 text-purple-700 border-purple-200 font-medium">
                    🤗 Empathetic Support
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="h-[calc(100%-100px)] p-0">
                <ChatInterface onEmotionUpdate={setEmotionState} />
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6 h-full overflow-y-auto">
            {/* Emotion Analysis */}
            <div className="h-auto min-h-[300px]">
              <EmotionAnalysis emotionState={emotionState} />
            </div>

            {/* Status Panel */}
            <div className="h-auto">
              <StatusPanel 
                status={systemStatus}
                onCameraStatusChange={handleCameraStatusChange}
                onMicrophoneStatusChange={handleMicrophoneStatusChange}
                onVoiceDetected={handleVoiceDetected}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Crisis Resources Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-red-50 to-orange-50 border-t border-red-200 shadow-lg backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-6 text-sm text-red-700 font-medium">
            <span className="font-bold flex items-center gap-2">
              🆘 Emergency Contacts (India):
            </span>
            <span className="hover:text-red-800 cursor-pointer transition-colors">Police: 100</span>
            <span className="text-red-400">•</span>
            <span className="hover:text-red-800 cursor-pointer transition-colors">Medical: 108</span>
            <span className="text-red-400">•</span>
            <span className="hover:text-red-800 cursor-pointer transition-colors">Mental Health: 9152987821</span>
            <span className="text-red-400">•</span>
            <span className="hover:text-red-800 cursor-pointer transition-colors">Women Helpline: 1091</span>
          </div>
        </div>
      </div>
    </div>
  );
}