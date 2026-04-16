// Theme toggle script
// Adds a light/dark mode switch. The default colors are dark (as defined in CSS).
// When the user clicks the toggle button, we switch to a light theme by updating CSS custom properties.

(function() {
  const button = document.getElementById('themeToggle');
  if (!button) return;

  const darkTheme = {
    '--color-bg': '#000408',
    '--color-bg-secondary': '#001122',
    '--color-card': 'rgba(0, 17, 34, 0.7)',
    '--color-card-hover': 'rgba(0, 25, 51, 0.8)',
    '--color-text': '#e0f7ff',
    '--color-text-muted': '#8ab4d8',
    '--color-primary': '#00bfff',
    '--color-primary-light': '#1e90ff',
    '--color-secondary': '#ff4500',
    '--color-accent': '#ffff00',
    '--color-success': '#7fff00',
    '--color-border': 'rgba(255, 69, 0, 0.3)'
  };

  const lightTheme = {
    '--color-bg': '#ffffff',
    '--color-bg-secondary': '#f0f0f0',
    '--color-card': 'rgba(255, 255, 255, 0.9)',
    '--color-card-hover': 'rgba(240, 240, 240, 0.9)',
    '--color-text': '#222222',
    '--color-text-muted': '#555555',
    '--color-primary': '#0066cc',
    '--color-primary-light': '#0055aa',
    '--color-secondary': '#cc3300',
    '--color-accent': '#ffdd00',
    '--color-success': '#55aa00',
    '--color-border': 'rgba(0,0,0,0.2)'
  };

  // Determine current theme based on a data attribute on <html>
  const root = document.documentElement;
  const current = root.getAttribute('data-theme') || 'dark';

  const applyTheme = (themeObj) => {
    Object.entries(themeObj).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  // Initialise with stored preference if any
  const saved = localStorage.getItem('theme');
  if (saved) {
    root.setAttribute('data-theme', saved);
    applyTheme(saved === 'light' ? lightTheme : darkTheme);
  } else {
    applyTheme(darkTheme);
    root.setAttribute('data-theme', 'dark');
  }

  button.addEventListener('click', () => {
    const newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    applyTheme(newTheme === 'light' ? lightTheme : darkTheme);
    localStorage.setItem('theme', newTheme);
    button.textContent = newTheme === 'light' ? 'Dark Theme' : 'Light Theme';
  });
})();
