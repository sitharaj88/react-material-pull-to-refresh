import { useState } from 'react'
import PullToRefresh from './index.jsx'
import './App.css'

function App() {
  const [refreshCount, setRefreshCount] = useState(0);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: 'Just finished an amazing hike in the mountains! The view was absolutely breathtaking. Nature never ceases to amaze me. 🏔️✨',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
      likes: 42,
      time: '2h ago'
    },
    {
      id: 2,
      author: 'Marcus Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: 'Coffee and code - the perfect combination for a productive morning! ☕💻 Working on some exciting new features today.',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=300&fit=crop',
      likes: 28,
      time: '4h ago'
    },
    {
      id: 3,
      author: 'Emma Thompson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      content: 'Sunset photography session was incredible! The colors were absolutely magical. 📸🌅',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
      likes: 67,
      time: '6h ago'
    },
    {
      id: 4,
      author: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: 'Just launched my new portfolio website! Check it out and let me know what you think. 🚀',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
      likes: 89,
      time: '8h ago'
    },
    {
      id: 5,
      author: 'Lisa Wang',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      content: 'Book recommendation: "The Midnight Library" by Matt Haig. Such a thought-provoking read about life choices and alternate realities. 📚',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=300&fit=crop',
      likes: 34,
      time: '12h ago'
    }
  ]);

  const handleRefresh = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Add a new post at the top
    const newPost = {
      id: Date.now(),
      author: 'Fresh Update',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      content: `New content loaded! This is refresh #${refreshCount + 1}. Pull down again to see more updates. 🔄`,
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&h=300&fit=crop',
      likes: Math.floor(Math.random() * 50) + 10,
      time: 'now'
    };

    setPosts(prev => [newPost, ...prev]);
    setRefreshCount(prev => prev + 1);
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">Social Feed</h1>
            <div className="refresh-indicator">
              <span className="refresh-count">Refreshes: {refreshCount}</span>
            </div>
          </div>
          <div className="pull-hint">
            <span>👆 Pull down to refresh</span>
          </div>
        </header>

        <main className="feed">
          {posts.map((post) => (
            <article key={post.id} className="post-card">
              <div className="post-header">
                <img src={post.avatar} alt={post.author} className="avatar" />
                <div className="post-meta">
                  <h3 className="author-name">{post.author}</h3>
                  <span className="post-time">{post.time}</span>
                </div>
              </div>

              <div className="post-content">
                <p className="post-text">{post.content}</p>
                {post.image && (
                  <img src={post.image} alt="Post content" className="post-image" />
                )}
              </div>

              <div className="post-actions">
                <button className="action-btn">
                  ❤️ {post.likes}
                </button>
                <button className="action-btn">
                  💬 Reply
                </button>
                <button className="action-btn">
                  ↗️ Share
                </button>
              </div>
            </article>
          ))}
        </main>

        <footer className="app-footer">
          <p>End of feed • Pull to refresh for new content</p>
        </footer>
      </div>
    </PullToRefresh>
  )
}

export default App
