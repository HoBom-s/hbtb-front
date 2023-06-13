<template>
  <div :style="categoriesStyle">
    <CategoryItem
      v-for="category of filteredCategoryList"
      :key="category._id"
      :category="category"
      :selectedCategory="props.selectedCategory"
      @onCategoryItemClickEvent="onCategoryItemClickEvent"
    />
    <CategorySearchItem
      :isSearchItemClick="props.isSearchItemClick"
      @onSearchItemClickEvent="onSearchItemClickEvent"
    />
  </div>
</template>
<script setup>
import { defineProps, defineEmits, computed } from "vue";

import CategoryItem from "./CategoryItem.vue";
import CategorySearchItem from "./CategorySearchItem.vue";

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },

  selectedCategory: {
    type: Object,
    required: true,
  },

  isSearchItemClick: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits({
  onCategoryItemClickEvent: () => true,
  onSearchItemClickEvent: () => true,
});

const filteredCategoryList = computed(() => {
  const filtered = props.categories.filter((cat) => cat.spot === "H");
  return filtered;
});

const categoriesStyle = computed(() => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  };
});

// Methods
function onCategoryItemClickEvent(clickedCategory) {
  emits("onCategoryItemClickEvent", clickedCategory);
}

function onSearchItemClickEvent(isSearchItemClick) {
  emits("onSearchItemClickEvent", isSearchItemClick);
}
</script>
