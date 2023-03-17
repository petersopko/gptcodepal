<template>
    <div class="tabs">
        <div v-for="(tab, index) in tabs" :key="index" class="tab" :class="{ active: activeTab === index }">
            <span class="tab-name" @click.stop="setActiveTab(index)">{{ index }}</span>
            <span v-if="tabs.length > 1" class="delete-tab" @click.stop="deleteTab(index)">&#10005;</span>
        </div>
        <div class="tab add-tab" @click="addTab">
            <span class="plus-sign">+</span>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        tabs: Array,
        activeTab: Number,
    },
    methods: {
        setActiveTab(index) {
            this.$emit("update:activeTab", index);
        },
        addTab() {
            this.$emit("add-tab");
        },
        deleteTab(index) {
            this.$emit("delete-tab", index);
        },
    },
};
</script>

<style scoped>
.tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.tab,
.add-tab {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 0;
    cursor: pointer;
    min-width: 80px;
}

.tab.active,
.add-tab:hover {
    background-color: #ccc;
}

.tab-name {
    margin-right: 10px;
    min-width: 50px;
}

.delete-tab {
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 0;
    padding: 2px 5px;
}

.plus-sign {
    font-size: 20px;
    font-weight: bold;
    margin: 0 auto;
}
</style>