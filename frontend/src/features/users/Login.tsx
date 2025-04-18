import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLoginError } from './usersSlice';
import { googleLogin, login } from './usersThunk';
import { Alert, Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { GoogleLogin } from '@react-oauth/google';
import { LoginMutation } from '../../types/user';

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate('/');
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(login(state)).unwrap();
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {error && (
          <Alert variant="outlined" severity="error" sx={{ mt: 3, width: '100%' }}>
            {error.error}
          </Alert>
        )}

        <Box sx={{ pt: 2 }}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                void googleLoginHandler(credentialResponse.credential);
              }
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </Box>

        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                autoComplete="off"
                value={state.email}
                onChange={inputChangeHandler}
                color={'success'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                autoComplete="off"
                value={state.password}
                onChange={inputChangeHandler}
                color={'success'}
              />
            </Grid>
          </Grid>
          <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                Or sign up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
