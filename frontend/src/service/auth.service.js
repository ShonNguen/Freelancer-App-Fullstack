import axios from 'axios';

const API_URL = 'users/';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const signUp = async (user) => {
  // const header = {
  //   headers: {

  //   }
  // }

  const response = await axios.post(API_URL + 'signup', user);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data;
};

const login = async (username, password) => {
  const response = await axios.post(API_URL + 'login', { username, password });

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  signUp,
  login,
  logout,
};

export default authService;