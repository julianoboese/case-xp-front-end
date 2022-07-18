import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { getAsset, getAllAssets } from '../services/assets';
import Title from './Title';

export default function AllAssets() {
  const {
    setIsActionOpen, setCurrentAsset,
    setCurrentOperation,
  } = useContext(AppContext);

  const [allAssets, setAllAssets] = useState([]);
  const [assetsFiltered, setAssetsFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    async function fetchAllAssets() {
      const assets = await getAllAssets();

      setAllAssets(assets.sort(() => Math.random() - 0.5));
      setAssetsFiltered(assets);
    }

    fetchAllAssets();
    setIsLoading(false);
  }, []);

  const handleGetAsset = async (assetId) => {
    setCurrentOperation('order');
    setIsActionOpen(true);
    const response = await getAsset(assetId);

    if (response.status === 401) {
      history.push('/');
    }

    setCurrentAsset(response);
  };

  const handleFilterAssets = async (text) => {
    if (!text) return setAssetsFiltered(allAssets);

    const filtered = allAssets.filter((asset) => (
      asset.name.toLowerCase().includes(text.toLowerCase())
      || asset.ticker.toLowerCase().includes(text.toLowerCase())
    ))
      .sort((a, b) => a.ticker.localeCompare(b.ticker));

    return setAssetsFiltered(filtered);
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Title>Ativos disponíveis</Title>
            <TextField
              size="small"
              margin="normal"
              id="assets"
              label="Busque um ativo"
              name="assets"
              autoComplete="asset"
              onChange={(event) => handleFilterAssets(event.target.value)}
            />
          </Box>
          <Box
            sx={{
              backgroundColor: (theme) => theme.palette.grey[900],
              px: 2,
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Grid container columnSpacing={2} rowSpacing={1} sx={{ py: 1 }}>
            {assetsFiltered.filter((_asset, index) => index < 16)
              .sort((a, b) => a.assetId - b.assetId).map((asset) => (
              <Grid key={asset.assetId} item xs={3}>
              <Card
                sx={{
                  bgcolor: (theme) => theme.palette.grey[900],
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <CardContent sx={{ py: 1, flexGrow: 1, maxHeight: '60px', overflow: 'hidden' }}>
                  <Typography
                    variant="h6"
                    color="primary"
                    display="block"
                  >
                    {asset.ticker}
                  </Typography>
                  <Typography variant="h6" display="inline-block" noWrap sx={{ width: '100%' }}>
                    {asset.name.slice(0, 19)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant='contained'
                    sx={{ fontSize: '0.6rem', fontWeight: 'bold' }} onClick={() => handleGetAsset(asset.id)}>
                    Negociar
                  </Button>
                </CardActions>
              </Card>
              </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
    </>
  );
}
