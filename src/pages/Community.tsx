import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Plus, Send } from 'lucide-react';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: {
    text: string;
  };
  reactions: {
    hearts: number;
    laughs: number;
    wows: number;
  };
  comments: Comment[];
  timestamp: string;
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  reactions: {
    hearts: number;
  };
  timestamp: string;
}

const samplePosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Chen',
      avatar: 'SC'
    },
    content: {
      text: 'Just wanted to share how grateful I am for this community! 🌟 Today I had my first successful conversation using sign language at a coffee shop. The barista knew some basic signs and we had such a wonderful interaction. It reminded me that communication comes in so many beautiful forms. What are some of your favorite communication moments?'
    },
    reactions: {
      hearts: 42,
      laughs: 8,
      wows: 15
    },
    comments: [
      {
        id: '1-1',
        author: {
          name: 'Mike Rodriguez',
          avatar: 'MR'
        },
        content: 'This is so heartwarming! I love hearing about positive interactions like this. It gives me hope for more inclusive spaces everywhere. 💙',
        reactions: { hearts: 12 },
        timestamp: '1h ago'
      },
      {
        id: '1-2',
        author: {
          name: 'Emma Thompson',
          avatar: 'ET'
        },
        content: 'I had a similar experience at the library last week! The librarian had learned some signs specifically to help deaf patrons. These small acts of inclusion mean the world to us.',
        reactions: { hearts: 8 },
        timestamp: '45m ago'
      }
    ],
    timestamp: '2h ago'
  },
  {
    id: '2',
    author: {
      name: 'Alex Rivera',
      avatar: 'AR'
    },
    content: {
      text: 'Been working on this art piece that represents the beauty of visual communication. Each color represents a different emotion or concept that we express through our hands and faces. Art has always been my way of sharing what words cannot capture. The process of creating something that speaks without sound is incredibly fulfilling. 🎨✨'
    },
    reactions: {
      hearts: 67,
      laughs: 23,
      wows: 31
    },
    comments: [
      {
        id: '2-1',
        author: {
          name: 'Jordan Kim',
          avatar: 'JK'
        },
        content: 'This sounds absolutely stunning! The way you describe capturing the fluidity of sign language in art is incredible. I would love to see your work sometime. Do you have any exhibitions coming up?',
        reactions: { hearts: 15 },
        timestamp: '3h ago'
      }
    ],
    timestamp: '4h ago'
  },
  {
    id: '3',
    author: {
      name: 'Taylor Johnson',
      avatar: 'TJ'
    },
    content: {
      text: 'Question for the community: What are your thoughts on the new accessibility features being added to social media platforms? I\'ve noticed more auto-captioning and sign language interpretation, but there\'s still so much room for improvement. What features would you most like to see implemented? Let\'s discuss! 🤔💭'
    },
    reactions: {
      hearts: 34,
      laughs: 12,
      wows: 28
    },
    comments: [
      {
        id: '3-1',
        author: {
          name: 'Casey Williams',
          avatar: 'CW'
        },
        content: 'I\'d love to see better real-time sign language translation in video calls. The current technology is getting better but still has a long way to go for complex conversations.',
        reactions: { hearts: 9 },
        timestamp: '5h ago'
      },
      {
        id: '3-2',
        author: {
          name: 'Morgan Davis',
          avatar: 'MD'
        },
        content: 'Visual indicators for sound cues in videos would be amazing! Like showing when music is playing or when there are background sounds that add context.',
        reactions: { hearts: 11 },
        timestamp: '4h ago'
      }
    ],
    timestamp: '6h ago'
  },
  {
    id: '4',
    author: {
      name: 'Riley Park',
      avatar: 'RP'
    },
    content: {
      text: 'Had an interesting conversation today about the difference between being deaf and being Deaf (with a capital D). For those who might not know, being deaf refers to the audiological condition, while being Deaf refers to cultural identity and community membership. It\'s fascinating how language and identity intersect in our community. What are your thoughts on this distinction?'
    },
    reactions: {
      hearts: 89,
      laughs: 5,
      wows: 42
    },
    comments: [
      {
        id: '4-1',
        author: {
          name: 'Sam Wilson',
          avatar: 'SW'
        },
        content: 'Thank you for bringing this up! This distinction is so important and often misunderstood. I identify as culturally Deaf and it\'s been such a journey discovering my place in the community.',
        reactions: { hearts: 18 },
        timestamp: '2h ago'
      }
    ],
    timestamp: '3h ago'
  }
];

export const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostText, setNewPostText] = useState('');
  const [showComments, setShowComments] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');

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

  const handleCommentReaction = (postId: string, commentId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId
                ? {
                    ...comment,
                    reactions: {
                      ...comment.reactions,
                      hearts: comment.reactions.hearts + 1
                    }
                  }
                : comment
            )
          }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (newPostText.trim()) {
      const newPost: Post = {
        id: Date.now().toString(),
        author: {
          name: 'You',
          avatar: 'YU'
        },
        content: {
          text: newPostText
        },
        reactions: {
          hearts: 0,
          laughs: 0,
          wows: 0
        },
        comments: [],
        timestamp: 'Just now'
      };
      setPosts([newPost, ...posts]);
      setNewPostText('');
      setShowCreatePost(false);
    }
  };

  const handleAddComment = (postId: string) => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: `${postId}-${Date.now()}`,
        author: {
          name: 'You',
          avatar: 'YU'
        },
        content: newComment,
        reactions: { hearts: 0 },
        timestamp: 'Just now'
      };

      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, comments: [...post.comments, comment] }
          : post
      ));
      setNewComment('');
    }
  };

  const CreatePostModal = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-green-500/30 rounded-2xl max-w-2xl w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-green-400">✍️ Create New Post</h3>
          <button
            onClick={() => setShowCreatePost(false)}
            className="text-gray-400 hover:text-green-400 text-2xl transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <textarea
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            placeholder="What's on your mind? Share your thoughts, experiences, or questions with the community..."
            className="w-full h-32 p-4 bg-black border border-green-500/30 rounded-xl resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white placeholder-gray-400"
          />
          
          <div className="flex space-x-3">
            <button
              onClick={handleCreatePost}
              disabled={!newPostText.trim()}
              className="flex-1 bg-green-600 text-black py-3 rounded-xl font-semibold hover:bg-green-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Send className="mr-2" size={20} />
              📝 Post
            </button>
            <button
              onClick={() => setShowCreatePost(false)}
              className="bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            👥 <span className="text-green-400">Community</span>
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Share your thoughts, experiences, and connect with others
          </p>
          
          {/* Create Post Button */}
          <button
            onClick={() => setShowCreatePost(true)}
            className="bg-green-600 text-black px-8 py-3 rounded-xl font-semibold hover:bg-green-500 transition-colors flex items-center mx-auto"
          >
            <Plus className="mr-2" size={20} />
            ✨ Create Post
          </button>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-900 border border-green-500/20 rounded-2xl shadow-xl overflow-hidden">
              {/* Post Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-black font-bold text-lg">
                    {post.author.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-400">{post.author.name}</h3>
                    <p className="text-gray-400 text-sm">{post.timestamp}</p>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-6 pb-4">
                <p className="text-white text-lg leading-relaxed">
                  {post.content.text}
                </p>
              </div>

              {/* Reactions Bar */}
              <div className="px-6 py-4 border-t border-green-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => handleReaction(post.id, 'hearts')}
                      className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors"
                    >
                      <Heart size={20} />
                      <span>{post.reactions.hearts}</span>
                    </button>
                    <button
                      onClick={() => handleReaction(post.id, 'laughs')}
                      className="flex items-center space-x-2 text-gray-400 hover:text-yellow-400 transition-colors"
                    >
                      <span className="text-lg">😂</span>
                      <span>{post.reactions.laughs}</span>
                    </button>
                    <button
                      onClick={() => handleReaction(post.id, 'wows')}
                      className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <span className="text-lg">🤩</span>
                      <span>{post.reactions.wows}</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                      className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors"
                    >
                      <MessageCircle size={20} />
                      <span>{post.comments.length}</span>
                    </button>
                    <button className="text-gray-400 hover:text-green-400 transition-colors">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              {showComments === post.id && (
                <div className="px-6 pb-6 border-t border-green-500/20">
                  <div className="space-y-4 mt-4">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                          {comment.author.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-800 border border-green-500/20 rounded-xl p-3">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-sm text-green-400">
                                {comment.author.name}
                              </span>
                              <span className="text-xs text-gray-400">{comment.timestamp}</span>
                            </div>
                            <p className="text-white">{comment.content}</p>
                          </div>
                          <button
                            onClick={() => handleCommentReaction(post.id, comment.id)}
                            className="flex items-center space-x-1 mt-1 text-gray-400 hover:text-green-400 transition-colors text-sm"
                          >
                            <Heart size={14} />
                            <span>{comment.reactions.hearts}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add Comment */}
                  <div className="flex space-x-3 mt-4">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                      YU
                    </div>
                    <div className="flex-1 flex space-x-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 px-4 py-2 bg-black border border-green-500/30 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white placeholder-gray-400"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        disabled={!newComment.trim()}
                        className="bg-green-600 text-black px-4 py-2 rounded-xl hover:bg-green-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showCreatePost && <CreatePostModal />}
    </div>
  );
};
export default Community;
