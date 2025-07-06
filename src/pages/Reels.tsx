import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark, 
  Play,
  Pause,
  Volume2,
  VolumeX,
  MoreHorizontal,
  Camera,
  Plus
} from 'lucide-react';

const Reels = () => {
  const [activeReel, setActiveReel] = useState(0);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRefs = useRef([]);

  const reels = [
    {
      id: 1,
      user: "SignMaster",
      avatar: "S",
      title: "Daily Sign: 'Beautiful' ✨",
      description: "Learn this elegant sign for 'beautiful' - notice the smooth movement from the face outward 🌟",
      videoUrl: "/vids/comm2.mp4",
      likes: 234,
      comments: 45,
      shares: 12,
      duration: "0:15",
      tags: ["ASL", "tutorial", "signs", "daily"]
    },
    {
      id: 2,
      user: "DeafArtCollective",
      avatar: "D",
      title: "Visual Poetry in Motion 🎨",
      description: "Watch as this story unfolds through hand movements and expressions - no words needed! ✋💫",
      videoUrl: "/vids/community-meetup.mp4",
      likes: 456,
      comments: 78,
      shares: 23,
      duration: "0:30",
      tags: ["art", "poetry", "visual", "creative"]
    },
    {
      id: 3,
      user: "CommunitySpotlight",
      avatar: "C",
      title: "Community Meetup Highlights 👥",
      description: "Amazing moments from last week's gathering! So much joy and connection 🤗",
      videoUrl: "/vids/comm2.mp4",
      likes: 123,
      comments: 34,
      shares: 8,
      duration: "0:45",
      tags: ["community", "meetup", "highlights", "joy"]
    }
  ];

  // Handle video play/pause
  useEffect(() => {
    const currentVideo = videoRefs.current[activeReel];
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.play();
      } else {
        currentVideo.pause();
      }
    }
  }, [isPlaying, activeReel]);

  // Handle mute/unmute
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = muted;
      }
    });
  }, [muted]);

  // Auto-play when reel changes
  useEffect(() => {
    // Pause all videos
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    
    // Play current video
    const currentVideo = videoRefs.current[activeReel];
    if (currentVideo) {
      setIsPlaying(true);
      currentVideo.play();
    }
  }, [activeReel]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const isVideoFile = (url) => {
    return url.includes('.mp4') || url.includes('.webm') || url.includes('.mov') || url.includes('sample-videos');
  };

  return (
    <div className="max-w-md mx-auto relative h-screen">
      {/* Reels container */}
      <div className="relative h-full">
        {reels.map((reel, index) => (
          <div 
            key={reel.id}
            className={`absolute inset-0 transition-transform duration-300 ${
              index === activeReel ? 'translate-y-0' : 
              index < activeReel ? '-translate-y-full' : 'translate-y-full'
            }`}
          >
            <Card className="h-full rounded-none border-0 bg-black relative overflow-hidden">
              {/* Video/Image background */}
              {isVideoFile(reel.videoUrl) ? (
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className="absolute inset-0 w-full h-full object-cover"
                  src={reel.videoUrl}
                  loop
                  muted={muted}
                  playsInline
                  preload="metadata"
                  onError={(e) => {
                    console.log('Video failed to load:', e);
                    // Fallback to placeholder
                    const target = e.target as HTMLVideoElement;
                    target.style.display = 'none';
                  }}
                />
              ) : (
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${reel.videoUrl})` }}
                >
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              )}

              {/* Play/Pause button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button 
                  variant="ghost" 
                  size="lg"
                  className="w-16 h-16 rounded-full bg-black/30 text-white hover:bg-black/50 border border-white/20"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                </Button>
              </div>

              {/* Duration badge */}
              <Badge className="absolute top-4 left-4 bg-black/50 text-white border-0">
                {reel.duration}
              </Badge>

              {/* Mute button */}
              <Button 
                variant="ghost" 
                size="sm"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={() => setMuted(!muted)}
              >
                {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>

              {/* Content overlay */}
              <div className="absolute inset-0 flex">
                {/* Main content area */}
                <div className="flex-1 flex flex-col justify-end p-4 pb-20">
                  {/* User info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border-2 border-white">
                      <span className="text-sm font-semibold text-white">{reel.avatar}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{reel.user}</div>
                      <Button variant="ghost" size="sm" className="text-white text-xs p-0 h-auto hover:bg-transparent">
                        Follow
                      </Button>
                    </div>
                  </div>

                  {/* Reel info */}
                  <div className="text-white space-y-2">
                    <h3 className="font-semibold text-lg leading-tight">{reel.title}</h3>
                    <p className="text-sm opacity-90 leading-relaxed">{reel.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {reel.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-white/20 px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col items-center justify-end pb-20 pr-4 space-y-6">
                  <div className="text-center">
                    <Button variant="ghost" size="lg" className="w-12 h-12 rounded-full text-white hover:bg-white/20 p-0">
                      <Heart className="h-6 w-6" />
                    </Button>
                    <span className="text-white text-xs block mt-1">{reel.likes}</span>
                  </div>

                  <div className="text-center">
                    <Button variant="ghost" size="lg" className="w-12 h-12 rounded-full text-white hover:bg-white/20 p-0">
                      <MessageCircle className="h-6 w-6" />
                    </Button>
                    <span className="text-white text-xs block mt-1">{reel.comments}</span>
                  </div>

                  <div className="text-center">
                    <Button variant="ghost" size="lg" className="w-12 h-12 rounded-full text-white hover:bg-white/20 p-0">
                      <Share className="h-6 w-6" />
                    </Button>
                    <span className="text-white text-xs block mt-1">{reel.shares}</span>
                  </div>

                  <Button variant="ghost" size="lg" className="w-12 h-12 rounded-full text-white hover:bg-white/20 p-0">
                    <Bookmark className="h-6 w-6" />
                  </Button>

                  <Button variant="ghost" size="lg" className="w-12 h-12 rounded-full text-white hover:bg-white/20 p-0">
                    <MoreHorizontal className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 space-y-2">
        {reels.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveReel(index)}
            className={`w-2 h-8 rounded-full transition-all ${
              index === activeReel ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Create reel button */}
      <div className="absolute bottom-20 right-4">
        <Button 
          size="lg" 
          className="w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-primary to-accent"
        >
          <Camera className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Reels;