import React, { useContext } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PaidIcon from '@mui/icons-material/Paid';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { getBalance } from '../services/account';
import { formatMoney } from '../utils/format';

export default function ListItems() {
  const { setIsActionOpen, setBalance, setCurrentOperation } = useContext(AppContext);

  const history = useHistory();

  const openAccount = async () => {
    setCurrentOperation('account');
    setIsActionOpen(true);
    const { balance, error } = await getBalance();

    if (error?.status === 401) {
      history.push('/');
    }

    setBalance(formatMoney(balance));
  };

  return (
    <>
      <ListItemButton onClick={openAccount}>
        <ListItemIcon>
          <PaidIcon />
        </ListItemIcon>
        <ListItemText primary="Conta digital" />
      </ListItemButton>
    </>
  );
}
