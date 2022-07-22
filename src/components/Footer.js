import { Link, Typography } from '@mui/material';
import React from 'react';

export default function Footer() {
  return (
    <>
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
    </>
  );
}
