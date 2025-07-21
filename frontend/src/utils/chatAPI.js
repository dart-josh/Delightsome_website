import axios from "axios";

// eslint-disable-next-line no-undef
const dev_mode = process.env.NODE_ENV === "development";

const server_prefix = dev_mode ? "http://localhost:5000/api" : "/api";

export const sendToGPT = async (userMessage) => {
  try {
    const response = await axios.post(`${server_prefix}/user/handler`, {
      message: userMessage,
    });
    return response.data.reply;
  } catch (err) {
    console.error("GPT Error:", err);
    return "Sorry, something went wrong!";
  }
};
