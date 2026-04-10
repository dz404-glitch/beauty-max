import { useState } from 'react';

export default function CommentSection({ comments: initialComments, user, postId, onAddComment }) {
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!text.trim()) return;

    const newComment = { name: user ? user.name : 'You', text: text.trim() };
    setComments([newComment, ...comments]);
    setText('');

    if (onAddComment) {
      await onAddComment(postId, newComment.text);
    }
  };

  return (
    <div className="comment-section">
      {user ? (
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            rows="2"
            placeholder="Add a cute comment..."
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <button type="submit">Post comment</button>
        </form>
      ) : (
        <div className="login-prompt">Sign in to leave a comment and join the cute community.</div>
      )}

      <div className="comment-list">
        {comments.map((comment, index) => (
          <div key={`${comment.name}-${index}`} className="comment-bubble">
            <strong>{comment.name}</strong>
            <span>{comment.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
