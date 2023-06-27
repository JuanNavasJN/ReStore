import { ShoppingCart, Menu } from '@mui/icons-material';
import { Box, IconButton, Badge, List, ListItem, Drawer } from '@mui/material';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import SignedMenu from './SignedMenu';
import { useAppSelector } from '@/app/store';
import styles from '@/styles/RightMenu.module.css';

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

const navStyles = {
  textDecoration: 'none',
  color: 'inherit',
  typography: 'h6',
  '&:hover': {
    color: 'grey.500'
  }
};

export default function RightMenu() {
  const { basket } = useAppSelector(state => state.basket);
  const { user } = useAppSelector(state => state.account);
  const [openDrawer, setOpenDrawer] = useState(false);

  const itemCount = useMemo(
    () => basket?.items.reduce((sum, item) => sum + item.quantity, 0),
    [basket]
  );

  const list = (
    <List sx={{ display: 'flex' }} className={styles.list}>
      {rightLinks.map(({ title, path }) => (
        <ListItem
          className={styles.listItem}
          key={title}
          component={Link}
          href={path}
          sx={navStyles}
        >
          {title.toUpperCase()}
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box display="flex" alignItems="center">
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        sx={{ mr: 2 }}
        component={Link}
        href="/basket"
      >
        <Badge badgeContent={itemCount} color="secondary">
          <ShoppingCart />
        </Badge>
      </IconButton>

      <div className={styles.desktop}>{user ? <SignedMenu /> : list}</div>

      <div className={styles.mobile}>
        {user ? (
          <SignedMenu />
        ) : (
          <>
            <IconButton
              onClick={() => setOpenDrawer(true)}
              size="large"
              edge="start"
              color="inherit"
            >
              <Menu fontSize="large" />
            </IconButton>

            <Drawer
              anchor={'right'}
              open={openDrawer}
              onClose={() => setOpenDrawer(false)}
            >
              {list}
            </Drawer>
          </>
        )}
      </div>
    </Box>
  );
}
