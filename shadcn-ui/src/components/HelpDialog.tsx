import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, MessageSquare, Camera, Mic, Heart, Shield, Phone } from 'lucide-react';

export default function HelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100 transition-colors">
          <HelpCircle size={20} className="text-gray-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <HelpCircle className="text-blue-600" size={24} />
            How to Use EmotionAI Agent
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Quick Start */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="text-red-500" size={20} />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-700">
                EmotionAI Agent is your empathetic AI companion designed to provide emotional support and crisis intervention.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                  <MessageSquare className="text-blue-600 mx-auto mb-2" size={24} />
                  <p className="font-medium text-blue-700">Chat</p>
                  <p className="text-xs text-blue-600">Share your feelings</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                  <Camera className="text-green-600 mx-auto mb-2" size={24} />
                  <p className="font-medium text-green-700">Video</p>
                  <p className="text-xs text-green-600">Facial emotion analysis</p>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-center">
                  <Mic className="text-purple-600 mx-auto mb-2" size={24} />
                  <p className="font-medium text-purple-700">Voice</p>
                  <p className="text-xs text-purple-600">Voice emotion detection</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      Text Analysis
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Real-time emotion detection from your text messages with confidence levels.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                      Voice Detection
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Voice input analysis for emotional tone and speech patterns.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-purple-600 border-purple-200">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-1"></div>
                      Facial Recognition
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Camera-based facial expression analysis for emotion detection.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-red-600 border-red-200">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                      Crisis Support
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Automatic crisis detection with immediate support resources and helplines.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="text-green-600" size={20} />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>All data processed locally</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>End-to-end encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>No data sharing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Auto-delete after 24h</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-red-600">
                <Phone className="text-red-600" size={20} />
                Emergency Contacts (India)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-red-700 font-medium mb-3">If you're in immediate danger, please contact:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <div className="text-red-600">
                    <span className="font-semibold">Police:</span> 100
                  </div>
                  <div className="text-red-600">
                    <span className="font-semibold">Medical:</span> 108
                  </div>
                  <div className="text-red-600">
                    <span className="font-semibold">Fire:</span> 101
                  </div>
                  <div className="text-red-600">
                    <span className="font-semibold">Women:</span> 1091
                  </div>
                  <div className="text-red-600">
                    <span className="font-semibold">Child:</span> 1098
                  </div>
                  <div className="text-red-600">
                    <span className="font-semibold">Mental Health:</span> 9152987821
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tips for Best Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Be honest about your feelings - the AI is here to help, not judge</p>
                <p>• Use clear, descriptive language about your emotional state</p>
                <p>• Allow camera and microphone access for full multi-modal analysis</p>
                <p>• Take breaks if you feel overwhelmed during conversations</p>
                <p>• Remember that this is a support tool, not a replacement for professional help</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}