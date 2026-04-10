import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, 'uploads');
const distDir = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({ dest: uploadDir });
const app = express();
const PORT = process.env.PORT || 5174;
const jwtSecret = process.env.JWT_SECRET || 'beautymax-secret';

app.use(express.json());
app.use(express.static(distDir));
app.use('/uploads', express.static(uploadDir));

const users = [];
const posts = [
  {
    id: 'post-1',
    user: 'LunaGlow',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    time: '2h ago',
    caption: 'Soft pastel glow for a morning that feels like candy. 💖✨',
    tags: ['soft-glam', 'cute', 'dewy skin'],
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    comments: [
      { name: 'Mira', text: 'Omg this glow is everything!' },
      { name: 'Ciela', text: 'What blush did you use? 😍' },
    ],
  },
  {
    id: 'post-2',
    user: 'StylePuff',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    time: '5h ago',
    caption: 'Cute cozy outfit inspo for a dreamy date with yourself. 🌸',
    tags: ['fashion', 'aesthetic', 'cute outfit'],
    videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    comments: [
      { name: 'Noya', text: 'This is such a gentle mood.' },
      { name: 'Bea', text: 'Love the soft textures!' },
    ],
  },
  {
    id: 'post-3',
    user: 'GlowGuide',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    time: '9h ago',
    caption: 'The quickest cute skin routine for fresh, smooth cheeks. 🌿💜',
    tags: ['skincare', 'routine', 'cute'],
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    comments: [
      { name: 'Faye', text: 'Need this for busy mornings!' },
      { name: 'Tess', text: 'My skin would love this.' },
    ],
  },
];

function generateId() {
  return `${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36)}`;
}

function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: 'Missing authorization header' });
  }

  const token = header.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  try {
    req.user = jwt.verify(token, jwtSecret);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = { id: generateId(), name, email, password: hashedPassword };
  users.push(user);

  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, jwtSecret, { expiresIn: '7d' });

  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((item) => item.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, jwtSecret, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

app.get('/api/auth/me', authenticate, (req, res) => {
  res.json({ user: req.user });
});

app.get('/api/posts', (req, res) => {
  const sorted = [...posts].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  res.json(sorted);
});

app.post('/api/posts', authenticate, upload.single('video'), (req, res) => {
  const { caption, tags } = req.body;
  const tagList = (tags || '').split(',').map((tag) => tag.trim()).filter(Boolean);
  const videoUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const post = {
    id: generateId(),
    user: req.user.name,
    avatar: `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${encodeURIComponent(req.user.name)}`,
    time: 'Just now',
    caption: caption || 'Cute beauty moment',
    tags: tagList.length ? tagList : ['cute', 'beauty'],
    videoUrl,
    comments: [],
    createdAt: Date.now(),
  };

  posts.unshift(post);
  res.json(post);
});

app.post('/api/posts/:id/comments', authenticate, (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const post = posts.find((item) => item.id === id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const comment = {
    name: req.user.name,
    text: text || 'Love this!',
  };
  post.comments.unshift(comment);
  res.json(comment);
});

const adviceMap = {
  Dry: {
    skincare: 'Hydrate with a cream cleanser, rich moisturizer, and a soothing splash mask.',
    makeup: 'Use luminous foundation, cream blush, and glossy peachy lips for soft radiance.',
  },
  Oily: {
    skincare: 'Balance with a gel cleanser, lightweight serum, and a mattifying SPF.',
    makeup: 'Choose light coverage, powder blush, and a sheer lip tint to keep shine calm.',
  },
  Combination: {
    skincare: 'Focus on hydration in dry zones and gentle control in oilier areas.',
    makeup: 'Pair a soft-focus base with cream highlights and a blush that blends seamlessly.',
  },
  Sensitive: {
    skincare: 'Keep it gentle: barrier-support moisturizer, aloe, and fragrance-free SPF.',
    makeup: 'Use tinted moisturizer, soft rose tones, and a calming setting spray.',
  },
  Normal: {
    skincare: 'Maintain balance with a brightening cleanser, nourishing moisturizer, and SPF.',
    makeup: 'Go for fresh, dewy base, subtle shimmer, and a sweet stained lip look.',
  },
};

app.post('/api/ai-suggestion', (req, res) => {
  const { name, skinType = 'Normal', favoriteStyle = 'Soft + Cute', notes } = req.body;
  const profileName = name || 'beauty friend';
  const advice = adviceMap[skinType] || adviceMap.Normal;

  const suggestion = {
    message: `Hey ${profileName}! Your ${skinType.toLowerCase()} skin and ${favoriteStyle.toLowerCase()} style are perfect for a playful yet polished routine.`,
    skincare: advice.skincare,
    makeupLook: `Try a ${favoriteStyle.toLowerCase()} look with soft glowing skin, gentle pastel accents, and subtle lashes that keep everything sweet and comfy.`,
    outfit: `Pair a cozy knit or flowy top with a cute accessory like a bow or mini bag, then add soft neutrals or pastel tones to match your mood.`,
    tip: notes ? `Use your favorite notes as inspiration: ${notes}. Keep the final look cohesive with one bright feature and a soft finish.` : 'Start with skin prep, then add a pop of color in one area to keep your overall look cute and balanced.',
  };

  res.json(suggestion);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Beauty Max server running on http://localhost:${PORT}`);
});
