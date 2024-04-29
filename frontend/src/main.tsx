import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {store, persistor} from './app/store';
import {CssBaseline, ThemeProvider} from '@mui/material';
import App from './App';
import theme from './theme';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <App/>
        </ThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);