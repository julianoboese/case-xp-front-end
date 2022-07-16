import React, { useContext } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { getBalance } from '../services/account';

export default function ListItems() {
  const { setIsActionOpen, setBalance } = useContext(AppContext);

  const history = useHistory();

  const openAccount = async () => {
    setIsActionOpen(true);
    const { balance, error } = await getBalance();

    if (error?.status === 401) {
      history.push('/');
    }

    setBalance(balance);
  };

  return (
    <>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={() => setIsActionOpen(true)}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Investir" />
      </ListItemButton>
      <ListItemButton onClick={openAccount}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Conta digital" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItemButton>
    </>
  );
}
