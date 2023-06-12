<template>
  <div>
    <TagItem
      v-for="tag of props.tags"
      :key="tag._id"
      :tag="tag"
      @onTagItemClickEvent="onTagItemClickEvent"
    />
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";

import TagItem from "./TagItem.vue";

const props = defineProps({
  tags: {
    type: Array,
    required: true,
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
