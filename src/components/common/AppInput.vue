<template>
  <q-input
    outlined
    :class="inputMarginStyle"
    :type="props.inputType"
    :label="props.inputLabel"
    :name="props.inputName"
    @update:modelValue="onInputValueChangeEvent"
  />
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  inputType: {
    type: String,
    required: true,
  },

  inputLabel: {
    type: String,
    required: true,
  },

  inputName: {
    type: String,
    required: true,
  },

  isMarginTop: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits({
  onInputValueChangeEvent: () => true,
});

const inputMarginStyle = computed(() => {
  return props.isMarginTop ? "q-mt-md" : "";
});

// Methods
function onInputValueChangeEvent(value) {
  emits("onInputValueChangeEvent", props.inputName, value);
}
</script>
