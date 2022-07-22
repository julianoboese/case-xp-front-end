import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CssBaseline, Container, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography } from '@mui/material';
import isEmail from 'validator/lib/isEmail';
import isByteLength from 'validator/lib/isByteLength';
import logoXp from '../assets/logo-xp.png';
import login from '../services/login';
import getUser from '../services/user';
import Footer from '../components/Footer';
import SubmitButton from '../components/SubmitButton';
import ErrorMessage from '../components/ErrorMessage';
import AppContext from '../context/AppContext';

export default function Login() {
  const { setErrorMessage } = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState({ email: true, password: true });

  const history = useHistory();

  const retrieveLastUser = () => {
    const lastUser = localStorage.getItem('lastUser');
    if (lastUser) {
      console.log(JSON.parse(lastUser).email);
      setEmail(JSON.parse(lastUser).email);
      setRemember(true);
    }
  };

  useEffect(() => {
    async function fetchUser() {
      const response = await getUser();

      if (!response.status) {
        history.push('/dashboard');
      }
    }

    fetchUser();
    retrieveLastUser();
  }, [history]);

  const handleEmailValidation = () => {
    if (!isEmail(email)) {
      setValidation({ ...validation, email: false });
    }
  };

  const handleLengthValidation = (length) => (event) => {
    if (!isByteLength(event.target.value, { min: length })) {
      setValidation({ ...validation, [event.target.name]: false });
    }
  };

  const handleButtonDisabled = () => !isEmail(email) || !isByteLength(password, { min: 8 });

  const rememberLastUser = () => {
    if (remember) {
      localStorage.setItem(
        'lastUser',
        JSON.stringify({ email, datetime: new Date() }),
      );
    } else {
      localStorage.removeItem('lastUser');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const { token, message } = await login({ email, password });
    if (token) {
      sessionStorage.setItem('token', token);
      rememberLastUser();
      return history.push('/dashboard');
    }
    setIsLoading(false);
    setErrorMessage(message);
    return setTimeout(() => setErrorMessage(''), 4000);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          sx={{ mb: 10, maxHeight: 85 }}
          alt="Logo da XP Investimentos"
          src={logoXp}
        />
        <Typography component="h1" variant="h5">
          Acesse sua conta
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            value={email}
            error={!validation.email}
            helperText={!validation.email && 'Email inválido'}
            onFocus={() => setValidation({ ...validation, email: true })}
            onBlur={handleEmailValidation}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            error={!validation.password}
            helperText={
              !validation.password && 'A senha deve ter no mínimo 8 caracteres'
            }
            onFocus={() => setValidation({ ...validation, password: true })}
            onBlur={handleLengthValidation(8)}
            onChange={(event) => setPassword(event.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="remember"
                checked={remember}
                color="primary"
                onChange={(event) => setRemember(event.target.checked)}
              />
            }
            label="Lembrar e-mail"
          />
          <SubmitButton
            isLoading={isLoading}
            text='Entrar'
            handleButtonDisabled={handleButtonDisabled}
          />
          <ErrorMessage />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
                Não tem uma conta? Cadastre-se.
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </Container>
  );
}
