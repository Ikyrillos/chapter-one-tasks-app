/**
 * Theme configuration for Chapter One App
 */

import { Platform } from 'react-native';

export const Colors = {
  light: {
    primary: '#EF4444', // Brand Red
    background: '#FFFFFF',
    card: '#F9FAFB', // Subtle gray for inputs/cards
    text: '#1F2937', // Dark Charcoal (Primary Text)
    textSecondary: '#4B5563', // Soft Gray (Secondary Text)
    border: '#E5E7EB',
    tint: '#EF4444', 
    icon: '#6B7280',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: '#EF4444',
    danger: '#DC2626', // Darker red for errors
    success: '#10B981', 
  },
  dark: {
    primary: '#F87171', // Softer Red for Dark Mode (Less eye strain)
    background: '#111827', // Deep Blue-Gray (Rich Dark)
    card: '#1F2937', // Lighter Dark Gray for inputs/cards
    text: '#F9FAFB', // White-ish
    textSecondary: '#D1D5DB', // Light Gray
    border: '#374151',
    tint: '#F87171',
    icon: '#9CA3AF',
    tabIconDefault: '#6B7280',
    tabIconSelected: '#F87171',
    danger: '#EF4444',
    success: '#34D399',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  android: {
    sans: 'sans-serif',
    serif: 'serif',
    rounded: 'sans-serif-medium',
    mono: 'monospace',
  },
  default: {
    sans: 'system-ui',
    serif: 'serif',
    rounded: 'system-ui',
    mono: 'monospace',
  },
});