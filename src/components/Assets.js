import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAssets } from '../services/assets';

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAssets() {
      const userAssets = await getAssets();

      setAssets(userAssets);
    }

    fetchAssets();
    setIsLoading(false);
  }, []);

  const formatPrice = (price) => {
    const splitPrice = price.toString().split('.');
    if (!splitPrice[1]) return `${splitPrice[0]},00`;
    if (splitPrice[1].length === 1) return `${splitPrice.join(',')}0`;
    return splitPrice.join(',');
  };

  return (
    <>
      {isLoading ? (
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => theme.palette.grey[900],
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'auto',
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.grey[900],
            px: 2,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Card
            sx={{
              bgcolor: (theme) => theme.palette.grey[700],
              m: 1,
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              minWidth: 275,
            }}
          >
            <CardContent sx={{ py: 1, flexGrow: 1 }}>
              <Typography display="inline-block" width="30%">
                Ativo
              </Typography>
              <Typography display="inline-block" width="24%">
                Posição
              </Typography>
              <Typography display="inline-block" width="30%">
                Valor atual
              </Typography>
              <Typography display="inline-block" width="16%">
                Variação
              </Typography>
            </CardContent>
            <Box sx={{ width: '210px', ml: 2 }}>
            </Box>
          </Card>
          {assets.map((asset) => (
            <Card
              key={asset.id}
              sx={{
                bgcolor: (theme) => theme.palette.grey[900],
                m: 1,
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                minWidth: 275,
              }}
            >
              <CardContent sx={{ py: 1, flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  color="primary"
                  display="inline-block"
                  width="30%"
                >
                  {asset.ticker}
                </Typography>
                <Typography display="inline-block" width="20%">
                  {asset.quantity}
                </Typography>
                <Typography variant="h6" display="inline-block" width="30%">
                  {`R$ ${formatPrice(asset.price)}`}
                </Typography>
                <Typography
                  color={asset.change >= 0 ? '#66bb6a' : 'error'}
                  display="inline-block"
                  width="20%"
                >
                  {`${formatPrice(asset.change)}%`}
                </Typography>
              </CardContent>
              <CardActions sx={{ ml: 2 }}>
                <Button size="small" color="success">
                  Comprar
                </Button>
                <Button size="small" color="error">
                  Vender
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
}
