<template>
  <div class="cursor-pointer" :style="cardStyle">
    <q-card>
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-card-section>
        <div :style="cardTitleFontStyle">
          {{ props.item.title }}
        </div>
        <div class="q-mt-sm q-mb-sm text-subtitle2">
          <q-avatar size="26px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          by {{ props.item.author }}
        </div>
        <div class="text-subtitle2" :style="cardAuthorFontStyle">
          {{ props.item.createdAt }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

import palette from "@/utils/palette";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const cardStyle = computed(() => {
  return {
    width: "385px",
    height: "376px",
  };
});

const cardTitleFontStyle = computed(() => {
  return {
    fontSize: palette.fontSize.md,
  };
});

const cardAuthorFontStyle = computed(() => {
  return {
    color: palette.colors.authorGray,
  };
});
</script>
