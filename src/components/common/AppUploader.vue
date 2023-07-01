<template>
  <div :class="uploaderMarginStyle">
    <q-uploader
      color="teal"
      flat
      bordered
      :style="{ width: 'inherit' }"
      :label="props.uploadLabel"
      @added="onUploadButtonClickEvent"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  isMarginTop: {
    type: Boolean,
    required: true,
  },

  uploadLabel: {
    type: String,
    required: true,
  },
});

const emits = defineEmits({
  // No validation
  onUploadButtonClickEvent: () => true,
});

const uploaderMarginStyle = computed(() => {
  return props.isMarginTop ? "q-mt-md" : "";
});

// Methods
function onUploadButtonClickEvent(e) {
  const file = e[0];
  emits("onUploadButtonClickEvent", file.name);
}
</script>
