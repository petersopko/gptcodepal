// apiService.js
import axios from "axios";

export async function postCompletion(messages, temperature, maxTokens, apiKey) {
  const url = "https://api.openai.com/v1/chat/completions";
  try {
    const result = await axios.post(
      url,
      {
        model: "gpt-4",
        messages,
        temperature,
        max_tokens: maxTokens,
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
