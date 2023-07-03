<template>
  <div :style="tagBoxStyle" @click="onTagItemClickEvent(props.tag)">
    <q-chip :style="tagStyle">
      {{ props.tag.title }}
    </q-chip>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, computed } from "vue";

import palette from "../../utils/palette";

const props = defineProps({
  tag: {
    type: Object,
    required: true,
  },

  selectedTag: {
    type: Array,
    required: false,
  },
});

const emits = defineEmits({
  // No validation
  onTagItemClickEvent: () => true,
});

// Computed
const isSelected = computed(() => {
  if (!props.selectedTag) return false;
  const found = props.selectedTag.find((tag) => tag._id === props.tag._id);
  if (found) return true;
  return false;
});

const tagBoxStyle = computed(() => {
  return {
    display: "inline-block",
  };
});

const tagStyle = computed(() => {
  return {
    background: isSelected.value
      ? `${palette.colors.mainOrange} !important`
      : `${palette.colors.chipGray} !important`,
    color: isSelected.value ? palette.colors.mainWhite : "black",
    fontWeight: isSelected.value
      ? palette.fontWeight.bold
      : palette.fontWeight.regular,
    cursor: "pointer",
  };
});

// Methods
function onTagItemClickEvent(clickedTag) {
  emits("onTagItemClickEvent", clickedTag);
}
</script>
