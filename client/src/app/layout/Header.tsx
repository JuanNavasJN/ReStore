import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  List,
  ListItem,
  IconButton,
  Badge,
  Box
} from '@mui/material';
import Link from 'next/link';
import { ShoppingCart } from '@mui/icons-material';

const midLinks = [
  {
    title: 'catalog',
    path: '/catalog'
  },
  {
    title: 'about',
    path: '/about'
  },
  {
    title: 'contact',
    path: '/contact'
  }
];

const rightLinks = [
  {
    title: 'login',
    path: '/login'
  },
  {
    title: 'register',
    path: '/register'
  }
];

interface Props {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const navStyles = {
  textDecoration: 'none',
  color: 'inherit',
  typography: 'h6',
  '&:hover': {
    color: 'grey.500'
  }
};

export default function Header({ toggleDarkMode, isDarkMode }: Props) {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component={Link} href={'/'} sx={navStyles}>
            RE-STORE
          </Typography>
          <Switch onChange={toggleDarkMode} checked={isDarkMode} />
        </Box>

        <List sx={{ display: 'flex' }}>
          {midLinks.map(({ title, path }) => (
            <ListItem key={title} component={Link} href={path} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box display="flex" alignItems="center">
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <Badge badgeContent="4" color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <List sx={{ display: 'flex' }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem key={title} component={Link} href={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}