<template>
  <q-btn
    flat
    :label="props.item"
    :style="isSelectedButton"
    @click="onPageNumberButtonClickEvent(props.item)"
  />
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

import palette from "@/utils/palette";

const props = defineProps({
  curPageNumber: {
    type: Number,
    required: true,
  },

  item: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits({
  // No validation
  onPageNumberButtonClickEvent: () => true,
});

const isSelectedButton = computed(() => {
  if (props.curPageNumber === props.item) {
    return {
      border: `1px solid ${palette.colors.mainBlack}`,
      fontWeight: palette.fontWeight.bold,
    };
  }
  return {};
});

// Methods
function onPageNumberButtonClickEvent(clickedPageNumber) {
  emits("onPageNumberButtonClickEvent", clickedPageNumber);
}
</script>
