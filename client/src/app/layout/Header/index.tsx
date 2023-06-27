import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  Box
} from '@mui/material';
import Link from 'next/link';
import { useAppSelector } from '../../store';
import DarkModeSwitch from '../../components/DarkModeSwitch';
import styles from '@/styles/Header.module.css';
import RightMenu from './RightMenu';

const midLinks = [
  {
    title: 'catalog',
    path: '/catalog'
  },
  {
    title: 'contact',
    path: '/contact'
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
  const { user } = useAppSelector(state => state.account);

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
          <Typography
            variant="h6"
            component={Link}
            href={'/'}
            sx={navStyles}
            className={styles.title}
          >
            RE-STORE
          </Typography>

          <DarkModeSwitch
            toggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
          />
        </Box>

        <List sx={{ display: 'flex' }}>
          {midLinks.map(({ title, path }) => (
            <ListItem
              className={title !== 'catalog' ? styles.desktop : ''}
              key={title}
              component={Link}
              href={path}
              sx={navStyles}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
          {user && user.roles?.includes('Admin') && (
            <ListItem component={Link} href={'/admin/inventory'} sx={navStyles}>
              INVENTORY
            </ListItem>
          )}
        </List>

        <RightMenu />
      </Toolbar>
    </AppBar>
  );
}
