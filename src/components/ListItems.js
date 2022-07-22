import React, { useContext } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PaidIcon from '@mui/icons-material/Paid';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { getBalance } from '../services/account';
import getOperations from '../services/operations';

export default function ListItems() {
  const {
    setIsActionOpen,
    setBalance,
    setCurrentOperation,
    setOperations,
  } = useContext(AppContext);

  const history = useHistory();

  const openAccount = async () => {
    setCurrentOperation('account');
    setIsActionOpen(true);
    const response = await getBalance();

    if (response.status === 401) {
      history.push('/');
    }

    setBalance(response.balance);
  };

  const openOperations = async () => {
    setCurrentOperation('operations');
    setIsActionOpen(true);
    const response = await getOperations();

    console.log(response);

    if (response.status === 401) {
      history.push('/');
    }

    setOperations(response);
  };

  return (
    <>
      <ListItemButton onClick={openAccount}>
        <ListItemIcon>
          <PaidIcon />
        </ListItemIcon>
        <ListItemText primary="Conta digital" />
      </ListItemButton>
      <ListItemButton onClick={openOperations}>
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary="Extrato" />
      </ListItemButton>
    </>
  );
}
