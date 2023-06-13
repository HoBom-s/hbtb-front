<template>
  <div>
    <TagItemList :tags="state.tags" />
    <TagItemList :tags="state.tags" />
    <TagItemList :tags="state.tags" />
    <TagItemList :tags="state.tags" />
    <TagItemList :tags="state.tags" />
    <TagItemList :tags="state.tags" />
    <TagItemList :tags="state.tags" />
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";

import TagItemList from "@/components/tags/TagItemList.vue";

import { getAllTagRequestService } from "@/apis/tagFetcher";

import { agent } from "@/types";

import namespace from "@/static/name";

const state = reactive({
  tags: [],
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
});
</script>
