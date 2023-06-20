<template>
  <q-card class="bg-transparent no-shadow no-border" bordered>
    <q-card-section class="q-pa-none">
      <div class="row q-col-gutter-sm">
        <div
          v-for="(cardItem, index) in props.cardItems"
          :key="index"
          class="col-md-3 col-sm-12 col-xs-12"
        >
          <CardManagement
            :iconPosition="props.iconPosition"
            :cardItem="cardItem"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { defineProps } from "vue";

import CardManagement from "@/components/cards/CardManagement.vue";

const props = defineProps({
  iconPosition: {
    type: String,
    required: true,
    default: "left",
  },

  cardItems: {
    type: Array,
    required: true,
  },
});
</script>
