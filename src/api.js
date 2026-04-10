const API_BASE = '/api';
const AUTH_KEY = 'beautymax-auth';

function getStoredUser() {
  const stored = localStorage.getItem(AUTH_KEY);
  return stored ? JSON.parse(stored) : null;
}

function saveAuth(token, user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify({ token, user }));
}

function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}

function getToken() {
  const auth = getStoredUser();
  return auth?.token || null;
}

function getUser() {
  const auth = getStoredUser();
  return auth?.user || null;
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = { ...(options.headers || {}) };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  saveAuth(data.token, data.user);
  return data.user;
}

export async function registerUser(credentials) {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  saveAuth(data.token, data.user);
  return data.user;
}

export function logout() {
  clearAuth();
}

export async function fetchPosts() {
  return request('/posts');
}

export async function createPost({ caption, tags, videoFile }) {
  const formData = new FormData();
  formData.append('caption', caption);
  formData.append('tags', tags);
  if (videoFile) {
    formData.append('video', videoFile);
  }

  return request('/posts', {
    method: 'POST',
    body: formData,
  });
}

export async function addComment(postId, text) {
  return request(`/posts/${postId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
}

export async function getAdvice(profile) {
  return request('/ai-suggestion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });
}

export function getCurrentUser() {
  return getUser();
}

export function saveUser(user) {
  const auth = getStoredUser() || {};
  saveAuth(auth.token, user);
}
