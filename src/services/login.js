const login = async (loginData) => {
  const response = await fetch(`https://${process.env.REACT_APP_BACK_ENV}.herokuapp.com/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  const responseJson = await response.json();
  return responseJson;
};

export default login;
