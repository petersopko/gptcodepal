// apiService.js
import axios from "axios";

export async function postCompletionStream(
  messages,
  temperature,
  apiKey,
  onProgress,
  cancelTokenSource
) {
  const url = "https://api.openai.com/v1/chat/completions";

  try {
    const result = await axios.post(
      url,
      {
        model: "gpt-4",
        messages,
        temperature,
        stream: true, // Add the stream parameter here
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },

        onDownloadProgress: (progressEvent) => {
          onProgress(progressEvent.event.currentTarget.responseText);
        },
        cancelToken: cancelTokenSource.token,
      }
    );
    return result;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
    } else {
      throw error;
    }
  }
}
