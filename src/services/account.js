export const getBalance = async () => {
  const token = sessionStorage.getItem('token');
  const response = await fetch('https://case-xp-back-end-development.herokuapp.com/account', {
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

export const deposit = async (amount) => {
  const token = sessionStorage.getItem('token');
  const response = await fetch(
    'https://case-xp-back-end-development.herokuapp.com/account/deposit',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(amount),
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

export const withdraw = async (amount) => {
  const token = sessionStorage.getItem('token');
  const response = await fetch(
    'https://case-xp-back-end-development.herokuapp.com/account/withdraw',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(amount),
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
