<template>
  <q-select
    outlined
    :class="selectMarginStyle"
    :label="props.selectLabel"
    :options="props.options"
    :modelValue="props.modelValues"
    @update:modelValue="onSelectValueChangeEvent"
  />
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  selectLabel: {
    type: String,
    required: true,
  },

  options: {
    type: Array,
    required: true,
  },

  modelValues: {
    type: String,
    required: true,
  },

  isMarginTop: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits({
  // No validation
  onSelectValueChangeEvent: () => true,
});

const selectMarginStyle = computed(() => {
  return props.isMarginTop ? "q-mt-md" : "";
});

// Methods
function onSelectValueChangeEvent(value) {
  emits("onSelectValueChangeEvent", value);
}
</script>
