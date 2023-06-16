<template>
  <q-card class="no-shadow" bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar size="70px">
          <img :src="imgUrl" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ props.title }}</q-item-label>
        <q-item-label caption>
          {{ props.description }}
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-btn
          label="add"
          side="sm"
          class="bg-indigo-8 text-capitalize text-white"
        />
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  props: {
    imgUrl: {
      type: String,
      requird: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
});
</script>
