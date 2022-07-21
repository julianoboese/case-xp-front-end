export const getAllAssets = async () => {
  const token = sessionStorage.getItem('token');
  const response = await fetch(`https://${process.env.REACT_APP_BACK_ENV}.herokuapp.com/assets/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  const responseJson = await response.json();

  if (response.status >= 400) {
    return {
      status: response.status,
      message: responseJson.message,
    };
  }

  return responseJson;
};

export const getAssets = async () => {
  const token = sessionStorage.getItem('token');
  const response = await fetch(`https://${process.env.REACT_APP_BACK_ENV}.herokuapp.com/assets`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  const responseJson = await response.json();

  if (response.status >= 400) {
    return {
      status: response.status,
      message: responseJson.message,
    };
  }

  return responseJson;
};

export const getAsset = async (assetId) => {
  const token = sessionStorage.getItem('token');
  const response = await fetch(`https://${process.env.REACT_APP_BACK_ENV}.herokuapp.com/assets/${assetId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  const responseJson = await response.json();

  if (response.status >= 400) {
    return {
      status: response.status,
      message: responseJson.message,
    };
  }

  return responseJson;
};
