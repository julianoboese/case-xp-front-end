const register = async (registerData) => {
  const response = await fetch(`https://${process.env.BACK_ENV}.herokuapp.com/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerData),
  });

  const responseJson = await response.json();
  return responseJson;
};

export default register;
