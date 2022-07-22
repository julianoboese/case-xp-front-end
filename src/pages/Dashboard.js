import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  CssBaseline,
  Grid,
  Container,
  Box,
  Paper,
  List,
  Toolbar,
  Drawer,
  Typography,
  Divider,
  IconButton,
  CircularProgress,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MyAssets from '../components/MyAssets';
import ListItems from '../components/ListItems';
import AppContext from '../context/AppContext';
import Account from '../components/Account';
import getUser from '../services/user';
import logoXp from '../assets/logo-xp.png';
import Order from '../components/Order';
import AllAssets from '../components/AllAssets';
import Footer from '../components/Footer';
import { AppBar, LeftDrawer } from '../components/DashLayout';
import Operations from '../components/Operations';

export default function Dashboard() {
  const { isActionOpen, setIsActionOpen, user, setUser, currentOperation } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isOperationOpen, setIsOperationOpen] = useState(true);

  const toggleMenu = () => {
    setIsOperationOpen(!isOperationOpen);
  };

  const history = useHistory();

  useEffect(() => {
    async function fetchUser() {
      setIsActionOpen(false);

      const response = await getUser();

      if (response.status === 401) {
        history.push('/');
      }

      setUser(response);
    }

    fetchUser();
    setIsLoading(false);
  }, [history, setIsActionOpen, setUser]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    history.push('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {isLoading ? (
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => theme.palette.grey[900],
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          <CssBaseline />
          <AppBar position="absolute" open={isOperationOpen}>
            <Toolbar sx={{ pr: '24px' }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleMenu}
                sx={{
                  marginRight: '36px',
                  ...(isOperationOpen && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  component="img"
                  sx={{ maxHeight: 35 }}
                  alt="Logo da XP Investimentos"
                  src={logoXp}
                />
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '30px' }}
                >
                  <Typography>
                    {`${user.firstName} ${user.lastName}`}
                  </Typography>
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{ fontSize: '0.8rem' }}
                    onClick={handleLogout}
                  >
                    Sair
                  </Button>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
          <LeftDrawer variant="permanent" open={isOperationOpen}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleMenu}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <ListItems />
            </List>
          </LeftDrawer>
          <Drawer
            anchor="right"
            open={isActionOpen}
            onClose={() => setIsActionOpen(false)}
          >
            {/* Operações de conta e investimentos */}
            <Box
              sx={{
                width: currentOperation === 'operations' ? 850 : 500,
                overflowY: 'hidden',
              }}
            >
              <Toolbar />
              {currentOperation === 'account' && <Account />}
              {currentOperation === 'order' && <Order />}
              {currentOperation === 'operations' && <Operations />}
            </Box>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) => theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflowY: 'scroll',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <MyAssets />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Paper
                    sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
                  >
                    <AllAssets />
                  </Paper>
                </Grid>
              </Grid>
              <Footer />
            </Container>
          </Box>
        </>
      )}
    </Box>
  );
}
