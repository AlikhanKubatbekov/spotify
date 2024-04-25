import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Layout from './components/UI/Layout/Layout';
import {Typography} from '@mui/material';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Typography component="p">Home page</Typography>}/>

        <Route path="*" element={<Typography variant="h2">Not found!</Typography>}/>
      </Routes>
    </Layout>
  );
};

export default App;