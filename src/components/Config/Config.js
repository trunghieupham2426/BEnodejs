export const config = () => {
  let userData = localStorage.getItem('appState');
  userData = JSON.parse(userData);
  let accessToken = userData.user.auth_token;
  let config = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  };
  return config;
};
