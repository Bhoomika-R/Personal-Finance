import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light', icon: <Sun className="w-4 h-4" />, label: 'Light' },
    { value: 'dark', icon: <Moon className="w-4 h-4" />, label: 'Dark' },
    { value: 'system', icon: <Monitor className="w-4 h-4" />, label: 'System' },
  ];

  return (
    <div className="flex gap-2">
      {themes.map(({ value, icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors
            ${
              theme === value
                ? 'bg-primary text-white dark:bg-primary-dark'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
        >
          {icon}
          <span className="text-sm">{label}</span>
        </button>
      ))}
    </div>
  );
}