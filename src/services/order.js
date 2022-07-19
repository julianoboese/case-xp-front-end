export const buyAsset = async (assetId, amount, price) => {
  const token = sessionStorage.getItem('token');
  const response = await fetch(
    'https://case-xp-back-end.herokuapp.com/order/buy',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ assetId, amount, price }),
    },
  );

  if (response.status >= 400) return { error: { status: response.status } };

  const responseJson = await response.json();
  return responseJson;
};

export const sellAsset = async (assetId, amount, price) => {
  const token = sessionStorage.getItem('token');
  const response = await fetch(
    'https://case-xp-back-end.herokuapp.com/order/sell',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ assetId, amount, price }),
    },
  );

  if (response.status >= 400) return { error: { status: response.status } };

  const responseJson = await response.json();
  return responseJson;
};
