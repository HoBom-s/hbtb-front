<template>
  <div>
    <slot v-if="state.isError"></slot>
    <component v-else :is="props.fallback" />
  </div>
</template>

<script setup>
import { reactive, defineProps, onErrorCaptured } from "vue";

import ErrorDefaultFallback from "@/components/error/ErrorDefaultFallback.vue";

const state = reactive({
  isError: false,

  info: null,
});

const props = defineProps({
  fallback: ErrorDefaultFallback,

  stopPropagation: {
    type: Boolean,
    required: true,
  },
});

onErrorCaptured((error, _, info) => {
  state.isError = error;

  state.info = info;

  // Error를 상위 컴포넌트로 Propagation 할 것인지?
  if (props.stopPropagation) return false;
});
</script>
