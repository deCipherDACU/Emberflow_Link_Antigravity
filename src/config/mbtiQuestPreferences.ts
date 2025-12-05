/**
 * MBTI-Based Quest Preferences
 * Personalized quest recommendations based on personality type
 */

export interface MBTITraits {
  energySource: 'E' | 'I'; // Extrovert vs Introvert
  information: 'S' | 'N'; // Sensing vs Intuition
  decisions: 'T' | 'F'; // Thinking vs Feeling
  lifestyle: 'J' | 'P'; // Judging vs Perceiving
}

export interface MBTIQuestPreference {
  type: string;
  strengths: string[];
  challenges: string[];
  preferredQuestTypes: string[];
  avoidedQuestTypes: string[];
  motivationalStyle: string;
  recommendedCategories: string[];
  productivityTips: string[];
}

export const MBTI_QUEST_PREFERENCES: Record<string, MBTIQuestPreference> = {
  // Analysts
  INTJ: {
    type: 'INTJ - The Architect',
    strengths: ['Strategic planning', 'Independent work', 'Complex problem-solving'],
    challenges: ['Social interactions', 'Routine tasks', 'Emotional expression'],
    preferredQuestTypes: ['intellectual', 'personal', 'financial'],
    avoidedQuestTypes: ['social'],
    motivationalStyle: 'Achievement and mastery',
    recommendedCategories: ['intellectual', 'personal', 'financial'],
    productivityTips: [
      'Set long-term strategic goals',
      'Work in focused, uninterrupted blocks',
      'Challenge yourself with complex problems',
    ],
  },
  
  INTP: {
    type: 'INTP - The Logician',
    strengths: ['Analytical thinking', 'Innovation', 'Understanding complex systems'],
    challenges: ['Following through', 'Social obligations', 'Routine maintenance'],
    preferredQuestTypes: ['intellectual', 'personal'],
    avoidedQuestTypes: ['social', 'physical'],
    motivationalStyle: 'Curiosity and intellectual challenge',
    recommendedCategories: ['intellectual', 'personal'],
    productivityTips: [
      'Break large projects into puzzle-like challenges',
      'Use timers for focused deep work',
      'Balance exploration with execution',
    ],
  },
  
  ENTJ: {
    type: 'ENTJ - The Commander',
    strengths: ['Leadership', 'Strategic execution', 'Goal achievement'],
    challenges: ['Patience with details', 'Emotional sensitivity', 'Delegation'],
    preferredQuestTypes: ['financial', 'intellectual', 'social'],
    avoidedQuestTypes: ['spiritual'],
    motivationalStyle: 'Power and influence',
    recommendedCategories: ['financial', 'intellectual', 'social'],
    productivityTips: [
      'Set ambitious, measurable goals',
      'Lead team-based projects',
      'Focus on strategic impact',
    ],
  },
  
  ENTP: {
    type: 'ENTP - The Debater',
    strengths: ['Innovation', 'Debate', 'Seeing possibilities'],
    challenges: ['Following through', 'Details', 'Routine'],
    preferredQuestTypes: ['intellectual', 'social', 'personal'],
    avoidedQuestTypes: ['physical'],
    motivationalStyle: 'Innovation and variety',
    recommendedCategories: ['intellectual', 'social', 'personal'],
    productivityTips: [
      'Work on multiple diverse projects',
      'Schedule brainstorming sessions',
      'Create accountability for completion',
    ],
  },
  
  // Diplomats
  INFJ: {
    type: 'INFJ - The Advocate',
    strengths: ['Insight', 'Idealism', 'Helping others'],
    challenges: ['Perfectionism', 'Burnout', 'Saying no'],
    preferredQuestTypes: ['spiritual', 'personal', 'social'],
    avoidedQuestTypes: ['financial'],
    motivationalStyle: 'Purpose and meaning',
    recommendedCategories: ['spiritual', 'personal', 'social'],
    productivityTips: [
      'Align tasks with core values',
      'Schedule reflection time',
      'Set boundaries to prevent burnout',
    ],
  },
  
  INFP: {
    type: 'INFP - The Mediator',
    strengths: ['Creativity', 'Empathy', 'Authenticity'],
    challenges: ['Structure', 'Deadlines', 'Conflict'],
    preferredQuestTypes: ['personal', 'spiritual', 'social'],
    avoidedQuestTypes: ['financial'],
    motivationalStyle: 'Personal values and authenticity',
    recommendedCategories: ['personal', 'spiritual'],
    productivityTips: [
      'Create inspiring workspace',
      'Connect tasks to personal meaning',
      'Use flexible deadlines with buffer time',
    ],
  },
  
  ENFJ: {
    type: 'ENFJ - The Protagonist',
    strengths: ['Inspiring others', 'Empathy', 'Communication'],
    challenges: ['Own needs', 'Criticism', 'Overcommitment'],
    preferredQuestTypes: ['social', 'spiritual', 'personal'],
    avoidedQuestTypes: ['intellectual'],
    motivationalStyle: 'Helping others grow',
    recommendedCategories: ['social', 'spiritual', 'personal'],
    productivityTips: [
      'Build collaborative projects',
      'Schedule self-care time',
      'Use social accountability',
    ],
  },
  
  ENFP: {
    type: 'ENFP - The Campaigner',
    strengths: ['Enthusiasm', 'Creativity', 'Connection'],
    challenges: ['Follow-through', 'Organization', 'Routine'],
    preferredQuestTypes: ['personal', 'social', 'spiritual'],
    avoidedQuestTypes: ['financial'],
    motivationalStyle: 'Inspiration and possibilities',
    recommendedCategories: ['personal', 'social'],
    productivityTips: [
      'Start with energizing tasks',
      'Use variety to maintain interest',
      'Partner with detail-oriented people',
    ],
  },
  
  // Sentinels
  ISTJ: {
    type: 'ISTJ - The Logistician',
    strengths: ['Organization', 'Reliability', 'Detail-oriented'],
    challenges: ['Flexibility', 'Spontaneity', 'Emotional expression'],
    preferredQuestTypes: ['financial', 'physical', 'intellectual'],
    avoidedQuestTypes: ['spiritual'],
    motivationalStyle: 'Duty and responsibility',
    recommendedCategories: ['financial', 'physical'],
    productivityTips: [
      'Create detailed checklists',
      'Use proven methods',
      'Schedule everything precisely',
    ],
  },
  
  ISFJ: {
    type: 'ISFJ - The Defender',
    strengths: ['Supportiveness', 'Attention to detail', 'Loyalty'],
    challenges: ['Change', 'Saying no', 'Self-promotion'],
    preferredQuestTypes: ['social', 'physical', 'personal'],
    avoidedQuestTypes: ['intellectual'],
    motivationalStyle: 'Service and stability',
    recommendedCategories: ['social', 'physical'],
    productivityTips: [
      'Help others through structured tasks',
      'Maintain routines for stability',
      'Recognize your own accomplishments',
    ],
  },
  
  ESTJ: {
    type: 'ESTJ - The Executive',
    strengths: ['Leadership', 'Organization', 'Decisiveness'],
    challenges: ['Flexibility', 'Emotion', 'Unconventional methods'],
    preferredQuestTypes: ['financial', 'social', 'physical'],
    avoidedQuestTypes: ['spiritual'],
    motivationalStyle: 'Order and efficiency',
    recommendedCategories: ['financial', 'social'],
    productivityTips: [
      'Create clear hierarchies and systems',
      'Lead team initiatives',
      'Focus on tangible results',
    ],
  },
  
  ESFJ: {
    type: 'ESFJ - The Consul',
    strengths: ['Social harmony', 'Helpfulness', 'Practicality'],
    challenges: ['Criticism', 'Change', 'Own needs'],
    preferredQuestTypes: ['social', 'physical', 'personal'],
    avoidedQuestTypes: ['intellectual'],
    motivationalStyle: 'Helping and harmony',
    recommendedCategories: ['social', 'physical'],
    productivityTips: [
      'Work in collaborative environments',
      'Seek regular positive feedback',
      'Build social accountability',
    ],
  },
  
  // Explorers
  ISTP: {
    type: 'ISTP - The Virtuoso',
    strengths: ['Problem-solving', 'Hands-on skills', 'Adaptability'],
    challenges: ['Long-term planning', 'Emotions', 'Routine'],
    preferredQuestTypes: ['physical', 'personal', 'intellectual'],
    avoidedQuestTypes: ['spiritual', 'social'],
    motivationalStyle: 'Autonomy and action',
    recommendedCategories: ['physical', 'personal'],
    productivityTips: [
      'Work on hands-on projects',
      'Allow for spontaneity',
      'Use short-term goals',
    ],
  },
  
  ISFP: {
    type: 'ISFP - The Adventurer',
    strengths: ['Creativity', 'Flexibility', 'Aesthetics'],
    challenges: ['Planning', 'Conflict', 'Structure'],
    preferredQuestTypes: ['personal', 'physical', 'spiritual'],
    avoidedQuestTypes: ['financial', 'intellectual'],
    motivationalStyle: 'Freedom and expression',
    recommendedCategories: ['personal', 'physical'],
    productivityTips: [
      'Create in inspiring environments',
      'Use visual planning tools',
      'Allow flexible schedules',
    ],
  },
  
  ESTP: {
    type: 'ESTP - The Entrepreneur',
    strengths: ['Action', 'Adaptability', 'Boldness'],
    challenges: ['Long-term planning', 'Details', 'Theory'],
    preferredQuestTypes: ['physical', 'social', 'financial'],
    avoidedQuestTypes: ['spiritual'],
    motivationalStyle: 'Excitement and results',
    recommendedCategories: ['physical', 'social', 'financial'],
    productivityTips: [
      'Take immediate action',
      'Work in dynamic environments',
      'Use competition as motivation',
    ],
  },
  
  ESFP: {
    type: 'ESFP - The Entertainer',
    strengths: ['Enthusiasm', 'Spontaneity', 'People skills'],
    challenges: ['Long-term focus', 'Planning', 'Alone time'],
    preferredQuestTypes: ['social', 'physical', 'personal'],
    avoidedQuestTypes: ['intellectual'],
    motivationalStyle: 'Fun and social connection',
    recommendedCategories: ['social', 'physical'],
    productivityTips: [
      'Gamify tasks',
      'Work with others',
      'Keep tasks varied and engaging',
    ],
  },
};

export function getMBTIType(traits: MBTITraits): string {
  return `${traits.energySource}${traits.information}${traits.decisions}${traits.lifestyle}`;
}

export function getMBTIPreferences(mbtiType: string): MBTIQuestPreference | null {
  return MBTI_QUEST_PREFERENCES[mbtiType] || null;
}
