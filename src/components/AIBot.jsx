import { useState } from 'react';
import { getAdvice } from '../api.js';

const defaultOptions = {
  skinType: ['Dry', 'Oily', 'Combination', 'Sensitive', 'Normal'],
  favoriteStyle: ['Soft + Cute', 'Minimal Chic', 'Vintage Pastel', 'Sporty Sweet', 'Romantic Glow'],
  makeupGoal: ['Everyday glow', 'Date night cuteness', 'Quick fresh look', 'Fresh skin focus'],
};

export default function AIBot({ user }) {
  const [profile, setProfile] = useState({ name: user?.name || '', skinType: 'Normal', favoriteStyle: 'Soft + Cute', makeupGoal: 'Everyday glow', notes: '' });
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('Generating your advice...');

    try {
      const response = await getAdvice(profile);
      setResult(response);
    } catch (error) {
      setResult({ message: error.message, skincare: '', makeupLook: '', outfit: '', tip: '' });
    } finally {
      setStatus('');
    }
  };

  return (
    <section className="card">
      <h2 className="section-title">Beauty Bot</h2>
      <p>Answer a few simple questions and get a personalized cute makeup look, outfit inspiration, and skincare steps.</p>

      <form className="advice-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name (optional)"
          value={profile.name}
          onChange={(event) => setProfile({ ...profile, name: event.target.value })}
        />
        <label>
          Skin type
          <select value={profile.skinType} onChange={(event) => setProfile({ ...profile, skinType: event.target.value })}>
            {defaultOptions.skinType.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Favorite fashion style
          <select value={profile.favoriteStyle} onChange={(event) => setProfile({ ...profile, favoriteStyle: event.target.value })}>
            {defaultOptions.favoriteStyle.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Makeup goal
          <select value={profile.makeupGoal} onChange={(event) => setProfile({ ...profile, makeupGoal: event.target.value })}>
            {defaultOptions.makeupGoal.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <textarea
          rows="3"
          placeholder="Tell me a little about your skin or favorite colors..."
          value={profile.notes}
          onChange={(event) => setProfile({ ...profile, notes: event.target.value })}
        />
        <button type="submit">Create my cute plan</button>
        {status && <p className="status-text">{status}</p>}
      </form>

      {result && (
        <div className="ai-result">
          <div className="ai-result-box">
            <h3>Personalized advice</h3>
            <p>{result.message}</p>
          </div>
          <div className="ai-result-box">
            <h3>Skincare routine</h3>
            <p>{result.skincare}</p>
          </div>
          <div className="ai-result-box">
            <h3>Makeup look</h3>
            <p>{result.makeupLook}</p>
          </div>
          <div className="ai-result-box">
            <h3>Outfit inspiration</h3>
            <p>{result.outfit}</p>
          </div>
          <div className="ai-result-box">
            <h3>Quick cutemaxxing tip</h3>
            <p>{result.tip}</p>
          </div>
        </div>
      )}
    </section>
  );
}
