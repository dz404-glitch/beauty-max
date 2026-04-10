import { useState } from 'react';
import { createPost } from '../api.js';

export default function NewPostForm({ onCreated }) {
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('cute,glow,video');
  const [videoFile, setVideoFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('Posting...');

    try {
      const post = await createPost({ caption, tags, videoFile });
      setCaption('');
      setTags('cute,glow,video');
      setVideoFile(null);
      setStatus('Post uploaded!');
      onCreated(post);
    } catch (err) {
      setStatus(err.message);
    }
  };

  return (
    <section className="card">
      <h3 className="section-title">Post a short beauty video</h3>
      <form className="advice-form" onSubmit={handleSubmit}>
        <textarea
          rows="3"
          placeholder="Describe your look or routine..."
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
        />
        <input
          placeholder="Tags, separated by commas"
          value={tags}
          onChange={(event) => setTags(event.target.value)}
        />
        <input
          type="file"
          accept="video/*"
          onChange={(event) => setVideoFile(event.target.files[0] || null)}
        />
        <button type="submit">Upload video post</button>
        {status && <p className="status-text">{status}</p>}
      </form>
    </section>
  );
}
