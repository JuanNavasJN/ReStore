import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useState } from 'react';
import Header from '@/app/layout/Header';

import '@/app/layout/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const paletteType = isDarkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#DDDDDD' : '#121212'
      }
    }
  });

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
