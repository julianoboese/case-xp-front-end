const getUser = async () => {
  const token = sessionStorage.getItem('token');
  const response = await fetch('https://case-xp-back-end.herokuapp.com/user', {
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

export default getUser;
