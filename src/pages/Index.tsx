import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Play, Pause, Camera, Gamepad2, Users, BookOpen } from 'lucide-react';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  content: {
    type: 'image' | 'video' | 'emoji-story' | 'reel';
    data: string;
    caption?: string;
    thumbnail?: string;
  };
  reactions: {
    hearts: number;
    laughs: number;
    wows: number;
  };
  comments: number;
  timestamp: string;
}

const samplePosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Sarah M.',
      avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      isVerified: true
    },
    content: {
      type: 'emoji-story',
      data: '🌅➡️🏠➡️👨‍👩‍👧‍👦➡️💚➡️😊',
      caption: 'Morning routine with my beautiful family! Communication through love needs no words 💚'
    },
    reactions: {
      hearts: 89,
      laughs: 12,
      wows: 34
    },
    comments: 23,
    timestamp: '2h ago'
  },
  {
    id: '2',
    author: {
      name: 'Alex Visual',
      avatar: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    content: {
      type: 'reel',
      data: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      caption: '🎨 Creating art that speaks louder than words! Watch my latest piece come to life ✨'
    },
    reactions: {
      hearts: 156,
      laughs: 8,
      wows: 67
    },
    comments: 45,
    timestamp: '4h ago'
  },
  {
    id: '3',
    author: {
      name: 'Maya Stories',
      avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    content: {
      type: 'image',
      data: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      caption: '🏆 Just won the regional sign language poetry competition! Dreams do come true when you express from the heart 💚'
    },
    reactions: {
      hearts: 234,
      laughs: 15,
      wows: 89
    },
    comments: 67,
    timestamp: '6h ago'
  },
  {
    id: '4',
    author: {
      name: 'Community Helper',
      avatar: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    content: {
      type: 'emoji-story',
      data: '👋➡️🤝➡️👥➡️🌟➡️🌍',
      caption: 'From hello to friendship to community to stars to changing the world! Every connection matters 🌟'
    },
    reactions: {
      hearts: 178,
      laughs: 34,
      wows: 92
    },
    comments: 56,
    timestamp: '8h ago'
  }
];

const Index = () => {
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [playingReel, setPlayingReel] = useState<string | null>(null);

  const handleReaction = (postId: string, reactionType: 'hearts' | 'laughs' | 'wows') => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? {
            ...post,
            reactions: {
              ...post.reactions,
              [reactionType]: post.reactions[reactionType] + 1
            }
          }
        : post
    ));
  };

  const toggleReel = (postId: string) => {
    setPlayingReel(playingReel === postId ? null : postId);
  };

  const handleNavigation = (path: string) => {
    console.log(`Navigate to: ${path}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto p-4 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400 bg-clip-text text-transparent leading-tight " style={{ fontFamily: 'Bitcount Grid Double, "Courier New", Courier, monospace' }}>
            Your Story. Your Space. Beyond Words.
          </h1>
        </div>

        {/* Community Feed */}
        <div className="space-y-6">
          
          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 overflow-hidden">
                {/* Post Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/20"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">{post.author.name}</h3>
                        {post.author.isVerified && (
                          <span className="text-emerald-400">✓</span>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm">{post.timestamp}</p>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="px-6 pb-4">
                  {post.content.type === 'image' ? (
                    <img
                      src={post.content.data}
                      alt="Post content"
                      className="w-full h-64 object-cover rounded-xl mb-4 border border-slate-800/50"
                    />
                  ) : post.content.type === 'reel' ? (
                    <div className="relative w-full h-64 rounded-xl mb-4 overflow-hidden border border-slate-800/50">
                      <img
                        src={post.content.thumbnail}
                        alt="Reel thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <button
                          onClick={() => toggleReel(post.id)}
                          className="rounded-full bg-emerald-500/80 hover:bg-emerald-500 w-16 h-16 flex items-center justify-center text-white transition-colors"
                        >
                          {playingReel === post.id ? (
                            <Pause className="h-6 w-6" />
                          ) : (
                            <Play className="h-6 w-6 ml-1" />
                          )}
                        </button>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-black/50 rounded-full p-2">
                          <Camera className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                  ) : post.content.type === 'emoji-story' ? (
                    <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl p-6 mb-4 border border-emerald-500/20">
                      <div className="text-4xl text-center mb-4 leading-relaxed">{post.content.data}</div>
                    </div>
                  ) : null}
                  
                  {post.content.caption && (
                    <p className="text-white leading-relaxed">{post.content.caption}</p>
                  )}
                </div>

                {/* Reactions Bar */}
                <div className="px-6 py-4 border-t border-slate-800/50 bg-slate-900/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => handleReaction(post.id, 'hearts')}
                        className="flex items-center space-x-2 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Heart size={20} />
                        <span className="font-medium">{post.reactions.hearts}</span>
                      </button>
                      <button
                        onClick={() => handleReaction(post.id, 'laughs')}
                        className="flex items-center space-x-2 text-slate-400 hover:text-yellow-500 transition-colors"
                      >
                        <span className="text-lg">😂</span>
                        <span className="font-medium">{post.reactions.laughs}</span>
                      </button>
                      <button
                        onClick={() => handleReaction(post.id, 'wows')}
                        className="flex items-center space-x-2 text-slate-400 hover:text-purple-500 transition-colors"
                      >
                        <span className="text-lg">🤩</span>
                        <span className="font-medium">{post.reactions.wows}</span>
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-2 text-slate-400 hover:text-emerald-400 transition-colors">
                        <MessageCircle size={20} />
                        <span className="font-medium">{post.comments}</span>
                      </button>
                      <button className="text-slate-400 hover:text-green-500 transition-colors">
                        <Share2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>          
        </div>
      </div>
    </div>
  );
};

export default Index;