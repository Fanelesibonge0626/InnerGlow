export interface Affirmation {
  text: string;
  category: string;
  intensity: 'gentle' | 'moderate' | 'strong';
}

export const emotionAffirmations: Record<string, Affirmation[]> = {
  grateful: [
    {
      text: "Your gratitude creates a beautiful foundation for joy and abundance in your life.",
      category: "gratitude",
      intensity: "gentle"
    },
    {
      text: "You have the power to find beauty and meaning in even the smallest moments.",
      category: "gratitude", 
      intensity: "moderate"
    },
    {
      text: "Your grateful heart is a beacon of light that inspires others and transforms your world.",
      category: "gratitude",
      intensity: "strong"
    }
  ],
  happy: [
    {
      text: "Your happiness is contagious and brings light to everyone around you.",
      category: "joy",
      intensity: "gentle"
    },
    {
      text: "You deserve to feel this joy and let it fill your entire being.",
      category: "joy",
      intensity: "moderate"
    },
    {
      text: "Your happiness is a testament to your resilience and inner strength.",
      category: "joy",
      intensity: "strong"
    }
  ],
  calm: [
    {
      text: "Your inner peace is a sanctuary that you can always return to.",
      category: "peace",
      intensity: "gentle"
    },
    {
      text: "You have the wisdom to find stillness even in the midst of chaos.",
      category: "peace",
      intensity: "moderate"
    },
    {
      text: "Your calm presence is a gift that brings harmony to every situation.",
      category: "peace",
      intensity: "strong"
    }
  ],
  anxious: [
    {
      text: "It's okay to feel anxious. This feeling will pass, and you have the strength to get through it.",
      category: "comfort",
      intensity: "gentle"
    },
    {
      text: "You are safe. Take deep breaths and remember that you've overcome difficult moments before.",
      category: "comfort",
      intensity: "moderate"
    },
    {
      text: "Your anxiety doesn't define you. You are stronger than your fears and capable of finding peace.",
      category: "comfort",
      intensity: "strong"
    }
  ],
  sad: [
    {
      text: "It's okay to feel sad. Your emotions are valid and deserve to be honored.",
      category: "validation",
      intensity: "gentle"
    },
    {
      text: "You don't have to rush through your sadness. Take the time you need to heal.",
      category: "validation",
      intensity: "moderate"
    },
    {
      text: "Your sadness is temporary, but your strength and resilience are permanent. You will feel joy again.",
      category: "validation",
      intensity: "strong"
    }
  ],
  angry: [
    {
      text: "Your anger is a signal that something needs to change. Use it as fuel for positive action.",
      category: "transformation",
      intensity: "gentle"
    },
    {
      text: "It's okay to feel angry. Channel this energy into creating positive change in your life.",
      category: "transformation",
      intensity: "moderate"
    },
    {
      text: "Your anger shows you care deeply. Use this passion to protect what matters and create justice.",
      category: "transformation",
      intensity: "strong"
    }
  ],
  confused: [
    {
      text: "Confusion is often the first step toward clarity. Trust that answers will come.",
      category: "clarity",
      intensity: "gentle"
    },
    {
      text: "It's okay not to have all the answers right now. Your intuition will guide you forward.",
      category: "clarity",
      intensity: "moderate"
    },
    {
      text: "Your confusion is a sign of growth. You're expanding beyond old ways of thinking.",
      category: "clarity",
      intensity: "strong"
    }
  ],
  excited: [
    {
      text: "Your excitement is contagious and brings energy to everything you do.",
      category: "enthusiasm",
      intensity: "gentle"
    },
    {
      text: "Channel this excitement into action. You have the power to make amazing things happen.",
      category: "enthusiasm",
      intensity: "moderate"
    },
    {
      text: "Your excitement is a superpower that can inspire others and create positive change.",
      category: "enthusiasm",
      intensity: "strong"
    }
  ],
  hopeful: [
    {
      text: "Your hope is a light that guides you through difficult times.",
      category: "optimism",
      intensity: "gentle"
    },
    {
      text: "Hold onto your hope. It's the foundation for creating the future you envision.",
      category: "optimism",
      intensity: "moderate"
    },
    {
      text: "Your hope is unshakeable and will carry you through any challenge life presents.",
      category: "optimism",
      intensity: "strong"
    }
  ]
};

export function getRandomAffirmation(emotion: string, intensity?: 'gentle' | 'moderate' | 'strong'): Affirmation | null {
  const affirmations = emotionAffirmations[emotion];
  if (!affirmations) return null;
  
  if (intensity) {
    const filtered = affirmations.filter(a => a.intensity === intensity);
    return filtered[Math.floor(Math.random() * filtered.length)];
  }
  
  return affirmations[Math.floor(Math.random() * affirmations.length)];
}

export function getAffirmationsByEmotion(emotion: string): Affirmation[] {
  return emotionAffirmations[emotion] || [];
} 