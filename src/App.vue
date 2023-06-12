<template>
  <!-- <router-view /> -->
  <div>
    <TagItemList :tags="state.tags" />
    <CategoryItemList :categories="state.categories" />
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";

import TagItemList from "./components/tags/TagItemList.vue";
import CategoryItemList from "./components/categories/CategoryItemList.vue";

import { getAllTagRequestService } from "./apis/tagFetcher";
import { getAllCategoryRequestService } from "./apis/categoryFetcher";

import { agent } from "./types";

import namespace from "./static/name";

const state = reactive({
  tags: [],

  categories: [],
});

onMounted(async () => {
  const tags = await getAllTagRequestService();
  const tagInstanceArray = tags.map((tag) => {
    const { _id, title, path, createdAt, count } = tag;
    const tagObj = agent
      .instanceOfName(namespace.tagSchema)
      .createInstance(_id, title, path, count, createdAt);
    return tagObj;
  });
  if (tagInstanceArray.every((tag) => tag.ofPathCondition(tag.path))) {
    state.tags = tagInstanceArray;
  } else {
    state.tags = [];
  }

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
  } else {
    state.categories = [];
  }
});
</script>
