import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark, 
  MoreHorizontal,
  Camera,
  Sparkles,
  Lock,
  Globe
} from 'lucide-react';

const Journal = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
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
  const [isPrivate, setIsPrivate] = useState(false);

  const handlePost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        content: newPost,
        mood: "happy",
        isPrivate,
        likes: 0,
        comments: 0,
        time: "now",
        image: null
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      {/* Stories-like mood tracker */}
      <div className="flex gap-4 p-4 overflow-x-auto">
        {['Happy', 'Grateful', 'Excited', 'Peaceful', 'Inspired'].map((mood) => (
          <div key={mood} className="flex-shrink-0 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-2">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xs text-muted-foreground">{mood}</span>
          </div>
        ))}
      </div>

      {/* Create new post - Instagram-like */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-sm font-semibold text-primary-foreground">You</span>
            </div>
            <Textarea
              placeholder="What's on your mind? Share your thoughts..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="flex-1 border-0 resize-none bg-transparent text-sm"
              rows={3}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="p-2">
                <Camera className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2"
                onClick={() => setIsPrivate(!isPrivate)}
              >
                {isPrivate ? <Lock className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
              </Button>
            </div>
            
            <Button 
              onClick={handlePost}
              disabled={!newPost.trim()}
              size="sm"
              className="px-6"
            >
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts feed - Instagram-like */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="border-0 shadow-sm">
            <CardContent className="p-0">
              {/* Post header */}
              <div className="flex items-center justify-between p-4 pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary-foreground">You</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">Your Journal</span>
                      {post.isPrivate && <Lock className="h-3 w-3 text-muted-foreground" />}
                    </div>
                    <span className="text-xs text-muted-foreground">{post.time}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="p-2">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              {/* Post content */}
              <div className="px-4 pb-3">
                <p className="text-sm leading-relaxed">{post.content}</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  #{post.mood}
                </Badge>
              </div>

              {/* Post actions */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-border/50">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs">{post.comments}</span>
                  </button>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <Share className="h-4 w-4" />
                  </button>
                </div>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI prompt suggestions */}
      <Card className="border-dashed border-primary/30">
        <CardContent className="p-4 text-center">
          <Sparkles className="h-6 w-6 text-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground mb-3">
            Need inspiration? Try these AI-generated prompts:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["What made you smile today?", "Describe a challenge you overcame", "Share a moment of gratitude"].map((prompt) => (
              <Button 
                key={prompt} 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => setNewPost(prompt)}
              >
                {prompt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Journal;