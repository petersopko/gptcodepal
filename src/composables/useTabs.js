import { ref, reactive, watch } from "vue";

export default function useTabs(apiKey) {
  const descriptionRef = ref("");
  const saveApiKey = (key) => {
    localStorage.setItem("openai_api_key", key);
    apiKey.value = key;
  };

  const tabs = reactive(
    JSON.parse(
      localStorage.getItem("tabsStore") ||
        '[{ "description": "", "response": "", "codeInputs": [] }]'
    )
  );
  const activeTabIndex = ref(0);

  function updateActiveTab(index) {
    activeTabIndex.value = index;
    descriptionRef.value = tabs[index].description;
    response.value = tabs[index].response;
    codeInputs.value = tabs[index].codeInputs;
  }

  function addTab() {
    tabs.push({ description: "", response: "", codeInputs: [] });
    updateActiveTab(tabs.length - 1);
    localStorage.setItem("tabsStore", JSON.stringify(tabs));
  }

  function deleteTab(index) {
    tabs.splice(index, 1);
    activeTabIndex.value = Math.min(activeTabIndex.value, tabs.length - 1);
    localStorage.setItem("tabsStore", JSON.stringify(tabs));
    updateActiveTab(activeTabIndex.value);
  }

  // Watchers
  watch(descriptionRef, (newDescription) => {
    tabs[activeTabIndex.value].description = newDescription;
  });

  watch(
    () => [descriptionRef.value, codeInputs.value],
    ([newDescription, newCodeInputs]) => {
      tabs[activeTabIndex.value].description = newDescription;
      tabs[activeTabIndex.value].codeInputs = newCodeInputs;
      localStorage.setItem("tabsStore", JSON.stringify(tabs));
    },
    { deep: true }
  );

  watch(
    () => response.value,
    (newResponse) => {
      tabs[activeTabIndex.value].response = newResponse;
      localStorage.setItem("tabsStore", JSON.stringify(tabs));
    }
  );

  return {
    descriptionRef,
    saveApiKey,
    tabs,
    activeTabIndex,
    updateActiveTab,
    addTab,
    deleteTab,
  };
}
