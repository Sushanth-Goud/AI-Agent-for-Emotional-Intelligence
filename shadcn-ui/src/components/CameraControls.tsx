import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, CameraOff, Video, VideoOff } from 'lucide-react';

interface CameraControlsProps {
  onStatusChange: (status: 'active' | 'inactive') => void;
}

export default function CameraControls({ onStatusChange }: CameraControlsProps) {
  const [isActive, setIsActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: false 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsActive(true);
      onStatusChange('active');
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Camera access denied or not available');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
    onStatusChange('inactive');
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Video className="text-purple-600" size={20} />
              <span className="font-medium">Camera Feed</span>
            </div>
            <Button
              onClick={isActive ? stopCamera : startCamera}
              variant={isActive ? "destructive" : "default"}
              size="sm"
              className="gap-2"
            >
              {isActive ? <CameraOff size={16} /> : <Camera size={16} />}
              {isActive ? 'Stop' : 'Start'}
            </Button>
          </div>
          
          {isActive && (
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-32 bg-gray-900 rounded-lg object-cover"
              />
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                LIVE
              </div>
            </div>
          )}
          
          {!isActive && (
            <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Camera size={32} className="mx-auto mb-2" />
                <p className="text-sm">Camera inactive</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}