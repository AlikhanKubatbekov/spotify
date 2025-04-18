import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/UI/Layout/Layout';
import { Typography } from '@mui/material';
import Artists from './features/artists/Artists';
import Albums from './features/albums/Albums';
import Tracks from './features/tracks/Tracks/Tracks';
import Register from './features/users/Register';
import Login from './features/users/Login';
import TracksHistory from './features/tracks/TracksHistories/TracksHistory';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlice';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App: React.FC = () => {
  const user = useAppSelector(selectUser);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Artists />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/tracks" element={<Tracks />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/track_history"
          element={
            <ProtectedRoute isAllowed={Boolean(user)}>
              <TracksHistory />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Typography variant="h2">Not found!</Typography>} />
      </Routes>
    </Layout>
  );
};

export default App;
