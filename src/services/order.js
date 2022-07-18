export const buyAsset = async (assetId, amount) => {
  const token = sessionStorage.getItem('token');
  const response = await fetch(
    'https://case-xp-back-end.herokuapp.com/investimentos/comprar',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ assetId, amount }),
    },
  );

  if (response.status >= 400) return { error: { status: response.status } };

  const responseJson = await response.json();
  return responseJson;
};

export const sellAsset = async (assetId, amount) => {
  const token = sessionStorage.getItem('token');
  const response = await fetch(
    'https://case-xp-back-end.herokuapp.com/investimentos/vender',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ assetId, amount }),
    },
  );

  if (response.status >= 400) return { error: { status: response.status } };

  const responseJson = await response.json();
  return responseJson;
};
