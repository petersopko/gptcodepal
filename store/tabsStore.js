import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTabsStore = defineStore("tabs", () => {
  const tabs = ref(
    JSON.parse(
      localStorage.getItem("tabs") ||
        '[{ "description": "", "response": "", "codeInputs": [] }]'
    )
  );
  const activeTabIndex = ref(0);

  const activeTab = computed(() => {
    return tabs.value[activeTabIndex.value];
  });

  function updateActiveTab(index) {
    activeTabIndex.value = index;
  }

  function addTab() {
    tabs.value.push({ description: "", response: "", codeInputs: [] });
    updateActiveTab(tabs.value.length - 1);
    localStorage.setItem("tabs", JSON.stringify(tabs.value));
  }

  function deleteTab(index) {
    tabs.value.splice(index, 1);
    activeTabIndex.value = Math.min(
      activeTabIndex.value,
      tabs.value.length - 1
    );
    localStorage.setItem("tabs", JSON.stringify(tabs.value));
    updateActiveTab(activeTabIndex.value);
  }

  function addCodeInput() {
    activeTab.value.codeInputs.push({ name: "", code: "" });
    localStorage.setItem("tabs", JSON.stringify(tabs.value));
  }

  function removeCodeInput(index) {
    activeTab.value.codeInputs.splice(index, 1);
    localStorage.setItem("tabs", JSON.stringify(tabs.value));
  }
  function updateCodeInput({ index, name, code }) {
    activeTab.value.codeInputs[index] = { name, code };
    localStorage.setItem("tabs", JSON.stringify(tabs.value));
  }

  function updateDescription(description) {
    activeTab.value.description = description;
    localStorage.setItem("tabs", JSON.stringify(tabs.value));
  }
  return {
    tabs,
    activeTabIndex,
    activeTab,
    updateActiveTab,
    addTab,
    deleteTab,
    addCodeInput,
    removeCodeInput,
    updateCodeInput,
    updateDescription,
  };
});
