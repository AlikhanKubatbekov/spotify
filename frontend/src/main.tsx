import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {persistor, store} from './app/store';
import App from './App';
import {PersistGate} from 'redux-persist/integration/react';
import {addInterceptors} from './axiosApi';
import theme from './theme';
import {CssBaseline, ThemeProvider} from '@mui/material';

addInterceptors(store);

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