
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FOCUS_PLAYLISTS, FocusPlaylist } from '@/config/pomodoroSettings';
import { Music, Volume2, VolumeX, Play, Pause, SkipForward } from 'lucide-react';
import { LiquidGlassCard } from '../ui/LiquidGlassCard';

interface MusicPlayerProps {
  isPlaying: boolean;
  volume: number;
  onVolumeChange: (volume: number) => void;
  provider: 'spotify' | 'youtube' | 'none';
  onProviderChange: (provider: 'spotify' | 'youtube' | 'none') => void;
}

export function MusicPlayer({
  isPlaying,
  volume,
  onVolumeChange,
  provider,
  onProviderChange,
}: MusicPlayerProps) {
  const [selectedPlaylist, setSelectedPlaylist] = useState<FocusPlaylist | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const youtubePlayerRef = useRef<any>(null);

  const initializePlayer = (playlist: FocusPlaylist) => {
    if (youtubePlayerRef.current) {
        youtubePlayerRef.current.destroy();
    }
    youtubePlayerRef.current = new (window as any).YT.Player('youtube-player', {
      height: '0',
      width: '0',
      videoId: playlist.embedId,
      playerVars: {
        autoplay: isPlaying ? 1 : 0,
        controls: 0,
        loop: 1,
        playlist: playlist.embedId,
      },
      events: {
        onReady: (event: any) => {
          event.target.setVolume(volume);
          if (isPlaying) event.target.playVideo();
        },
      },
    });
  }
  
  // Load YouTube IFrame API and initialize player
  useEffect(() => {
    if (provider !== 'youtube' || !selectedPlaylist) {
        if(youtubePlayerRef.current) youtubePlayerRef.current.destroy();
        return;
    }
    
    if (!(window as any).YT || !(window as any).YT.Player) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
      
      (window as any).onYouTubeIframeAPIReady = () => {
        initializePlayer(selectedPlaylist);
      };
    } else {
        initializePlayer(selectedPlaylist);
    }
  }, [provider, selectedPlaylist]);
  

  // Control YouTube playback
  useEffect(() => {
    if (youtubePlayerRef.current && provider === 'youtube' && typeof youtubePlayerRef.current.playVideo === 'function') {
      if (isPlaying) {
        youtubePlayerRef.current.playVideo();
      } else {
        youtubePlayerRef.current.pauseVideo();
      }
    }
  }, [isPlaying, provider]);

  // Control volume
  useEffect(() => {
    if (youtubePlayerRef.current && provider === 'youtube' && typeof youtubePlayerRef.current.setVolume === 'function') {
      youtubePlayerRef.current.setVolume(isMuted ? 0 : volume);
    }
  }, [volume, isMuted, provider]);

  const availablePlaylists = FOCUS_PLAYLISTS.filter(p => p.provider === provider);

  const handlePlaylistChange = (playlistId: string) => {
    const playlist = FOCUS_PLAYLISTS.find(p => p.id === playlistId);
    setSelectedPlaylist(playlist || null);
  };

  if (provider === 'none') {
    return (
      <LiquidGlassCard className="p-6">
          <div className="text-center">
            <Music className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2 text-white">Enable Focus Music</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Listen to curated playlists while you work
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => onProviderChange('spotify')}
                className="bg-green-600 hover:bg-green-700"
              >
                <Music className="h-4 w-4 mr-2" />
                Spotify
              </Button>
              <Button
                onClick={() => onProviderChange('youtube')}
                className="bg-red-600 hover:bg-red-700"
              >
                <Music className="h-4 w-4 mr-2" />
                YouTube
              </Button>
            </div>
          </div>
      </LiquidGlassCard>
    );
  }

  return (
    <LiquidGlassCard className="p-6 space-y-4">
        {/* Provider Switch */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5 text-primary" />
            <span className="font-semibold text-white">Focus Music</span>
          </div>
          <Badge variant={provider === 'spotify' ? 'default' : 'destructive'}>
            {provider === 'spotify' ? 'Spotify' : 'YouTube'}
          </Badge>
        </div>

        {/* Playlist Selection */}
        <div>
          <label className="text-sm font-medium mb-2 block text-muted-foreground">Select Playlist</label>
          <Select onValueChange={handlePlaylistChange} value={selectedPlaylist?.id}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a focus playlist" />
            </SelectTrigger>
            <SelectContent>
              {availablePlaylists.map((playlist) => (
                <SelectItem key={playlist.id} value={playlist.id}>
                  <div>
                    <div className="font-medium">{playlist.name}</div>
                    <div className="text-xs text-muted-foreground">{playlist.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Spotify Embed */}
        {provider === 'spotify' && selectedPlaylist && (
          <div className="rounded-lg overflow-hidden">
            <iframe
              style={{ borderRadius: '12px' }}
              src={`https://open.spotify.com/embed/playlist/${selectedPlaylist.embedId}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        )}

        {/* YouTube Hidden Player */}
        {provider === 'youtube' && selectedPlaylist && (
          <div>
            <div id="youtube-player" style={{ display: 'none' }} />
            <div className="bg-gradient-to-r from-red-500/80 to-red-600/80 text-white rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Music className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{selectedPlaylist.name}</div>
                  <div className="text-sm text-white/80">{selectedPlaylist.description}</div>
                </div>
                <div className="flex items-center gap-2">
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Volume Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-white">Volume</label>
            <span className="text-sm text-muted-foreground">{Math.round(volume)}%</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? (
                <VolumeX className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Volume2 className="h-5 w-5 text-primary" />
              )}
            </button>
            <Slider
              value={[isMuted ? 0 : volume]}
              onValueChange={(val) => {
                onVolumeChange(val[0]);
                setIsMuted(false);
              }}
              min={0}
              max={100}
              step={5}
              className="flex-1"
            />
          </div>
        </div>

        {/* Provider Switch */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onProviderChange('none')}
          className="w-full"
        >
          Disable Music
        </Button>
    </LiquidGlassCard>
  );
}
