<template>
  <CardArticle v-for="item of props.cardItems" :key="item._id" :item="item" />
</template>

<script setup>
import { defineProps } from "vue";

import CardArticle from "./CardArticle.vue";

const props = defineProps({
  cardItems: {
    type: Array,
    required: true,
  },
});
</script>
