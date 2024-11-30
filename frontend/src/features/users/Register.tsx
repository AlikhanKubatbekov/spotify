import React, { useState } from 'react';
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectRegisterError } from './usersSlice';
import { register } from './usersThunk';
import FileInput from '../../components/UI/FileInput/FileInput';
import { RegisterMutation } from '../../types/user';
import getFieldError from '../../helpers/getFieldError';

const Register = () => {
  const navigate = useNavigate();

  const [state, setState] = useState<RegisterMutation>({
    email: '',
    password: '',
    displayName: '',
    avatar: null,
  });

  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    await dispatch(
      register({
        email: state.email.trim(),
        password: state.password.trim(),
        displayName: state.displayName.trim(),
        avatar: state.avatar,
      }),
    ).unwrap();
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                autoComplete="off"
                value={state.email}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError(error, 'email'))}
                helperText={getFieldError(error, 'email')}
                color={'success'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="off"
                value={state.password}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError(error, 'password'))}
                helperText={getFieldError(error, 'password')}
                color={'success'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Display name"
                name="displayName"
                autoComplete="off"
                value={state.displayName}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError(error, 'displayName'))}
                helperText={getFieldError(error, 'displayName')}
                color={'success'}
              />
            </Grid>
            <Grid item xs={12}>
              <FileInput label="Avatar" name="avatar" onChange={fileInputChangeHandler} />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
