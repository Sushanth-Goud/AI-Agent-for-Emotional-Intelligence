import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MessageSquare, Volume2, Eye } from 'lucide-react';
import { SystemStatus } from '../types/emotion';
import CameraControls from './CameraControls';
import MicrophoneControls from './MicrophoneControls';

interface StatusPanelProps {
  status: SystemStatus;
  onCameraStatusChange: (status: 'active' | 'inactive') => void;
  onMicrophoneStatusChange: (status: 'active' | 'inactive') => void;
  onVoiceDetected: (text: string) => void;
}

export default function StatusPanel({ 
  status, 
  onCameraStatusChange, 
  onMicrophoneStatusChange, 
  onVoiceDetected 
}: StatusPanelProps) {
  return (
    <div className="space-y-4 h-full">
      {/* Analysis Modes Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Analysis Modes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-green-500" />
              <span className="text-sm font-medium">Text Analysis</span>
            </div>
            <Badge variant="default" className="bg-green-500 hover:bg-green-600">
              Active
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 size={16} className="text-blue-500" />
              <span className="text-sm font-medium">Voice Detection</span>
            </div>
            <Badge variant={status.microphone === 'active' ? 'default' : 'secondary'} 
                   className={status.microphone === 'active' ? 'bg-blue-500 hover:bg-blue-600' : ''}>
              {status.microphone === 'active' ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye size={16} className="text-purple-500" />
              <span className="text-sm font-medium">Facial Recognition</span>
            </div>
            <Badge variant={status.camera === 'active' ? 'default' : 'secondary'}
                   className={status.camera === 'active' ? 'bg-purple-500 hover:bg-purple-600' : ''}>
              {status.camera === 'active' ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Camera Controls */}
      <CameraControls onStatusChange={onCameraStatusChange} />

      {/* Microphone Controls */}
      <MicrophoneControls 
        onStatusChange={onMicrophoneStatusChange}
        onVoiceDetected={onVoiceDetected}
      />

      {/* Privacy Info */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="text-xs text-green-700 space-y-1">
            <p className="font-medium flex items-center gap-1">
              🔒 Privacy Protected
            </p>
            <p>All data processed locally</p>
            <p>🛡️ End-to-end encryption</p>
            <p>⚡ Real-time analysis</p>
            <p>🗑️ Auto-delete after 24h</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}