import axios from 'axios';

const API_URL = 'users/';

const signUp = async (user) => {

  const response = await axios.post(API_URL + 'signup', user);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

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