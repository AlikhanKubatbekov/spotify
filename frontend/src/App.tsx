import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Layout from './components/UI/Layout/Layout';
import {Typography} from '@mui/material';
import Artists from './features/artists/Artists';
import Albums from './features/albums/Albums';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Artists/>}/>
        <Route path="/albums" element={<Albums/>}/>

        <Route path="*" element={<Typography variant="h2">Not found!</Typography>}/>
      </Routes>
    </Layout>
  );
};

export default App;