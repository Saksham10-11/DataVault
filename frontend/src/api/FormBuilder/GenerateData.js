import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL + 'genai/';

const sendMessage = async (message) => {
  try {
    const response = await axios.get(url, {
      params: {
        message: message
      }
    });
    const jsonString = response.data.response.candidates[0].content.parts[0].text;
    const parsedData = JSON.parse(jsonString);
    console.log(parsedData);
    console.log(parsedData.form);
    return parsedData.form;
  } catch (error) {
    console.error('Error sending message:', error);
    return { error: error.message };
  }
};

export default sendMessage;
