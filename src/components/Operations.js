import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper } from '@mui/material';
import Title from './shared/Title';
import AppContext from '../context/AppContext';
import { formatMoney } from '../utils/format';

const operationTypes = {
  DEPOSIT: 'Depósito',
  WITHDRAW: 'Retirada',
  BUY: 'Compra',
  SELL: 'Venda',
};

export default function Operations() {
  const { operations } = useContext(AppContext);

  return (
    <Paper
      component="form"
      sx={{
        m: 5,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '80%',
        overflowY: 'scroll',
      }}
    >
      <Title>Extrato</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data da operação</TableCell>
            <TableCell>Código</TableCell>
            <TableCell>Tipo de operação</TableCell>
            <TableCell>Ativo</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell align="right">Valor total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {operations
            .sort((a, b) => b.id - a.id)
            .map((operation) => (
              <TableRow key={operation.id}>
                <TableCell>{operation.createdAt}</TableCell>
                <TableCell>{operation.id}</TableCell>
                <TableCell>{operationTypes[operation.type]}</TableCell>
                <TableCell>{operation.ticker}</TableCell>
                <TableCell>{operation.quantity}</TableCell>
                <TableCell
                  sx={{ color: operation.amount >= 0 ? '#66bb6a' : '#f44336' }}
                  align="right"
                >
                  {formatMoney(operation.amount)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
