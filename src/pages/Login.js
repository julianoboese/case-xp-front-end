import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, LoadingButton } from '@mui/lab';
import isEmail from 'validator/lib/isEmail';
import isByteLength from 'validator/lib/isByteLength';
import { Grow } from '@mui/material';
import logoXp from '../assets/logo-xp.png';
import login from '../services/login';
import getUser from '../services/user';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState({ email: true, password: true });
  const [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();

  useEffect(() => {
    async function fetchUser() {
      const response = await getUser();

      if (!response.status) {
        history.push('/dashboard');
      }
    }

    fetchUser();

    const lastUser = localStorage.getItem('lastUser');
    if (lastUser) {
      console.log(JSON.parse(lastUser).email);
      setEmail(JSON.parse(lastUser).email);
      setRemember(true);
    }
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const { token, message } = await login({ email, password });
    if (token) {
      sessionStorage.setItem('token', token);

      if (remember) {
        localStorage.setItem('lastUser', JSON.stringify({ email, datetime: new Date() }));
      } else {
        localStorage.removeItem('lastUser');
      }

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
              <Checkbox name="remember" checked={remember} color="primary" onChange={(event) => setRemember(event.target.checked)} />
            }
            label="Lembrar e-mail"
          />
          {isLoading ? (
            <LoadingButton
              loading
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </LoadingButton>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={handleButtonDisabled()}
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
          )}
          {errorMessage
            && <Grow in={errorMessage}>
                <Alert variant='filled' severity="error" sx={{ m: 1 }}>{errorMessage}</Alert>
              </Grow>
          }
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
                Não tem uma conta? Cadastre-se.
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 5 }}
      >
        {'Projeto desenvolvido para o processo seletivo da XP Inc.'}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 1 }}
      >
        <Link color="inherit" href="https://github.com/julianoboese">
          Juliano Boese
        </Link>
        , 2022
      </Typography>
    </Container>
  );
}
