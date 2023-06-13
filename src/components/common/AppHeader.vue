<template>
  <div>
    <q-toolbar>
      <q-btn flat label="HBTB" :style="logoStyle" />
      <q-space />
      <CategoryItemList
        :categories="props.categories"
        @onCategoryItemClickEvent="onCategoryItemClickEvent"
      />
    </q-toolbar>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

import CategoryItemList from "../categories/CategoryItemList.vue";

import palette from "@/utils/palette";

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits({
  onCategoryItemClickEvent: () => true,
});

const logoStyle = computed(() => {
  return {
    fontSize: palette.fontSize.l,
    fontWeight: palette.fontWeight.bold,
  };
});

// Methods
function onCategoryItemClickEvent(clickedCategory) {
  emits("onCategoryItemClickEvent", clickedCategory);
}
</script>
