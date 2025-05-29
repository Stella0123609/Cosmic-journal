import React, { useState } from 'react';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('light', !isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-nebula text-starlight hover:bg-starlight hover:text-cosmic transition glow"
    >
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}

export default ThemeToggle;