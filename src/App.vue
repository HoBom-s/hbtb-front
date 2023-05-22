<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
// import { getAllTagRequestService } from "./apis/tagFetcher";
// import { getAllCategoryRequestService } from "./apis/categoryFetcher";
import { agent } from "./types";

onMounted(async () => {
  // const tags = await getAllTagRequestService();
  // console.log(tags);
  // const categories = await getAllCategoryRequestService();
  // console.log(categories);
  console.log(agent.TagSchema);
});
</script>
