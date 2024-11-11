import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectFetchArtistsLoading } from '../../../features/artists/artistsSlice';
import { selectFetchAlbumsLoading } from '../../../features/albums/albumsSlice';
import { selectFetchTracksLoading } from '../../../features/tracks/Tracks/tracksSlice';
import { selectLoginLoading, selectRegisterLoading } from '../../../features/users/usersSlice';
import {
  selectAddTrackToHistoryLoading,
  selectFetchTracksHistoryLoading,
} from '../../../features/tracks/TracksHistories/tracksHistoriesSlice';
import { Box, Drawer, LinearProgress, Typography } from '@mui/material';
import SideDrawer from './SideDrawer';
import TopNavigation from './TopNavigation';
import customDrawerClasses from './customDrawerClasses';
import { userLogout } from '../../../features/users/usersThunk';

const CustomDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const dispatch = useAppDispatch();

  const handleUserLogout = () => {
    dispatch(userLogout());
  };

  const fetchArtistLoading = useAppSelector(selectFetchArtistsLoading);
  const fetchAlbumsLoading = useAppSelector(selectFetchAlbumsLoading);
  const fetchTrackLoading = useAppSelector(selectFetchTracksLoading);
  const registerLoading = useAppSelector(selectRegisterLoading);
  const loginLoading = useAppSelector(selectLoginLoading);
  const addTrackToHistoryLoading = useAppSelector(selectAddTrackToHistoryLoading);
  const fetchTracksHistoryLoading = useAppSelector(selectFetchTracksHistoryLoading);

  const topNavigationLoadingBox = (
    <Box style={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  );

  return (
    <Typography component="div" style={{ display: 'flex' }}>
      <TopNavigation handleDrawerToggle={handleDrawerToggle} handleUserLogout={handleUserLogout}>
        {fetchArtistLoading && topNavigationLoadingBox}
        {fetchAlbumsLoading && topNavigationLoadingBox}
        {fetchTrackLoading && topNavigationLoadingBox}
        {registerLoading && topNavigationLoadingBox}
        {loginLoading && topNavigationLoadingBox}
        {addTrackToHistoryLoading && topNavigationLoadingBox}
        {fetchTracksHistoryLoading && topNavigationLoadingBox}
      </TopNavigation>

      <Typography component="nav" sx={customDrawerClasses.drawer}>
        <Typography component="div" sx={{ display: { sm: 'none', xs: 'block' } }}>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <SideDrawer handleUserLogout={handleUserLogout} />
          </Drawer>
        </Typography>

        <Typography component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Drawer open variant="permanent">
            <SideDrawer handleUserLogout={handleUserLogout} />
          </Drawer>
        </Typography>
      </Typography>

      <Typography component="main" sx={customDrawerClasses.content}>
        <Typography component="div" sx={customDrawerClasses.toolbar} />
        {children}
      </Typography>
    </Typography>
  );
};

export default CustomDrawer;
