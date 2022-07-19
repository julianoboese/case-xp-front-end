import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { LoadingButton } from '@mui/lab';
import isEmail from 'validator/lib/isEmail';
import isByteLength from 'validator/lib/isByteLength';
import logoXp from '../assets/logo-xp.png';
import register from '../services/register';
import getUser from '../services/user';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState({
    firstName: true,
    lastName: true,
    email: true,
    password: true,
  });

  const history = useHistory();

  useEffect(() => {
    async function fetchUser() {
      const { error } = await getUser();

      if (!error) {
        history.push('/dashboard');
      }
    }

    fetchUser();
  }, [history]);

  const handleLengthValidation = (length) => (event) => {
    if (!isByteLength(event.target.value, { min: length })) {
      setValidation({ ...validation, [event.target.name]: false });
    }
  };

  const handleEmailValidation = () => {
    if (!isEmail(email)) {
      setValidation({ ...validation, email: false });
    }
  };

  const handleButtonDisabled = () => (
    !isEmail(email)
      || !isByteLength(password, { min: 8 })
      || !isByteLength(firstName, { min: 2 })
      || !isByteLength(lastName, { min: 2 })
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const { token, message } = await register({
      firstName,
      lastName,
      email,
      password,
    });
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
          Abra sua conta
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Nome"
                error={!validation.firstName}
                helperText={
                  !validation.firstName
                  && 'O nome deve ter no mínimo 2 caracteres'
                }
                onFocus={() => setValidation({ ...validation, firstName: true })
                }
                onBlur={handleLengthValidation(2)}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Sobrenome"
                name="lastName"
                error={!validation.lastName}
                helperText={
                  !validation.lastName
                  && 'O sobrenome deve ter no mínimo 2 caracteres'
                }
                onFocus={() => setValidation({ ...validation, lastName: true })}
                onBlur={handleLengthValidation(2)}
                onChange={(event) => setLastName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                error={!validation.email}
                helperText={!validation.email && 'Email inválido'}
                onFocus={() => setValidation({ ...validation, email: true })}
                onBlur={handleEmailValidation}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                error={!validation.password}
                helperText={
                  !validation.password
                  && 'A senha deve ter no mínimo 8 caracteres'
                }
                onFocus={() => setValidation({ ...validation, password: true })}
                onBlur={handleLengthValidation(8)}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
          </Grid>
          {isLoading ? (
            <LoadingButton
              loading
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </LoadingButton>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={handleButtonDisabled()}
              sx={{ mt: 3, mb: 2 }}
            >
              Abrir conta
            </Button>
          )}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Já possui uma conta? Acesse.
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
