<template>
  <q-card class="bg-transparent no-shadow no-border" bordered>
    <q-card-section class="q-pa-none">
      <div class="row q-col-gutter-sm">
        <div
          v-for="(item, index) in props.cardItems"
          :key="index"
          class="col-md-3 col-sm-12 col-xs-12"
        >
          <q-item
            :style="`background-color: ${item.bgColor}`"
            class="q-pa-none"
          >
            <q-item-section
              v-if="props.iconPosition === 'left'"
              side
              :style="`background-color: ${item.iconColor}`"
              class="q-pa-lg q-mr-none text-white"
            >
              <q-icon :name="item.icon" color="white" size="24px" />
            </q-item-section>
            <q-item-section class="q-pa-md q-ml-none text-white">
              <q-item-label class="text-white text-h6 text-weight-bolder">{{
                item.value
              }}</q-item-label>
              <q-item-label>{{ item.title }}</q-item-label>
            </q-item-section>
            <q-item-section
              v-if="props.iconPosition === 'right'"
              side
              class="q-mr-md text-white"
            >
              <q-icon :name="item.icon" color="white" size="44px" />
            </q-item-section>
          </q-item>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { defineProps } from "vue";

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
