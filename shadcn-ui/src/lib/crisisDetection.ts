import { EmotionAnalysis } from '@/types/emotion';

const crisisKeywords = [
  'die', 'death', 'kill', 'suicide', 'hurt myself', 'end it all', 'give up',
  'hopeless', 'worthless', 'want to die', 'end my life', 'no point',
  'can\'t go on', 'better off dead', 'harm myself'
];

const highRiskPhrases = [
  'i will die', 'i want to die', 'kill myself', 'end my life',
  'no reason to live', 'everyone would be better without me'
];

export function detectCrisis(text: string, emotionAnalysis: EmotionAnalysis): boolean {
  const lowerText = text.toLowerCase();
  
  // Check for direct crisis keywords
  const hasCrisisKeywords = crisisKeywords.some(keyword => 
    lowerText.includes(keyword)
  );
  
  // Check for high-risk phrases
  const hasHighRiskPhrases = highRiskPhrases.some(phrase => 
    lowerText.includes(phrase)
  );
  
  // Check emotion analysis
  const isCrisisEmotion = emotionAnalysis.emotion === 'crisis' || 
    (emotionAnalysis.emotion === 'sad' && emotionAnalysis.intensity > 80);
  
  return hasCrisisKeywords || hasHighRiskPhrases || isCrisisEmotion;
}

export function generateCrisisResponse(text: string): string {
  const responses = [
    "I'm really concerned about what you're sharing with me. Your life has value and meaning. Please consider reaching out to these Indian crisis helplines: Police (100), Medical Emergency (108), or Mental Health Support (9152987821). Would you like to talk about what's making you feel this way?",
    
    "Thank you for trusting me with these difficult feelings. You're not alone in this. There are people who want to help and support you. In India, you can call 108 for medical emergency or 9152987821 for mental health support. What's been weighing on your mind lately?",
    
    "I hear that you're going through something really tough right now. These feelings can be overwhelming, but they can change with proper support. Please consider calling 108 (medical emergency) or visiting your nearest hospital if you're in immediate danger. Can you tell me more about what's happening?",
    
    "Your message shows you're in a lot of pain right now. I want you to know that there are people trained to help with exactly these kinds of feelings. In India, call 100 (police), 108 (medical), or 9152987821 (mental health support). You deserve support and care."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

export function generateEmpatheticResponse(emotionAnalysis: EmotionAnalysis, text: string): string {
  const { emotion, intensity } = emotionAnalysis;
  
  switch (emotion) {
    case 'sad':
      if (intensity > 60) {
        return "I can hear the deep sadness in your words. It takes courage to share these feelings. You don't have to carry this burden alone. What's been the hardest part for you lately?";
      }
      return "I notice you're feeling down. Sometimes it helps to talk through what's on your mind. I'm here to listen without judgment.";
    
    case 'angry':
      if (intensity > 60) {
        return "I can sense your frustration and anger. Those are valid feelings, and it's okay to feel upset. Let's work through this together. What's triggering these intense feelings?";
      }
      return "It sounds like something is really bothering you. Anger often comes from feeling hurt or misunderstood. Would you like to share what's going on?";
    
    case 'anxious':
      return "I can feel the anxiety in your message. Anxiety can be overwhelming, but you're taking a positive step by reaching out. Let's take this one moment at a time. What's causing you the most worry right now?";
    
    case 'happy':
      return "I'm so glad to hear some positivity in your message! It's wonderful when we can find moments of joy. What's been bringing you happiness lately?";
    
    default:
      return "Thank you for sharing with me. I'm here to support you in whatever way feels helpful right now. How are you feeling, and what would be most supportive for you?";
  }
}