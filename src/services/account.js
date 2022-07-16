export const getBalance = async () => {
  const token = sessionStorage.getItem('token');
  const response = await fetch('https://case-xp-back-end.herokuapp.com/conta', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  const responseJson = await response.json();
  return responseJson;
};

export const deposit = async (amount) => {
  const token = sessionStorage.getItem('token');
  const response = await fetch(
    'https://case-xp-back-end.herokuapp.com/conta/deposito',
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
  return responseJson;
};

export const withdraw = async (amount) => {
  const token = sessionStorage.getItem('token');
  const response = await fetch(
    'https://case-xp-back-end.herokuapp.com/conta/saque',
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
  return responseJson;
};
