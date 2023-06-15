<template>
  <ErrorBoundary :stopPropagation="false">
    <router-view />
  </ErrorBoundary>
</template>

<script setup>
import ErrorBoundary from "./components/error/ErrorBoundary.vue";
</script>
