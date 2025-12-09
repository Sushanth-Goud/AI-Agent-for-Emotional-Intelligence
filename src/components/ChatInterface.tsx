import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Bot, User } from 'lucide-react';
import { Message, EmotionState } from '@/types/emotion';
import { analyzeEmotion, getEmotionEmoji } from '@/lib/emotionAnalyzer';
import { detectCrisis, generateCrisisResponse, generateEmpatheticResponse } from '@/lib/crisisDetection';

interface ChatInterfaceProps {
  onEmotionUpdate: (emotion: EmotionState) => void;
}

export default function ChatInterface({ onEmotionUpdate }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm here to listen and support you. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    // Analyze emotion
    const emotionAnalysis = analyzeEmotion(inputText);
    userMessage.emotionAnalysis = emotionAnalysis;

    // Check for crisis
    const isCrisis = detectCrisis(inputText, emotionAnalysis);
    userMessage.isCrisis = isCrisis;

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Update emotion state
    onEmotionUpdate({
      primary: emotionAnalysis.emotion,
      confidence: emotionAnalysis.confidence,
      history: [emotionAnalysis]
    });

    // Generate AI response
    setTimeout(() => {
      let aiResponse: string;
      
      if (isCrisis) {
        aiResponse = generateCrisisResponse(inputText);
      } else {
        aiResponse = generateEmpatheticResponse(emotionAnalysis, inputText);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.sender === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-purple-500 text-white'
            }`}>
              {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            
            <Card className={`max-w-[70%] p-3 ${
              message.sender === 'user' 
                ? 'bg-blue-50 border-blue-200' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm">{message.text}</p>
                {message.emotionAnalysis && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span>{getEmotionEmoji(message.emotionAnalysis.emotion)}</span>
                    <span className="capitalize">{message.emotionAnalysis.emotion}</span>
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-400 mt-2">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
                {message.isCrisis && (
                  <span className="ml-2 text-red-500 font-semibold">⚠️ Crisis Detected</span>
                )}
              </div>
            </Card>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
              <Bot size={16} />
            </div>
            <Card className="bg-gray-50 border-gray-200 p-3">
              <div className="flex items-center gap-1">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-gray-500 ml-2">EmotionAI is typing...</span>
              </div>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share how you're feeling..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            size="icon"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}