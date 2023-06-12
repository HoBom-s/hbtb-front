<template>
  <div>
    <q-chip color="blue-grey-3" @click="onTagItemClickEvent(props.tag)">
      {{ props.tag.title }}
    </q-chip>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  tag: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits({
  onTagItemClickEvent: () => true,
});

// Methods
function onTagItemClickEvent(clickedTag) {
  emits("onTagItemClickEvent", clickedTag);
}
</script>
