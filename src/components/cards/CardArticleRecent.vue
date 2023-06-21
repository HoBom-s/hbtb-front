<template>
  <div :style="cardStyle">
    <q-card>
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-card-section>
        <div :style="cardTitleFontStyle">
          The HoBom's Front End - Vue3 Composition
        </div>
        <div class="q-mt-sm q-mb-sm text-subtitle2">
          <q-avatar size="26px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          by Robin
        </div>
        <div class="text-subtitle2" :style="cardAuthorFontStyle">
          2023-06-21
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { computed } from "vue";

import palette from "@/utils/palette";

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
