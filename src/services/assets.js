export const getAllAssets = async () => {
  const token = sessionStorage.getItem('token');
  const response = await fetch('https://case-xp-back-end.herokuapp.com/assets/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (response.status >= 400) return { status: response.status };

  const responseJson = await response.json();
  return responseJson;
};

export const getAssets = async () => {
  const token = sessionStorage.getItem('token');
  const response = await fetch('https://case-xp-back-end.herokuapp.com/assets', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (response.status >= 400) return { status: response.status };

  const responseJson = await response.json();
  return responseJson;
};

export const getAsset = async (assetId) => {
  const token = sessionStorage.getItem('token');
  const response = await fetch(`https://case-xp-back-end.herokuapp.com/assets/${assetId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (response.status >= 400) return { status: response.status };

  const responseJson = await response.json();
  return responseJson;
};
