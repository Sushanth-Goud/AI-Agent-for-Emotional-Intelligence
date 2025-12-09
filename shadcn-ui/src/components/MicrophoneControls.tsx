import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface MicrophoneControlsProps {
  onStatusChange: (status: 'active' | 'inactive') => void;
  onVoiceDetected: (text: string) => void;
}

export default function MicrophoneControls({ onStatusChange, onVoiceDetected }: MicrophoneControlsProps) {
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>();

  const startMicrophone = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: false 
      });
      setStream(mediaStream);
      
      // Setup audio analysis
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(mediaStream);
      
      analyser.fftSize = 256;
      source.connect(analyser);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      
      setIsActive(true);
      onStatusChange('active');
      startAudioAnalysis();
      
      // Simulate voice recognition (in real app, use Web Speech API)
      setTimeout(() => {
        if (Math.random() > 0.5) {
          onVoiceDetected("Voice input detected");
          setIsListening(true);
          setTimeout(() => setIsListening(false), 2000);
        }
      }, 3000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Microphone access denied or not available');
    }
  };

  const stopMicrophone = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsActive(false);
    setAudioLevel(0);
    setIsListening(false);
    onStatusChange('inactive');
  };

  const startAudioAnalysis = () => {
    if (!analyserRef.current) return;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    
    const analyze = () => {
      if (!analyserRef.current) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      setAudioLevel(Math.min(100, (average / 255) * 100 * 3));
      
      animationRef.current = requestAnimationFrame(analyze);
    };
    
    analyze();
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [stream]);

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="text-blue-600" size={20} />
              <span className="font-medium">Voice Input</span>
            </div>
            <Button
              onClick={isActive ? stopMicrophone : startMicrophone}
              variant={isActive ? "destructive" : "default"}
              size="sm"
              className="gap-2"
            >
              {isActive ? <MicOff size={16} /> : <Mic size={16} />}
              {isActive ? 'Stop' : 'Start'}
            </Button>
          </div>
          
          {isActive && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className={isListening ? "text-green-600 font-medium" : "text-gray-500"}>
                  {isListening ? "🎤 Listening..." : "Monitoring audio"}
                </span>
                <span className="text-xs text-gray-400">{Math.round(audioLevel)}%</span>
              </div>
              <Progress value={audioLevel} className="h-2" />
            </div>
          )}
          
          {!isActive && (
            <div className="text-center text-gray-500 py-4">
              <Mic size={32} className="mx-auto mb-2" />
              <p className="text-sm">Microphone inactive</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}