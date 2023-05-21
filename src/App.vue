<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { TagSchemaObject } from "./types";
import { getAllTagRequestService } from "./apis/tagFetcher";
import { getAllCategoryRequestService } from "./apis/categoryFetcher";

onMounted(async () => {
  const tags = await getAllTagRequestService();
  console.log(tags);
  const categories = await getAllCategoryRequestService();
  console.log(categories);
  console.log(TagSchemaObject);
});
</script>
