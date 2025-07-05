import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark, 
  MoreHorizontal,
  Plus,
  TrendingUp,
  Hash,
  Users
} from 'lucide-react';

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Sarah_Signs",
      avatar: "S",
      content: "Just learned the sign for 'butterfly' today! 🦋 It's so beautiful and expressive. Love how ASL captures the essence of things.",
      image: null,
      likes: 47,
      comments: 12,
      shares: 3,
      time: "2h ago",
      tags: ["ASL", "learning", "signs"]
    },
    {
      id: 2,
      user: "DeafArtist",
      avatar: "D",
      content: "Check out this visual poetry I created! Each emoji tells part of the story... 🌙✨🌊💫🦋",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      likes: 89,
      comments: 23,
      shares: 8,
      time: "4h ago",
      tags: ["art", "poetry", "visual", "creative"]
    },
    {
      id: 3,
      user: "CommunityHelper",
      avatar: "C",
      content: "Weekly meetup this Saturday at the community center! 🏢 We'll practice fingerspelling and play visual games. All skill levels welcome! 👥",
      image: null,
      likes: 156,
      comments: 34,
      shares: 67,
      time: "6h ago",
      tags: ["meetup", "community", "fingerspelling", "games"]
    }
  ]);

  const trendingTags = ["#ASL", "#DeafCulture", "#VisualArt", "#SignLanguage", "#Community", "#Learning"];

  return (
    <div className="max-w-md mx-auto">
      {/* Stories/Status bar */}
      <div className="flex gap-4 p-4 overflow-x-auto">
        <div className="flex-shrink-0 text-center">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center mb-2">
            <Plus className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xs text-muted-foreground">Your story</span>
        </div>
        
        {['Alex', 'Maria', 'Jordan', 'Casey', 'River'].map((name) => (
          <div key={name} className="flex-shrink-0 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-accent to-secondary p-0.5 mb-2">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                <span className="text-sm font-semibold">{name[0]}</span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{name}</span>
          </div>
        ))}
      </div>

      {/* Trending section */}
      <Card className="mx-4 mb-4 border-0 bg-card/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm">Trending</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs hover:bg-primary/10 cursor-pointer">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Posts feed */}
      <div className="space-y-1">
        {posts.map((post) => (
          <Card key={post.id} className="border-0 shadow-sm">
            <CardContent className="p-0">
              {/* Post header */}
              <div className="flex items-center justify-between p-4 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary-foreground">{post.avatar}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-sm">{post.user}</span>
                    <div className="text-xs text-muted-foreground">{post.time}</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="p-2">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              {/* Post content */}
              <div className="px-4 pb-3">
                <p className="text-sm leading-relaxed mb-3">{post.content}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags?.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Post image */}
              {post.image && (
                <div className="px-4 pb-3">
                  <img 
                    src={post.image} 
                    alt="Post content" 
                    className="w-full rounded-lg object-cover max-h-64"
                  />
                </div>
              )}

              {/* Post stats */}
              <div className="px-4 pb-2">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{post.likes} likes</span>
                  <span>{post.comments} comments</span>
                  {post.shares > 0 && <span>{post.shares} shares</span>}
                </div>
              </div>

              {/* Post actions */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-border/50">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle className="h-5 w-5" />
                  </button>
                  <button className="text-muted-foreground hover:text-primary transition-colors">
                    <Share className="h-5 w-5" />
                  </button>
                </div>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Bookmark className="h-5 w-5" />
                </button>
              </div>

              {/* Add comment */}
              <div className="px-4 pb-4 pt-2">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                    <span className="text-xs font-semibold text-primary-foreground">You</span>
                  </div>
                  <Input 
                    placeholder="Add a comment..." 
                    className="flex-1 border-0 bg-muted/30 text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create post button */}
      <div className="fixed bottom-20 right-4">
        <Button 
          size="lg" 
          className="w-14 h-14 rounded-full shadow-lg"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Community;