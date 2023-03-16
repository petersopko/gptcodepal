<template>
    <div class="prompt-container">
        <div class="loading-spinner" v-show="loading"></div>
        <div class="token-counter">Estimated PROMPT token usage: {{ tokenCount }}</div>
        <div class="token-counter">Real PROMPT token usage: {{ actualTokens }}</div>
        <textarea v-model="prompt" placeholder="Enter your prompt" rows="5" class="prompt-textarea"></textarea>
        <button class="submit-button" @click="submitPrompt">Submit</button>
        <div class="response-area">
            <div class="token-counter">Real RESPONSE token usage: {{ responseTokens }}</div>
            <div class="response-title">Response:</div>
            <div class="response">{{ response }}</div>
        </div>
    </div>
</template>

<script>
// Import Axios
import axios from "axios";

export default {
    data() {
        return {
            prompt: "",
            response: "",
            tokenCount: 0,
            actualTokens: 0,
            responseTokens: 0,
            loading: false
        };
    },
    methods: {
        async submitPrompt() {
            if (!this.prompt) return;
            this.loading = true;


            const apiKey = process.env.OPENAI_API_KEY;
            const url = "https://api.openai.com/v1/chat/completions";

            try {
                const result = await axios.post(
                    url,
                    {
                        model: "gpt-4",
                        messages: [
                            {
                                role: "user",
                                content: this.prompt
                            }
                        ],
                        temperature: 0.7
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${apiKey}`
                        }
                    }
                );
                this.loading = false;
                this.response = result.data.choices[0].message.content.trim();
                this.actualTokens = result.data.usage.prompt_tokens;
                this.responseTokens = result.data.usage.completion_tokens;
            } catch (error) {
                console.error("Error:", error);
                this.response = "An error occurred while fetching the response.";
            }
        },
        async fetchTokenCount() {
            try {
                const response = await axios.post("http://localhost:5000/count_tokens", {
                    text: this.prompt
                });
                return response.data.token_count;
            } catch (error) {
                console.error("Error fetching token count:", error);
                return 0;
            }
        },
    },
    watch: {
        async prompt() {
            this.tokenCount = await this.fetchTokenCount();
        }
    },
}
</script>
<style scoped>
.prompt-textarea {
    width: 90%;
    max-width: 800px;
    min-height: 100px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    box-sizing: border-box;
    margin-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
}

.prompt-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.token-counter {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
}

.submit-button {
    background-color: #008cba;
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    padding: 10px 24px;
    margin-top: 10px;
    cursor: pointer;
    border-radius: 4px;
}

.submit-button:hover {
    background-color: #0073a8;
}

.response-area {
    background-color: #f0f0f0;
    border-radius: 4px;
    padding: 20px;
    margin-top: 20px;
    width: 90%;
    max-width: 800px;
    box-sizing: border-box;
}

.response-title {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
}

.response {
    white-space: pre-wrap;
    font-size: 16px;
}

.loading-spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border-top-color: #008cba;
    animation: spin 1s linear infinite;
    margin-top: 10px;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>