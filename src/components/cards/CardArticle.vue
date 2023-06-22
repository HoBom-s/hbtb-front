<template>
  <div class="q-pb-md cursor-pointer" :style="cardStyle">
    <q-card>
      <q-card-section horizontal>
        <q-img
          src="https://cdn.quasar.dev/img/parallax2.jpg"
          width="280px"
          height="190px"
        />
        <q-card-section>
          <div :style="cardTitleFontStyle">
            {{ props.item.title }}
          </div>
          <div class="q-mt-md text-subtitle2">
            {{ props.item.subTitle }}
          </div>
          <div class="q-mt-lg text-subtitle2">
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            by {{ props.item.author }}
          </div>
          <div class="text-subtitle2" :style="cardAuthorFontStyle">
            {{ props.item.createdAt }}
          </div>
        </q-card-section>
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
    width: "700px",
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
