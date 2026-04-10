import { useState } from 'react';
import { loginUser, registerUser } from '../api.js';

export default function AuthPanel({ onAuth }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const user = mode === 'login'
        ? await loginUser({ email: form.email, password: form.password })
        : await registerUser({ name: form.name, email: form.email, password: form.password });

      onAuth(user);
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="card auth-card">
      <div className="auth-header">
        <h2>{mode === 'login' ? 'Welcome back!' : 'Create your cutemax profile'}</h2>
        <button type="button" className="pill" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          {mode === 'login' ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </div>
      <p>{mode === 'login' ? 'Log in to post videos, comment, and get AI beauty advice.' : 'Sign up and start building your cute beauty feed.'}</p>
      <form className="advice-form" onSubmit={handleSubmit}>
        {mode === 'register' && (
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        )}
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />
        <button type="submit">{mode === 'login' ? 'Log in' : 'Register'}</button>
        {error && <p className="error-text">{error}</p>}
      </form>
    </section>
  );
}
