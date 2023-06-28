<template>
  <q-input
    outlined
    :class="inputMarginStyle"
    :type="props.inputType"
    :label="props.inputLabel"
    :name="props.inputName"
    :modelValue="props.inputValue"
    :error="getValidateHasErrorValue"
    :errorMessage="getValidateErrorMessageValue"
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

  inputValue: {
    type: [String, Number],
    required: true,
  },

  isMarginTop: {
    type: Boolean,
    required: true,
  },

  validateFormValue: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits({
  // No validation
  onInputValueChangeEvent: () => true,
});

const inputMarginStyle = computed(() => {
  return props.isMarginTop ? "q-mt-md" : "";
});

const getValidateHasErrorValue = computed(() => {
  const isValid = props.validateFormValue.hasError;
  return isValid;
});

const getValidateErrorMessageValue = computed(() => {
  const message = props.validateFormValue.msg;
  return message;
});

// Methods
function onInputValueChangeEvent(value) {
  emits("onInputValueChangeEvent", props.inputName, value);
}
</script>
