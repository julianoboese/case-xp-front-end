import React, { useContext, useEffect, useState } from 'react';
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
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useHistory } from 'react-router-dom';
import MyAssets from '../components/MyAssets';
// import Deposits from '../components/Deposits';
// import Orders from '../components/Orders';
import ListItems from '../components/ListItems';
import AppContext from '../context/AppContext';
import Account from '../components/Account';
import getUser from '../services/user';
import logoXp from '../assets/logo-xp.png';
import Order from '../components/Order';
import AllAssets from '../components/AllAssets';
import Footer from '../components/Footer';

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const LeftDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function DashboardContent() {
  const { isActionOpen, setIsActionOpen, user, setUser, currentOperation } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <AppBar position="absolute" open={isMenuOpen}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleMenu}
                sx={{
                  marginRight: '36px',
                  ...(isMenuOpen && { display: 'none' }),
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
                  sx={{
                    maxHeight: 35,
                  }}
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
          <LeftDrawer variant="permanent" open={isMenuOpen}>
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
            {/* Tarefas de conta e investimento */}
            <Box sx={{ width: currentOperation === 'order' ? 500 : 420 }}>
              <Toolbar />
              {currentOperation === 'account' && <Account />}
              {currentOperation === 'order' && <Order />}
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
                {/* Assets */}
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
                {/* Recent Orders */}
                <Grid item xs={12} md={12} lg={12}>
                  <Paper
                    sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
                  >
                    <AllAssets />
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                {/* <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    <Deposits />
                  </Paper>
                </Grid> */}
              </Grid>
              <Footer />
            </Container>
          </Box>
        </>
      )}
    </Box>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
