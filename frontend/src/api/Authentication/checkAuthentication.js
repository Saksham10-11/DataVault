import axios from 'axios';

// Construct the URL for the authentication check
const url = import.meta.env.VITE_BACKEND_URL + 'auth/check'; // Ensure the correct endpoint is used

const checkAuth = async () => {
  // return true;
  try {
    const response = await axios.get(url, {
      withCredentials: true, // Important for sending cookies/session
      headers: {
        // Include the JWT token if it is available
        Authorization: `Bearer ${localStorage.getItem('jwt')}` || ''
      }
    });

    // Return the authentication status from the response
    return response.data.isAuthenticated;
  } catch (error) {
    console.error('Error checking authentication', error);
    return false; // Return false on error
  }
};

export default checkAuth;
