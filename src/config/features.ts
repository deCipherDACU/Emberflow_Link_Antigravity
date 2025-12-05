
/**
 * Simplified Feature Configuration
 * Focused on high-impact, easy-to-maintain features
 */

export const APP_FEATURES = {
  // CORE FEATURES (Always enabled)
  CORE: {
    DASHBOARD: true,
    QUEST_LOG: true,
    HABITS: true,
    XP_SYSTEM: true,
    PROFILE: true,
  },

  // ESSENTIAL FEATURES
  ESSENTIAL: {
    PROJECTS: true,              // Pre-designed quest templates
    POMODORO: true,              // Simple timer with 3 presets
    JOURNAL: true,               // Simplified text-only
    ACHIEVEMENTS: true,          // Visual badge gallery
    MORNING_RITUAL: true,        // Daily check-in
    EVENING_REFLECTION: true,    // Daily wrap-up
  },

  // OPTIONAL FEATURES (can be toggled)
  OPTIONAL: {
    AI_COACH: false,             // Conversational AI (enable when ready)
    WEEKLY_REVIEW: false,        // Guided reflection
    FOCUS_MODE: false,           // Single-task mode
    BREATHING: false,            // Breathing exercises
    SHOP: false,                 // Cosmetic rewards
    QUICK_WINS_FEED: false,      // Instagram-style celebrations
  },

  // DEPRECATED (removed from UI)
  DEPRECATED: {
    BOSS_FIGHTS: false,
    EQUIPMENT_SYSTEM: false,
    HP_SYSTEM: false,
    SKILL_TREES: false,          // Now simplified to single perks page
    SMART_TIMETABLE: false,
    AI_NOTIFICATIONS: false,
    HABIT_STACKING: false,
  },
} as const;

// Helper to check if feature is enabled
export function isFeatureEnabled(
  category: keyof typeof APP_FEATURES,
  feature: string
): boolean {
  const categoryFeatures = APP_FEATURES[category] as Record<string, boolean>;
  return categoryFeatures[feature] ?? false;
}
