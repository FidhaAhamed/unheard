import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Plus, Image, Video } from 'lucide-react';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: {
    type: 'image' | 'video' | 'emoji-story';
    data: string;
    caption?: string;
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
      name: 'Visual Artist',
      avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    content: {
      type: 'image',
      data: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      caption: '🌅✨ Morning inspiration: Every sunrise brings new possibilities for connection'
    },
    reactions: {
      hearts: 42,
      laughs: 8,
      wows: 15
    },
    comments: 12,
    timestamp: '2h ago'
  },
  {
    id: '2',
    author: {
      name: 'Community Helper',
      avatar: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    content: {
      type: 'emoji-story',
      data: '🌟➡️🎭➡️👥➡️💫➡️🌈',
      caption: 'My journey: From feeling different to embracing my unique way of communicating!'
    },
    reactions: {
      hearts: 67,
      laughs: 23,
      wows: 31
    },
    comments: 18,
    timestamp: '4h ago'
  },
  {
    id: '3',
    author: {
      name: 'Game Champion',
      avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    content: {
      type: 'image',
      data: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      caption: '🏆🎮 Just completed the Escape Room challenge! The visual puzzles were amazing!'
    },
    reactions: {
      hearts: 34,
      laughs: 12,
      wows: 28
    },
    comments: 9,
    timestamp: '6h ago'
  }
];

export const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [showCreatePost, setShowCreatePost] = useState(false);

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

  const CreatePostModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Create New Post</h3>
          <button
            onClick={() => setShowCreatePost(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center">
            <Image className="mr-2" size={20} />
            📸 Share Photo
          </button>
          <button className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center">
            <Video className="mr-2" size={20} />
            📹 Share Video
          </button>
          <button className="w-full bg-purple-500 text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transition-colors flex items-center justify-center">
            😊 Create Emoji Story
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            👥 <span className="text-blue-600">Community</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Share your visual stories and connect with others
          </p>
          
          {/* Create Post Button */}
          <button
            onClick={() => setShowCreatePost(true)}
            className="bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center mx-auto"
          >
            <Plus className="mr-2" size={20} />
            ✨ Create Post
          </button>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Post Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{post.author.name}</h3>
                    <p className="text-gray-500 text-sm">{post.timestamp}</p>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-6 pb-4">
                {post.content.type === 'image' ? (
                  <img
                    src={post.content.data}
                    alt="Post content"
                    className="w-full h-64 object-cover rounded-xl mb-4"
                  />
                ) : post.content.type === 'emoji-story' ? (
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-4">
                    <div className="text-4xl text-center mb-4">{post.content.data}</div>
                  </div>
                ) : null}
                
                {post.content.caption && (
                  <p className="text-gray-700">{post.content.caption}</p>
                )}
              </div>

              {/* Reactions Bar */}
              <div className="px-6 py-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => handleReaction(post.id, 'hearts')}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Heart size={20} />
                      <span>{post.reactions.hearts}</span>
                    </button>
                    <button
                      onClick={() => handleReaction(post.id, 'laughs')}
                      className="flex items-center space-x-2 text-gray-600 hover:text-yellow-500 transition-colors"
                    >
                      <span className="text-lg">😂</span>
                      <span>{post.reactions.laughs}</span>
                    </button>
                    <button
                      onClick={() => handleReaction(post.id, 'wows')}
                      className="flex items-center space-x-2 text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      <span className="text-lg">🤩</span>
                      <span>{post.reactions.wows}</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                      <MessageCircle size={20} />
                      <span>{post.comments}</span>
                    </button>
                    <button className="text-gray-600 hover:text-green-500 transition-colors">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community Guidelines */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">🌟 Community Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl mb-2">🤝</div>
              <p className="font-semibold">Be Kind & Respectful</p>
            </div>
            <div>
              <div className="text-3xl mb-2">👁️</div>
              <p className="font-semibold">Visual Communication First</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🎨</div>
              <p className="font-semibold">Express Yourself Creatively</p>
            </div>
          </div>
        </div>
      </div>

      {showCreatePost && <CreatePostModal />}
    </div>
  );
};
export default Community;