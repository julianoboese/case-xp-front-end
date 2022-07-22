export const buyAsset = async (assetId, quantity, price) => {
  const token = sessionStorage.getItem('token');
  const response = await fetch(
    `https://${process.env.REACT_APP_BACK_ENV}.herokuapp.com/order/buy`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ assetId, quantity, price }),
    },
  );

  const responseJson = await response.json();

  if (response.status >= 400) {
    return {
      status: response.status,
      message: responseJson.message,
    };
  }

  return responseJson;
};

export const sellAsset = async (assetId, quantity, price) => {
  const token = sessionStorage.getItem('token');
  const response = await fetch(
    `https://${process.env.REACT_APP_BACK_ENV}.herokuapp.com/order/sell`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ assetId, quantity, price }),
    },
  );

  const responseJson = await response.json();

  if (response.status >= 400) {
    return {
      status: response.status,
      message: responseJson.message,
    };
  }

  return responseJson;
};
