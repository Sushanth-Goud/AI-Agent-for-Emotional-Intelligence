import { EmotionAnalysis } from '@/types/emotion';

const emotionKeywords = {
  happy: [
    "joy", "excited", "great", "amazing", "happy", "wonderful", "fantastic", "good", "smile", "laugh",
    "delighted", "cheerful", "pleased", "content", "optimistic", "blessed", "ecstatic", "blissful", "thrilled", "radiant",
    "upbeat", "merry", "elated", "euphoric", "satisfied", "buoyant", "sparkling", "grateful"
  ],
  sad: [
    "sad", "depressed", "down", "unhappy", "cry", "tears", "hurt", "pain", "lonely",
    "sorrow", "miserable", "grieving", "melancholic", "heartbroken", "desolate", "gloomy", "downcast", "mourning", "despair",
    "blue", "discouraged", "forlorn", "heavy-hearted", "crushed", "wistful"
  ],
  angry: [
    "angry", "hates", "rage", "annoyed", "pissed", "annoy", "frustrated", "fuck", "damn",
    "furious", "irate", "enraged", "resentful", "infuriated", "outraged", "mad", "pissed off",
    "hostile", "agitated", "bitter", "cross", "vindictive", "provoked"
  ],
  anxious: [
    "anxious", "worried", "nervous", "scared", "afraid", "panic", "stress", "overwhelmed", "tense",
    "petrified", "terrified", "uneasy", "jumpy", "startled", "apprehensive", "shaky", "paranoid", "restless",
    "fidgety", "hyper", "tight", "uneasy", "on edge", "insecure"
  ],
  love: [
    "love", "affection", "caring", "adoring", "tender", "cherished", "passionate", "fond", "devoted", "infatuated",
    "romantic", "sweetheart", "dear", "beloved", "date", "heart", "affinity"
  ],
  surprise: [
    "surprised", "astonished", "amazed", "startled", "stunned", "shocked", "bewildered", "dumbfounded", "impressed",
    "awe", "jaw-drop", "unexpected", "speechless", "gobsmacked", "flabbergasted"
  ],
  disgust: [
    "disgusted", "repulsed", "revolted", "grossed out", "appalled", "horrified", "nauseated", "sickened", "put off",
    "disturbed", "loathsome", "abhorrent", "repellent", "offended", "recoiling"
  ],
  hopeful: [
    "hopeful", "encouraged", "confident", "positive", "inspired",
    "uplifted", "motivated", "expectant", "trusting", "reassured"
  ],
  lonely: [
    "lonely", "isolated", "abandoned", "alienated", "forgotten",
    "lonesome", "forsaken", "unwanted", "solitary", "friendless"
  ],
  calm: [
    "calm", "peaceful", "serene", "tranquil", "relaxed", "restful",
    "chilled", "collected", "soothing", "gentle", "composed"
  ],
  crisis: [
    "die", "death", "kill", "suicide", "hurt myself", "end it", "give up", "hopeless", "worthless",
    "over", "done for", "ruined", "lost", "nothing left", "broken", "cannot go on", "finished"
  ]
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