import React from 'react';
import { AppBar, Toolbar, Typography, Switch } from '@mui/material';

interface Props {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ toggleDarkMode, isDarkMode }: Props) {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">RE-STORE</Typography>
        <Switch onChange={toggleDarkMode} checked={isDarkMode} />
      </Toolbar>
    </AppBar>
  );
}
