<template>
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
</template>

<script setup>
import { defineProps } from "vue";

import palette from "@/utils/palette";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
