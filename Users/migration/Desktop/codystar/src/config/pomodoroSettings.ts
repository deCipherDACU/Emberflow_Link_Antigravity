/**
 * Enhanced Pomodoro Timer Configuration
 * Includes focus music, advanced settings, and productivity features
 */

export interface PomodoroSettings {
  focusDuration: number; // minutes
  shortBreakDuration: number; // minutes
  longBreakDuration: number; // minutes
  sessionsBeforeLongBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  enableNotifications: boolean;
  enableSounds: boolean;
  enableMusic: boolean;
  musicProvider: 'spotify' | 'youtube' | 'none';
  selectedPlaylist?: string;
  volume: number; // 0-100
  tickingSoundEnabled: boolean;
  endSoundType: 'bell' | 'chime' | 'alarm' | 'gentle';
}

export const DEFAULT_POMODORO_SETTINGS: PomodoroSettings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsBeforeLongBreak: 4,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  enableNotifications: true,
  enableSounds: true,
  enableMusic: false,
  musicProvider: 'none',
  volume: 70,
  tickingSoundEnabled: false,
  endSoundType: 'bell',
};

// Curated focus playlists
export interface FocusPlaylist {
  id: string;
  name: string;
  description: string;
  provider: 'spotify' | 'youtube';
  url: string;
  embedId: string;
  category: 'deep-focus' | 'lofi' | 'ambient' | 'classical' | 'nature' | 'binaural';
  thumbnail?: string;
}

export const FOCUS_PLAYLISTS: FocusPlaylist[] = [
  // Spotify Playlists
  {
    id: 'spotify_deep_focus',
    name: 'Deep Focus',
    description: 'Keep calm and focus with ambient and post-rock music',
    provider: 'spotify',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ',
    embedId: '37i9dQZF1DWZeKCadgRdKQ',
    category: 'deep-focus',
  },
  {
    id: 'spotify_lofi_beats',
    name: 'Lo-fi Beats',
    description: 'Chill beats to help you focus and relax',
    provider: 'spotify',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn',
    embedId: '37i9dQZF1DWWQRwui0ExPn',
    category: 'lofi',
  },
  {
    id: 'spotify_peaceful_piano',
    name: 'Peaceful Piano',
    description: 'Relax and indulge with beautiful piano pieces',
    provider: 'spotify',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO',
    embedId: '37i9dQZF1DX4sWSpwq3LiO',
    category: 'classical',
  },
  {
    id: 'spotify_ambient_chill',
    name: 'Ambient Chill',
    description: 'Soften the edge with ambient and experimental music',
    provider: 'spotify',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY',
    embedId: '37i9dQZF1DX3Ogo9pFvBkY',
    category: 'ambient',
  },
  {
    id: 'spotify_intense_studying',
    name: 'Intense Studying',
    description: 'Classical music for intense focus sessions',
    provider: 'spotify',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DX8NTLI2TtZa6',
    embedId: '37i9dQZF1DX8NTLI2TtZa6',
    category: 'classical',
  },
  
  // YouTube Music Playlists (using video IDs)
  {
    id: 'youtube_lofi_hip_hop',
    name: 'Lofi Hip Hop Radio',
    description: '24/7 lofi beats to study/relax to',
    provider: 'youtube',
    url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    embedId: 'jfKfPfyJRdk',
    category: 'lofi',
  },
  {
    id: 'youtube_deep_focus',
    name: 'Deep Focus Music',
    description: 'Improve your focus with electronic music',
    provider: 'youtube',
    url: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
    embedId: '5qap5aO4i9A',
    category: 'deep-focus',
  },
  {
    id: 'youtube_nature_sounds',
    name: 'Nature Sounds',
    description: 'Relaxing forest sounds for deep focus',
    provider: 'youtube',
    url: 'https://www.youtube.com/watch?v=eKFTSSKCzWA',
    embedId: 'eKFTSSKCzWA',
    category: 'nature',
  },
  {
    id: 'youtube_binaural_beats',
    name: 'Binaural Beats Focus',
    description: 'Alpha waves for concentration and studying',
    provider: 'youtube',
    url: 'https://www.youtube.com/watch?v=WPni755-Krg',
    embedId: 'WPni755-Krg',
    category: 'binaural',
  },
  {
    id: 'youtube_classical_focus',
    name: 'Classical Music for Focus',
    description: 'Mozart, Bach, and Beethoven for productivity',
    provider: 'youtube',
    url: 'https://www.youtube.com/watch?v=jgpJVI3tDbY',
    embedId: 'jgpJVI3tDbY',
    category: 'classical',
  },
];

// Pomodoro improvements
export interface PomodoroFeatures {
  taskIntegration: boolean; // Link to specific tasks
  dailyGoalSetting: boolean; // Set daily pomodoro goals
  streakTracking: boolean; // Track consecutive days
  analytics: boolean; // Detailed time analytics
  challenges: boolean; // Daily/weekly challenges
  teamPomodoro: boolean; // Sync with friends (future)
}

export const POMODORO_IMPROVEMENTS = {
  features: [
    'Link Pomodoro sessions to specific tasks',
    'Set daily/weekly Pomodoro goals',
    'Track your focus streak',
    'Visual analytics and reports',
    'Pomodoro challenges and achievements',
    'Custom presets for different work types',
    'Distraction logging',
    'Integration with task categories',
  ],
  analytics: [
    'Daily focus time heatmap',
    'Most productive hours',
    'Break-to-work ratio',
    'Task completion correlation',
    'Weekly/monthly trends',
    'Category-wise time distribution',
  ],
};
