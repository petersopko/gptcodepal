// apiService.js
import axios from "axios";

export async function postCompletion(messages, temperature, apiKey) {
  const url = "https://api.openai.com/v1/chat/completions";
  try {
    const result = await axios.post(
      url,
      {
        model: "gpt-4",
        messages,
        temperature,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    return result;
  } catch (error) {
    throw error;
  }
}
