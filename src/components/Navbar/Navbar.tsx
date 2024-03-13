import StarIcon from '@mui/icons-material/Star';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { CustomDialog } from '..';
import { FavoriteTable } from './FavoriteTable';
import { dialogOpenSubject$ } from '../CustomDialog/CustomDialog';
import { AppStore } from '@/redux/store';
import { useSelector } from 'react-redux';
// re order imports shift+alt+o
export type NavbarProps = {
  // types...
}

const Navbar: React.FC<NavbarProps> = () => {
  useSelector((store: AppStore) => store.favorites);
  const handleClick = () => {
    dialogOpenSubject$.setSubject = true;
  }
  return (
    <>
      <CustomDialog>
        <FavoriteTable />
      </CustomDialog>
      <AppBar position="fixed" color='info'>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <IconButton color='secondary' onClick={handleClick}>
            <StarIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
