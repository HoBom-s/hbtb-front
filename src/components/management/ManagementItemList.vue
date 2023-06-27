<template>
  <q-list
    class="rounded-borders"
    separator
    :style="{ overflowY: 'auto', height: '348px', maxHeight: '348px' }"
  >
    <q-item
      v-for="item of getItemListByItemKind"
      :key="item._id"
      clickable
      v-ripple
    >
      <ManagementItem :item="item" />
    </q-item>
  </q-list>
</template>

<script setup>
import { defineProps, computed } from "vue";

import ManagementItem from "./ManagementItem.vue";

const props = defineProps({
  itemKind: {
    type: String,
    required: true,
  },

  categories: {
    type: Array,
    required: true,
  },

  tags: {
    type: Array,
    required: true,
  },
});

const getItemListByItemKind = computed(() => {
  const itemObject = {};
  itemObject.categories = props.categories;
  itemObject.tags = props.tags;
  return itemObject[props.itemKind];
});
</script>
