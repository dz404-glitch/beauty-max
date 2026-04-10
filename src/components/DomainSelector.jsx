import { useState } from 'react';

const domainPresets = [
  { id: 'beautymax', label: 'beautymax.com' },
  { id: 'glamglow', label: 'glamglow.com' },
  { id: 'cutevibes', label: 'cutevibes.com' },
  { id: 'softyspot', label: 'softyspot.com' },
];

export default function DomainSelector({ currentDomain, onDomainChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [customDomain, setCustomDomain] = useState('');

  const handleCustomDomain = (event) => {
    event.preventDefault();
    if (customDomain.trim()) {
      onDomainChange(customDomain.trim());
      setCustomDomain('');
      setIsOpen(false);
    }
  };

  return (
    <div className="domain-selector">
      <button
        className="domain-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Change domain"
      >
        🌐 {currentDomain}
      </button>

      {isOpen && (
        <div className="domain-menu">
          <div className="domain-presets">
            {domainPresets.map((option) => (
              <button
                key={option.id}
                className={currentDomain === option.label ? 'domain-option active' : 'domain-option'}
                onClick={() => {
                  onDomainChange(option.label);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="domain-divider">Or</div>

          <form onSubmit={handleCustomDomain} className="custom-domain-form">
            <input
              type="text"
              placeholder="customdomain.com"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
            />
            <button type="submit">Set custom</button>
          </form>
        </div>
      )}
    </div>
  );
}
