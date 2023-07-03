<template>
  <CardArticle
    v-for="item of props.cardItems"
    :key="item._id"
    :item="item"
    @onArticleCardItemClickEvent="onArticleCardItemClickEvent"
  />
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

import CardArticle from "./CardArticle.vue";

const props = defineProps({
  cardItems: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits({
  // No validation
  onArticleCardItemClickEvent: () => true,
});

function onArticleCardItemClickEvent(clickedArticle) {
  emits("onArticleCardItemClickEvent", clickedArticle);
}
</script>
