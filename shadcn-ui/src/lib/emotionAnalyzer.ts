import { EmotionAnalysis } from '@/types/emotion';

const emotionKeywords = {
  happy: ['happy', 'joy', 'excited', 'great', 'amazing', 'wonderful', 'fantastic', 'good', 'smile', 'laugh'],
  sad: ['sad', 'depressed', 'down', 'unhappy', 'miserable', 'cry', 'tears', 'hurt', 'pain', 'lonely'],
  angry: ['angry', 'mad', 'furious', 'rage', 'hate', 'pissed', 'annoyed', 'frustrated', 'fuck', 'damn'],
  anxious: ['anxious', 'worried', 'nervous', 'scared', 'afraid', 'panic', 'stress', 'overwhelmed', 'tense'],
  neutral: ['okay', 'fine', 'alright', 'normal', 'whatever', 'sure', 'yes', 'no'],
  crisis: ['die', 'death', 'kill', 'suicide', 'hurt myself', 'end it', 'give up', 'hopeless', 'worthless']
};

export function analyzeEmotion(text: string): EmotionAnalysis {
  const lowerText = text.toLowerCase();
  const words = lowerText.split(/\s+/);
  
  const emotionScores: Record<string, number> = {};
  
  // Calculate emotion scores based on keyword matches
  Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
    emotionScores[emotion] = 0;
    keywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        emotionScores[emotion] += 1;
      }
    });
  });
  
  // Find dominant emotion
  let dominantEmotion = 'neutral';
  let maxScore = 0;
  
  Object.entries(emotionScores).forEach(([emotion, score]) => {
    if (score > maxScore) {
      maxScore = score;
      dominantEmotion = emotion;
    }
  });
  
  // Calculate confidence based on keyword density
  const confidence = Math.min(100, (maxScore / words.length) * 100 + 10);
  
  // Adjust for text length and context
  const intensity = Math.min(100, maxScore * 25 + (text.length > 50 ? 20 : 0));
  
  return {
    emotion: dominantEmotion,
    confidence: Math.round(confidence),
    intensity: Math.round(intensity)
  };
}

export function getEmotionColor(emotion: string): string {
  const colors = {
    happy: 'text-green-500',
    sad: 'text-blue-500',
    angry: 'text-red-500',
    anxious: 'text-yellow-500',
    neutral: 'text-gray-500',
    crisis: 'text-red-600'
  };
  return colors[emotion as keyof typeof colors] || 'text-gray-500';
}

export function getEmotionEmoji(emotion: string): string {
  const emojis = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    anxious: '😰',
    neutral: '😐',
    crisis: '🚨'
  };
  return emojis[emotion as keyof typeof emojis] || '😐';
}