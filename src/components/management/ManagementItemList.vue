<template>
  <q-list
    class="rounded-borders"
    separator
    :style="{ overflowY: 'auto', height: '348px', maxHeight: '348px' }"
  >
    <q-item v-for="item of getItemListByItemKind" :key="item._id" v-ripple>
      <ManagementItem
        :item="item"
        @onItemSlideLeftEvent="onItemSlideLeftEvent"
        @onItemSlideRightEvent="onItemSlideRightEvent"
      />
    </q-item>
  </q-list>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

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

const emits = defineEmits({
  // No validation
  onItemSlideLeftEvent: () => true,

  onItemSlideRightEvent: () => true,
});

const getItemListByItemKind = computed(() => {
  const itemObject = {};
  itemObject.categories = props.categories;
  itemObject.tags = props.tags;
  return itemObject[props.itemKind];
});

function onItemSlideLeftEvent(e, item) {
  emits("onItemSlideLeftEvent", e, item);
}

function onItemSlideRightEvent(e, _id) {
  emits("onItemSlideRightEvent", e, _id);
}
</script>
