export const getBalance = async () => {
  const token = sessionStorage.getItem('token');
  const response = await fetch('https://case-xp-back-end.herokuapp.com/account', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (response.status >= 400) return { error: { status: response.status } };

  const responseJson = await response.json();
  return responseJson;
};

export const deposit = async (amount) => {
  const token = sessionStorage.getItem('token');
  const response = await fetch(
    'https://case-xp-back-end.herokuapp.com/account/deposit',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(amount),
    },
  );

  if (response.status >= 400) return { error: { status: response.status } };

  const responseJson = await response.json();
  return responseJson;
};

export const withdraw = async (amount) => {
  const token = sessionStorage.getItem('token');
  const response = await fetch(
    'https://case-xp-back-end.herokuapp.com/account/withdraw',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(amount),
    },
  );

  if (response.status >= 400) return { error: { status: response.status } };

  const responseJson = await response.json();
  return responseJson;
};
