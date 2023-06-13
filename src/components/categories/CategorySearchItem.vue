<template>
  <q-btn
    flat
    round
    dense
    color="white"
    icon="search"
    class="q-mr-xs"
    @click="onSearchItemClickEvent"
  />
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  isSearchItemClick: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits({
  onSearchItemClickEvent: () => true,
});

// Methods
function onSearchItemClickEvent() {
  emits("onSearchItemClickEvent", props.isSearchItemClick);
}
</script>
