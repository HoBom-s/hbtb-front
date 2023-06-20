<template>
  <q-item
    :style="`background-color: ${props.cardItem.bgColor}`"
    class="q-pa-none"
  >
    <q-item-section
      v-if="props.iconPosition === 'left'"
      side
      :style="`background-color: ${cardItem.iconColor}`"
      class="q-pa-lg q-mr-none text-white"
    >
      <q-icon :name="cardItem.icon" color="white" size="24px" />
    </q-item-section>
    <q-item-section class="q-pa-md q-ml-none text-white">
      <q-item-label class="text-white text-h6 text-weight-bolder">{{
        cardItem.value
      }}</q-item-label>
      <q-item-label>{{ cardItem.title }}</q-item-label>
    </q-item-section>
    <q-item-section
      v-if="props.iconPosition === 'right'"
      side
      class="q-mr-md text-white"
    >
      <q-icon :name="cardItem.icon" color="white" size="44px" />
    </q-item-section>
  </q-item>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  iconPosition: {
    type: String,
    required: true,
  },

  cardItem: {
    type: Object,
    required: true,
  },
});
</script>
