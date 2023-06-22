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
});

const emits = defineEmits({
  // No validation
  onTagItemClickEvent: () => true,
});

// Computed
const tagBoxStyle = computed(() => {
  return {
    display: "inline-block",
  };
});

const tagStyle = computed(() => {
  return {
    background: `${palette.colors.chipGray} !important`,
    cursor: "pointer",
  };
});

// Methods
function onTagItemClickEvent(clickedTag) {
  emits("onTagItemClickEvent", clickedTag);
}
</script>
