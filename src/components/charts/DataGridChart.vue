<template>
  <div class="q-mt-md">
    <q-table
      bordered
      seperator="cell"
      rowKey="name"
      :title="props.title"
      :columns="props.columns"
      :rows="props.rows"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  columns: {
    type: Array,
    required: true,
  },

  rows: {
    type: Array,
    required: true,
  },
});
</script>
