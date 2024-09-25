import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL + 'auth/register';

const registerUser = async (firstname, lastname, email, company, password) => {
  try {
    const response = await axios.post(
      url,
      { firstname, lastname, email, company, password },
      {
        withCredentials: true, // Send cookies if needed
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data; // return response to handle it later
  } catch (error) {
    console.error('Registration failed:', error.response?.data?.message || error.message);
    throw error; // Pass error to calling function
  }
};

export default registerUser;
