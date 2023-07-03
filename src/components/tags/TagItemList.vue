<template>
  <TagItem
    v-for="tag of props.tags"
    :key="tag._id"
    :tag="tag"
    :selectedTag="props.selectedTag"
    @onTagItemClickEvent="onTagItemClickEvent"
  />
</template>
<script setup>
import { defineProps, defineEmits } from "vue";

import TagItem from "./TagItem.vue";

const props = defineProps({
  tags: {
    type: Array,
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

// Methods
function onTagItemClickEvent(clickedTag) {
  emits("onTagItemClickEvent", clickedTag);
}
</script>
