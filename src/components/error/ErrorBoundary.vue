<template>
  <div>
    <component v-if="state.isError" :is="props.fallback" />
    <slot v-else></slot>
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
  fallback: {
    type: Object,
    default: ErrorDefaultFallback,
  },

  stopPropagation: {
    type: Boolean,
    required: true,
  },
});

onErrorCaptured((error, _, info) => {
  state.isError = error;

  state.info = info;

  // Browser에 오류를 전파할 것인지
  // return false이면 Browser console에서 확인 불가능
  if (props.stopPropagation) return false;
  // return true이면 브라우저에서 감지 가능
  return true;
});
</script>
