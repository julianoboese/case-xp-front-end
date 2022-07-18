import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { getAsset, getAssets } from '../services/assets';
import { formatChange, formatMoney } from '../utils/format';
import Title from './Title';

export default function Assets() {
  const { setIsActionOpen, currentAsset, setCurrentAsset } = useContext(AppContext);

  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    async function fetchAssets() {
      const userAssets = await getAssets();

      setAssets(userAssets);
    }

    fetchAssets();
    setIsLoading(false);
  }, [currentAsset]);

  const handleGetAsset = async (assetId) => {
    setIsActionOpen(true);
    const response = await getAsset(assetId);

    if (response.status === 401) {
      history.push('/');
    }

    setCurrentAsset(response);
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
        <>
          <Title>Recent Orders</Title>
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
              <Box sx={{ width: '210px', ml: 2 }}/>
            </Card>
            {assets.sort((a, b) => a.assetId - b.assetId).map((asset) => (
              <Card
                key={asset.assetId}
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
                    {formatMoney(asset.price)}
                  </Typography>
                  <Typography
                    color={asset.change >= 0 ? '#66bb6a' : 'error'}
                    display="inline-block"
                    width="20%"
                  >
                    {formatChange(asset.change)}
                  </Typography>
                </CardContent>
                <CardActions sx={{ ml: 2 }}>
                  <Button size="small" color="success" onClick={() => handleGetAsset(asset.assetId)}>
                    Comprar
                  </Button>
                  <Button size="small" color="error" onClick={() => handleGetAsset(asset.assetId)}>
                    Vender
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </>
      )}
    </>
  );
}
