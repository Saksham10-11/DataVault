import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL + 'auth/login';

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      url,
      { email, password },
      {
        withCredentials: true, // This will send the cookies
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data; // return response to handle it later
  } catch (error) {
    console.error('Login failed:', error.response?.data?.message || error.message);
    throw error; // Pass error to calling function
  }
};

export default loginUser;
