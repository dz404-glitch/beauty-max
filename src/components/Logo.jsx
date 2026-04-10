export default function Logo({ domain }) {
  const brandConfig = {
    beautyMax: { icon: '✨', emoji: '💅' },
    glamGlow: { icon: '💫', emoji: '✨' },
    cuteVibes: { icon: '🌸', emoji: '💕' },
    softySpot: { icon: '☁️', emoji: '🎀' },
  };

  const brand = brandConfig[domain] || brandConfig.beautyMax;

  return (
    <div className="logo">
      <span className="logo-icon">{brand.icon}</span>
      <span className="logo-name">{domain}</span>
    </div>
  );
}
