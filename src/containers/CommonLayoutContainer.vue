<template>
  <q-layout>
    <AppHeader
      :categories="state.categories"
      :selectedCategory="state.selectedCategory"
      @onCategoryItemClickEvent="onCategoryItemClickEvent"
    />
    <div :style="mainContainerStyle"><slot></slot></div>
    <AppFooter />
  </q-layout>
</template>

<script setup>
/**
 * Header와 Footer를 달고 있어야 하는 컴포넌트는
 * CommonLayoutContainer로 꼭 감싸주도록 한다.
 */

import { reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

import AppHeader from "../components/common/AppHeader.vue";
import AppFooter from "../components/common/AppFooter.vue";

import { getAllCategoryRequestService } from "@/apis/categoryFetcher";

import { agent } from "@/types";

import namespace from "@/static/name";

const router = useRouter();

const state = reactive({
  categories: [],

  selectedCategory: {},
});

onMounted(async () => {
  const categories = await getAllCategoryRequestService();
  const categoryInstanceArray = categories
    .map((cat) => {
      const { _id, title, path, sortIndex, spot, createdAt, updatedAt } = cat;
      const catObj = agent
        .instanceOfName(namespace.categorySchema)
        .createInstance(
          _id,
          title,
          path,
          sortIndex,
          spot,
          createdAt,
          updatedAt
        );
      return catObj;
    })
    .filter((cat) => cat.spot === "H");
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
  const path = clickedCategory.path;
  router.push(path);
}
</script>
