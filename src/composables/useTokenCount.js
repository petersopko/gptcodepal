import { ref, watch, onMounted } from "vue";

// Function to count tokens in a given text
function countTokens(text) {
  // Define a regex pattern to match tokens: spaces, word characters, or non-word and non-space characters
  const tokenRegex = /\s+|[\w]|[^\w\s]+/g;
  let tokens = text.match(tokenRegex);
  // Example: "Hello, world!" will be tokenized as ["Hello", ",", " ", "world", "!"]
  return tokens ? tokens.length : 0;
}

export default function useTokenCount(description, codeInputs) {
  const tokenCount = ref(0);

  // Function to fetch token count from description and codeInputs
  function fetchTokenCount() {
    // Build a string combining description and code inputs
    const text = `${description}${codeInputs
      .map((chunk) => `\n${chunk.name}\n\`\`\`${chunk.code}\`\`\``)
      .join("")}`;

    if (!text) {
      return 0;
    }

    // Count tokens in the combined text
    return countTokens(text);
  }

  // On component mounted, update the tokenCount with fetched token count
  onMounted(() => {
    tokenCount.value = fetchTokenCount();
  });

  // Watch for changes in description and codeInputs, update tokenCount accordingly
  watch(
    [description, codeInputs],
    () => {
      tokenCount.value = fetchTokenCount();
    },
    { deep: true }
  );

  return { tokenCount, fetchTokenCount };
}
