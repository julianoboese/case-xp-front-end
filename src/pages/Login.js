import React, { useEffect, useState } from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';
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
import { LoadingButton } from '@mui/lab';
import logoXp from '../assets/logo-xp.png';
import login from '../services/login';
import getUser from '../services/user';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    async function fetchUser() {
      const { error } = await getUser();

      if (!error) {
        history.push('/dashboard');
      }
    }

    fetchUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const { token, message } = await login({ email, password });
    if (token) {
      sessionStorage.setItem('token', token);
      return history.push('/dashboard');
    }
    setIsLoading(false);
    return alert(message);
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
          sx={{
            mb: 10,
            maxHeight: 85,
          }}
          alt="The house from the offer."
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
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
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
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
          )}
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <RouterLink to='/register'>
                <Link variant="body2">
                  Não tem uma conta? Cadastre-se.
                </Link>
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
        {'Projeto desenvolvido para o processo seletivo da XP Inc.'}
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
        <Link color="inherit" href="https://github.com/julianoboese">
          Juliano Boese
        </Link>
          ,{' '} 2022
      </Typography>
    </Container>
  );
}
