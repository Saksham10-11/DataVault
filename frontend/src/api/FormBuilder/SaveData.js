import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL + 'forms/';

function saveData(data) {
  axios
    .post(url, data, { withCredentials: true })
    .then((response) => console.log('Data sent successfully:', response))
    .catch((error) => console.error('Error sending data:', error));
}

export default saveData;
