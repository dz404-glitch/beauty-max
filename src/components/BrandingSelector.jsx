import { useState } from 'react';

const brandingOptions = [
  {
    id: 'beautyMax',
    label: 'Beauty Max',
    tagline: 'Cutemaxxing your beauty and style journey',
    colors: { primary: '#ff89c6', secondary: '#ffc2e2' },
  },
  {
    id: 'glamGlow',
    label: 'Glam Glow',
    tagline: 'Radiant beauty, effortless style',
    colors: { primary: '#f7a8d0', secondary: '#ffd5ec' },
  },
  {
    id: 'cuteVibes',
    label: 'Cute Vibes',
    tagline: 'Adorable looks, confident vibes',
    colors: { primary: '#ff7ecb', secondary: '#ffb1d9' },
  },
  {
    id: 'softySpot',
    label: 'Softy Spot',
    tagline: 'Gentle beauty, cozy aesthetics',
    colors: { primary: '#d4a5ff', secondary: '#e8d4ff' },
  },
];

export default function BrandingSelector({ currentBrand, onBrandChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="branding-selector">
      <button
        className="branding-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Change app branding"
      >
        🎨 Brand
      </button>

      {isOpen && (
        <div className="branding-menu">
          {brandingOptions.map((option) => (
            <button
              key={option.id}
              className={currentBrand === option.id ? 'brand-option active' : 'brand-option'}
              onClick={() => {
                onBrandChange(option.id);
                setIsOpen(false);
              }}
            >
              <div className="brand-name">{option.label}</div>
              <div className="brand-tagline">{option.tagline}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
