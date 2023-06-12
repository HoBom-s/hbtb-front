<template>
  <div>
    <CategoryItem
      v-for="category of props.categories"
      :key="category._id"
      :category="category"
      @onCategoryItemClickEvent="onCategoryItemClickEvent"
    />
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";

import CategoryItem from "./CategoryItem.vue";

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits({
  onCategoryItemClickEvent: () => true,
});

function onCategoryItemClickEvent(clickedCategory) {
  emits("onCategoryItemClickEvent", clickedCategory);
}
</script>
