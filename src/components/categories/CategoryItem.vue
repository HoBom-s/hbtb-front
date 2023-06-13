<template>
  <div>
    <span
      :style="categoryStyle"
      @click="onCategoryItemClickEvent(props.category)"
    >
      {{ props.category.title }}
    </span>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, computed } from "vue";

import palette from "@/utils/palette";

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },

  selectedCategory: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits({
  onCategoryItemClickEvent: () => true,
});

const categoryStyle = computed(() => {
  return {
    margin: "0 auto",
    fontSize: palette.fontSize.l,
    fontWeight: palette.fontWeight.bold,
    color: palette.colors.mainWhite,
    borderBottom:
      props.selectedCategory._id === props.category._id
        ? `3px solid ${palette.colors.mainOrange}`
        : "",
    cursor: "pointer",
  };
});

function onCategoryItemClickEvent(clickedCategory) {
  emits("onCategoryItemClickEvent", clickedCategory);
}
</script>
