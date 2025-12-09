import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { EmotionState } from '@/types/emotion';
import { getEmotionColor, getEmotionEmoji } from '@/lib/emotionAnalyzer';

interface EmotionAnalysisProps {
  emotionState: EmotionState;
}

export default function EmotionAnalysis({ emotionState }: EmotionAnalysisProps) {
  const { primary, confidence } = emotionState;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Emotion Analysis</CardTitle>
        <div className="text-sm text-gray-500">
          {confidence}% confident
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getEmotionEmoji(primary)}</span>
            <div>
              <div className={`font-semibold capitalize ${getEmotionColor(primary)}`}>
                {primary}
              </div>
              <div className="text-sm text-gray-500">Primary emotion</div>
            </div>
          </div>
          <Badge variant={primary === 'crisis' ? 'destructive' : 'secondary'}>
            {confidence}%
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Confidence Level</span>
            <span>{confidence}%</span>
          </div>
          <Progress value={confidence} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Text</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Voice</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Face</span>
          </div>
        </div>

        {primary === 'crisis' && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-700">
              <span className="text-lg">🚨</span>
              <span className="font-semibold">Crisis Alert</span>
            </div>
            <p className="text-sm text-red-600 mt-1">
              Concerning content detected. Providing crisis support resources.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}