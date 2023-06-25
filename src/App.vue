<template>
  <ErrorBoundary :stopPropagation="false" :fallback="ErrorDefaultFallback">
    <router-view />
  </ErrorBoundary>
</template>

<script setup>
import ErrorBoundary from "./components/error/ErrorBoundary.vue";
import ErrorDefaultFallback from "./components/error/ErrorDefaultFallback.vue";
</script>
