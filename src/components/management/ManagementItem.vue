<template>
  <q-slide-item
    class="fit"
    leftColor="orange"
    rightColor="red"
    @left="onItemSlideLeftEvent($event, props.item)"
    @right="onItemSlideRightEvent($event, props.item._id)"
  >
    <template v-slot:left>
      <q-icon name="edit" />
    </template>
    <template v-slot:right>
      <q-icon name="remove" />
    </template>
    <q-item-section>
      <q-item-label lines="1" :style="{ fontWeight: palette.fontWeight.bold }">
        {{ props.item.title }}
      </q-item-label>
      <q-item-label caption lines="2">
        <strong>PATH : </strong> {{ props.item.path }}
      </q-item-label>
      <q-item-label caption lines="3">
        <strong>CREATEAT : </strong>
        {{ props.item.createdAt.split("T")[0] }}
      </q-item-label>
    </q-item-section>
  </q-slide-item>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

import palette from "@/utils/palette";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits({
  // No validation
  onItemSlideLeftEvent: () => true,

  onItemSlideRightEvent: () => true,
});

function onItemSlideLeftEvent(e, item) {
  emits("onItemSlideLeftEvent", e, item);
}

function onItemSlideRightEvent(e, _id) {
  emits("onItemSlideRightEvent", e, _id);
}
</script>
