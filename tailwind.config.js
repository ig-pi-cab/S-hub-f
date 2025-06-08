// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#A78BFA',
        accent: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
        background: '#F9FAFB',
        foreground: '#111827',
      },
    },
  },
  plugins: [],
};
