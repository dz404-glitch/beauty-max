import { useEffect, useState } from 'react';
import PostCard from './PostCard.jsx';
import NewPostForm from './NewPostForm.jsx';
import { fetchPosts, addComment } from '../api.js';

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const items = await fetchPosts();
      setPosts(items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handlePostCreated = (post) => {
    setPosts((current) => [post, ...current]);
  };

  const handleComment = async (postId, text) => {
    try {
      await addComment(postId, text);
    } catch (error) {
      console.error('Failed to post comment', error);
    }
  };

  return (
    <div className="feed-grid">
      <section className="card">
        <h2 className="section-title">Trending Cute Looks</h2>
        <p>Scroll through fresh beauty posts, short style videos, and dreamy makeup ideas from our cutemaxxing community.</p>
      </section>

      <aside className="aside-panel">
        <div className="panel">
          <h2>Top vibes today</h2>
          <p>Soft glam, subtle shimmer, pastel energy, and efficient routines that keep your glow game strong.</p>
        </div>
        <div className="panel">
          <h3>Care tip</h3>
          <p>Mirrors are for details, not self-judgment. Build habits that make your skin feel happy and calm.</p>
        </div>
      </aside>

      {user ? (
        <NewPostForm onCreated={handlePostCreated} />
      ) : (
        <div className="card">
          <h3 className="section-title">Sign in to create posts</h3>
          <p>Log in to upload your own beauty videos, save inspiration, and join the community.</p>
        </div>
      )}

      <div className="card">
        {loading ? (
          <p>Loading posts...</p>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} user={user} onAddComment={handleComment} />
          ))
        )}
      </div>
    </div>
  );
}
