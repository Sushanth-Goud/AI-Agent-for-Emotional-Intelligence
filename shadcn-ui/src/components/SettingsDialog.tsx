import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Settings, Bell, Shield, Palette, Volume2 } from 'lucide-react';

export default function SettingsDialog() {
  const [notifications, setNotifications] = useState(true);
  const [crisisAlerts, setCrisisAlerts] = useState(true);
  const [voiceSensitivity, setVoiceSensitivity] = useState([75]);
  const [autoResponse, setAutoResponse] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100 transition-colors">
          <Settings size={20} className="text-gray-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Settings className="text-blue-600" size={24} />
            EmotionAI Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="text-green-600" size={20} />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-gray-500">Receive alerts for important updates</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Crisis Alerts</p>
                  <p className="text-sm text-gray-500">Immediate alerts for crisis situations</p>
                </div>
                <Switch checked={crisisAlerts} onCheckedChange={setCrisisAlerts} />
              </div>
            </CardContent>
          </Card>

          {/* Audio Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Volume2 className="text-blue-600" size={20} />
                Audio Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">Voice Sensitivity</p>
                  <span className="text-sm text-gray-500">{voiceSensitivity[0]}%</span>
                </div>
                <Slider
                  value={voiceSensitivity}
                  onValueChange={setVoiceSensitivity}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto Response</p>
                  <p className="text-sm text-gray-500">Automatically respond to voice input</p>
                </div>
                <Switch checked={autoResponse} onCheckedChange={setAutoResponse} />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="text-purple-600" size={20} />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-700 font-medium mb-1">
                  <Shield size={16} />
                  Data Protection Active
                </div>
                <p className="text-sm text-green-600">
                  All conversations are processed locally and encrypted. No data is stored on external servers.
                </p>
              </div>
              
              <div className="text-xs text-gray-500 space-y-1">
                <p>🔒 End-to-end encryption enabled</p>
                <p>🛡️ No data sharing with third parties</p>
                <p>⚡ Real-time local processing</p>
                <p>🗑️ Auto-delete after 24 hours</p>
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Palette className="text-pink-600" size={20} />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-500">Switch to dark theme</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-red-600">
                🆘 Emergency Contacts (India)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="p-2 bg-red-50 border border-red-200 rounded">
                  <p className="font-semibold text-red-700">Police Emergency</p>
                  <p className="text-red-600">100</p>
                </div>
                <div className="p-2 bg-red-50 border border-red-200 rounded">
                  <p className="font-semibold text-red-700">Medical Emergency</p>
                  <p className="text-red-600">108</p>
                </div>
                <div className="p-2 bg-red-50 border border-red-200 rounded">
                  <p className="font-semibold text-red-700">Fire Emergency</p>
                  <p className="text-red-600">101</p>
                </div>
                <div className="p-2 bg-red-50 border border-red-200 rounded">
                  <p className="font-semibold text-red-700">Women Helpline</p>
                  <p className="text-red-600">1091</p>
                </div>
                <div className="p-2 bg-red-50 border border-red-200 rounded">
                  <p className="font-semibold text-red-700">Child Helpline</p>
                  <p className="text-red-600">1098</p>
                </div>
                <div className="p-2 bg-red-50 border border-red-200 rounded">
                  <p className="font-semibold text-red-700">Mental Health</p>
                  <p className="text-red-600">9152987821</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}