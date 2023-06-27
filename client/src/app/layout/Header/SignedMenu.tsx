import { useState } from 'react';
import { Button, Menu, Fade, MenuItem } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import { signOut } from '@/features/account/accountSlice';
import { clearBasket } from '@/features/basket/basketSlice';
import Link from 'next/link';
import styles from '@/styles/SignedMenu.module.css';
import { Person } from '@mui/icons-material';

function SignedMenu() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.account);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button color="inherit" sx={{ typography: 'h6' }} onClick={handleClick}>
        <span className={styles.desktop}>{user?.email}</span>
        <Person className={styles.mobile} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem component={Link} href="/orders">
          My orders
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(signOut());
            dispatch(clearBasket());
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default SignedMenu;
