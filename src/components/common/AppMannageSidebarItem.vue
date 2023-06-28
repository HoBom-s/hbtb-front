<template>
  <q-item-section avatar>
    <q-icon :name="props.menuItem.iconName" />
  </q-item-section>
  <q-item-section @click="props.menuItem.onClick">
    <q-item-label>{{ props.menuItem.menuTitle }}</q-item-label>
  </q-item-section>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  menuItem: {
    type: Object,
    required: true,
  },
});
</script>
