import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Camera, Lock, Globe, Heart, MessageCircle, Share, Bookmark, MoreHorizontal, Sparkles
} from 'lucide-react';

const Journal = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Grateful Moments',
      content: "Feeling grateful today! 🌟 Learning new signs and connecting with amazing people in the community.",
      mood: "grateful",
      isPrivate: false,
      likes: 12,
      comments: 3,
      time: "2h ago",
      image: null
    },
    {
      id: 2,
      title: 'Inspiration!',
      content: "Had an amazing day at the deaf community center. Met so many inspiring people! 💪✨",
      mood: "inspired",
      isPrivate: true,
      likes: 8,
      comments: 1,
      time: "5h ago",
      image: null
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [title, setTitle] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handlePost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        title,
        content: newPost,
        mood: "happy",
        isPrivate,
        likes: 0,
        comments: 0,
        time: "Just now",
        image: null
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setTitle('');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      
      {/* Mood Tracker */}
      <div className="flex gap-4 overflow-x-auto px-1">
        {['Happy', 'Grateful', 'Excited', 'Peaceful', 'Inspired'].map((mood) => (
          <div key={mood} className="flex-shrink-0 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-1">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xs text-muted-foreground">{mood}</span>
          </div>
        ))}
      </div>

      {/* Create New Post */}
      <Card>
        <CardContent className="p-5 space-y-3">
          <h2 className="text-lg font-semibold">New Journal Entry</h2>
          <Input
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-sm"
          />
          <Textarea
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            rows={4}
            className="resize-none text-sm"
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Camera className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsPrivate(!isPrivate)}>
                {isPrivate ? <Lock className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
              </Button>
            </div>
            <Button onClick={handlePost} disabled={!newPost.trim()} size="sm">
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Journal Entries */}
      <div className="space-y-5">
        {posts.map((post) => (
          <Card key={post.id} className="border shadow-sm">
            <CardContent className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary-foreground">You</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{post.title || 'Untitled Entry'}</h3>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                  </div>
                  {post.isPrivate && <Lock className="h-3 w-3 text-muted-foreground ml-2" />}
                </div>
                <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
              </div>

              {/* Content */}
              <p className="text-sm leading-relaxed mb-2">{post.content}</p>
              <Badge variant="secondary" className="text-xs">#{post.mood}</Badge>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                <div className="flex gap-4 text-muted-foreground text-xs">
                  <button className="flex items-center gap-1 hover:text-foreground">
                    <Heart className="h-4 w-4" /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1 hover:text-foreground">
                    <MessageCircle className="h-4 w-4" /> {post.comments}
                  </button>
                  <Share className="h-4 w-4 hover:text-foreground" />
                </div>
                <Bookmark className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Journal;
