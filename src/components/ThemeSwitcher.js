import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light', icon: <Sun size={16} />, label: 'Light' },
    { value: 'dark', icon: <Moon size={16} />, label: 'Dark' },
    { value: 'system', icon: <Monitor size={16} />, label: 'System' },
  ];

  return (
    <ButtonGroup>
      {themes.map(({ value, icon, label }) => (
        <Button
          key={value}
          variant={theme === value ? 'primary' : 'outline-primary'}
          onClick={() => setTheme(value)}
          className="d-flex align-items-center gap-2"
        >
          {icon}
          <span>{label}</span>
        </Button>
      ))}
    </ButtonGroup>
  );
}