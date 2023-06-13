<template>
  <q-layout view="hHh lpR fFf">
    <AppHeader
      :categories="state.categories"
      :selectedCategory="state.selectedCategory"
      @onCategoryItemClickEvent="onCategoryItemClickEvent"
    />
    <div :style="mainContainerStyle"><router-view /></div>
    <AppFooter />
  </q-layout>
</template>

<script setup>
import { reactive, onMounted, computed } from "vue";

import AppHeader from "../components/common/AppHeader.vue";
import AppFooter from "../components/common/AppFooter.vue";

import { getAllCategoryRequestService } from "@/apis/categoryFetcher";

import { agent } from "@/types";

import namespace from "@/static/name";

const state = reactive({
  categories: [],

  selectedCategory: {},
});

onMounted(async () => {
  const categories = await getAllCategoryRequestService();
  const categoryInstanceArray = categories.map((cat) => {
    const { _id, title, path, sortIndex, spot, createdAt, updatedAt } = cat;
    const catObj = agent
      .instanceOfName(namespace.categorySchema)
      .createInstance(_id, title, path, sortIndex, spot, createdAt, updatedAt);
    return catObj;
  });
  if (categoryInstanceArray.every((cat) => cat.ofPathCondition(cat.path))) {
    state.categories = categoryInstanceArray;
    state.selectedCategory = categoryInstanceArray[0];
  } else {
    state.categories = [];
  }
});

const mainContainerStyle = computed(() => {
  return {
    width: "1200px",
    height: "100%",
    margin: "100px auto",
  };
});

// Methods
function onCategoryItemClickEvent(clickedCategory) {
  state.selectedCategory = clickedCategory;
}
</script>
