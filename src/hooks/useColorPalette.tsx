
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

export const useColorPalette = () => {
  const { data } = usePortfolio();
  const palette = colorPalettes[data.selectedPalette - 1] || colorPalettes[0];
  
  return {
    primary: palette.primary,
    secondary: palette.secondary,
    palettes: colorPalettes,
  };
};
