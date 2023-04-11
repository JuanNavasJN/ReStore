import type { AppProps } from 'next/app';
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { useState } from 'react';
import Header from '@/app/layout/Header';
import Head from 'next/head';

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
        default: paletteType === 'light' ? '#F7F7F7' : '#121212'
      }
    }
  });

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <>
      <Head>
        <title>ReStore</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        <main>
          <Container>
            <Component {...pageProps} />
          </Container>
        </main>
      </ThemeProvider>
    </>
  );
}
