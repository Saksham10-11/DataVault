import { AIChatSession } from "../Models/index.js";

const generateAIResponse = async (req, res) => {
  const initialString = "Description : ";
  const PROMPT =
    ', On the basis of the given description generate the form in json format with the format as follows do not change the name of any json variables and neither add new \n{"form":{"title":"Untitled Form","description":"","data":[{"id":"aa2da695-96bf-40f0-af4e-e42e7faef354","value":null,"type":"textarea","required":false},{"id":"9939c8e9-83b3-4c25-a4c5-8db574637231","value":null,"type":"text","required":false},{"id":"202603ed-ae02-4c79-8d34-cfc6e903aafd","value":null,"type":"number","required":false},{"id":"9635e930-d611-4ab0-a33d-9f69897e6782","value":null,"type":"radio","required":false,"options":[{"value":"","id":"1ced9e53-3d62-494f-a13a-be72416b1914"},{"value":"","id":"62cb9a14-e40c-4bba-8350-c5b280e554ef"},{"value":"","id":"10c7e522-1cfd-4f5b-954d-b4ac20d2c7c2"}]},{"id":"94c4f131-bcf5-4214-ac57-3e34565d26ae","value":null,"type":"checkBox","required":false,"options":[{"value":"","id":"4423187b-0100-4d40-8c7c-862270b21a3a"},{"value":"","id":"e3b09442-5b91-4a42-9ca5-0c8fb3efe132"}]},{"id":"3bfa8a58-2c72-4086-a1f3-b515aacf202e","value":null,"type":"date","required":false},{"id":"ba790369-4aea-4865-9225-0b97d0038e03","value":null,"type":"time","required":false}],"formData":"text"}}\n here value corresponde to the label given to the question .Its upto you which labels you want to include but do make sure that the id for each should be unique (you can generate one yourself), how many options you want  to keep for radio or checkboxes and weather to make a particular question required or not , but make sure eacj form has a title and a description and at least 4 questions ';
  const response = await AIChatSession.sendMessage(
    initialString + req.message + PROMPT
  );
  res.json(response);
};

export default generateAIResponse;
