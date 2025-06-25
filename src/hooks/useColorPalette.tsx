
import { usePortfolio } from '@/contexts/PortfolioContext';

const colorPalettes = [
  { primary: '#efdfbb', secondary: '#722f37' },
  { primary: '#fba002', secondary: '#313b2f' },
  { primary: '#a0430a', secondary: '#dfe8e6' },
  { primary: '#efe9e0', secondary: '#0f9e99' },
  { primary: '#536878', secondary: '#eae0c8' },
  { primary: '#b5b25c', secondary: '#f9f9f9' },
  { primary: '#eee5da', secondary: '#262424' },
  { primary: '#6f4e37', secondary: '#c2b280' },
];

// Function to determine if a color is light or dark
const isLightColor = (hex: string): boolean => {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  
  // Calculate luminance
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 128;
};

export const useColorPalette = () => {
  const { data } = usePortfolio();
  const palette = colorPalettes[data.selectedPalette - 1] || colorPalettes[0];
  
  const primaryIsLight = isLightColor(palette.primary);
  const secondaryIsLight = isLightColor(palette.secondary);
  
  return {
    primary: palette.primary,
    secondary: palette.secondary,
    palettes: colorPalettes,
    textOnPrimary: primaryIsLight ? '#000000' : '#FFFFFF',
    textOnSecondary: secondaryIsLight ? '#000000' : '#FFFFFF',
    isLightPrimary: primaryIsLight,
    isLightSecondary: secondaryIsLight,
  };
};
