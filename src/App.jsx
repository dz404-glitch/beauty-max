import { useEffect, useState } from 'react';
import Feed from './components/Feed.jsx';
import AIBot from './components/AIBot.jsx';
import InspirationGrid from './components/InspirationGrid.jsx';
import AuthPanel from './components/AuthPanel.jsx';
import Logo from './components/Logo.jsx';
import BrandingSelector from './components/BrandingSelector.jsx';
import { getCurrentUser, logout } from './api.js';

function App() {
  const [section, setSection] = useState('feed');
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('auto');
  const [brand, setBrand] = useState('beautyMax');
  const themeOptions = [
    { id: 'auto', label: 'Auto', icon: '⭘' },
    { id: 'dark', label: 'Dark', icon: '🌙' },
    { id: 'pink', label: 'Pink Cloud', icon: '🌸' },
    { id: 'soft', label: 'Soft', icon: '☁️' },
  ];

  const brandTaglines = {
    beautyMax: 'Cutemaxxing your beauty and style journey',
    glamGlow: 'Radiant beauty, effortless style',
    cuteVibes: 'Adorable looks, confident vibes',
    softySpot: 'Gentle beauty, cozy aesthetics',
  };

  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'soft';
  };

  const applyTheme = (value) => {
    const effectiveTheme = value === 'auto' ? getSystemTheme() : value;
    document.documentElement.dataset.theme = effectiveTheme;
  };

  useEffect(() => {
    setUser(getCurrentUser());
    const storedTheme = window.localStorage.getItem('beautymax-theme') || 'auto';
    const storedBrand = window.localStorage.getItem('beautymax-brand') || 'beautyMax';
    setTheme(storedTheme);
    setBrand(storedBrand);
    applyTheme(storedTheme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handlePreferenceChange = () => {
      const currentTheme = window.localStorage.getItem('beautymax-theme') || 'auto';
      if (currentTheme === 'auto') {
        applyTheme('auto');
      }
    };

    mediaQuery.addEventListener('change', handlePreferenceChange);
    return () => mediaQuery.removeEventListener('change', handlePreferenceChange);
  }, []);

  const handleThemeChange = (value) => {
    setTheme(value);
    applyTheme(value);
    window.localStorage.setItem('beautymax-theme', value);
  };

  const handleBrandChange = (newBrand) => {
    setBrand(newBrand);
    window.localStorage.setItem('beautymax-brand', newBrand);
  };

  const handleDomainChange = (newDomain) => {
    setDomain(newDomain);
    window.loc('feed');
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <div className="app-shell" data-brand={brand}>
      <header className="topbar">
        <div className="header-left">
          <Logo domain={brand} />
          <h1>{brandTaglines[brand]}</h1>
        </div>

        <div className="nav-stack">
          <nav className="nav-pill-group">
            <button className={section === 'feed' ? 'pill active' : 'pill'} onClick={() => setSection('feed')}>
              Feed
            </button>
            <button className={section === 'inspo' ? 'pill active' : 'pill'} onClick={() => setSection('inspo')}>
              Inspo
            </button>
            <button className={section === 'ai' ? 'pill active' : 'pill'} onClick={() => setSection('ai')}>
              AI Beauty Bot
            </button>
          </nav>

          <div className="theme-controls">
            <div className="controls-row">
              {themeOptions.map((option) => (
                <button
                  key={option.id}
                  className={theme === option.id ? 'pill active' : 'pill'}
                  type="button"
                  onClick={() => handleThemeChange(option.id)}
                >
                  {option.icon} {option.label}
                </button>
              ))}
            </div>
            <div className="control-items">
              <BrandingSelector currentBrand={brand} onBrandChange={handleBrandChange} />
              <DomainSelector currentDomain={domain} onDomainChange={handleDomainChange} />
            </div>
          </div>

          <div className="auth-row">
              <>
                <span>Hi, {user.name}</span>
                <button className="pill" type="button" onClick={handleLogout}>
                  Log out
                </button>
              </>
            ) : (
              <button className="pill" type="button" onClick={() => setSection('auth')}>
                Sign in
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="main-grid">
        {section === 'auth' && !user && <AuthPanel onAuth={handleAuth} />}
        {section === 'feed' && <Feed user={user} />}
        {section === 'inspo' && <InspirationGrid />}
        {section === 'ai' && <AIBot user={user} />}
      </main>

      <footer className="footer-note">
        <p>Build cute, productive beauty routines with short video posts, mood boards, and friendly AI advice.</p>
      </footer>
    </div>
  );
}

export default App;
