import { useState } from 'react';
import CommentSection from './CommentSection.jsx';

export default function PostCard({ post, user, onAddComment }) {
  const [likes] = useState(Math.floor(Math.random() * 180) + 45);

  return (
    <article className="post-card card">
      <div className="post-meta">
        <img className="avatar" src={post.avatar} alt={`${post.user} avatar`} />
        <div>
          <strong>{post.user}</strong>
          <span>{post.time}</span>
        </div>
      </div>

      <p className="post-text">{post.caption}</p>

      <div className="tag-list">
        {post.tags.map((tag) => (
          <span key={tag} className="tag">#{tag}</span>
        ))}
      </div>

      <div className="post-media">
        {post.videoUrl ? (
          <video controls muted loop playsInline poster="https://images.unsplash.com/photo-1516728778615-2d590ea1856f?auto=format&fit=crop&w=800&q=60">
            <source src={post.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=60" alt="Beauty inspiration" />
        )}
      </div>

      <div className="status-chip">{likes} likes</div>

      <CommentSection comments={post.comments} user={user} postId={post.id} onAddComment={onAddComment} />
    </article>
  );
}
