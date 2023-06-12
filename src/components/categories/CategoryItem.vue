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
});

const emits = defineEmits({
  onCategoryItemClickEvent: () => true,
});

const categoryStyle = computed(() => {
  return {
    margin: "0 auto",
    fontSize: palette.fontSize.l,
    fontWeight: palette.fontWeight.bold,
    borderBottom: `3px solid ${palette.colors.mainOrange}`,
  };
});

function onCategoryItemClickEvent(clickedCategory) {
  emits("onCategoryItemClickEvent", clickedCategory);
}
</script>
