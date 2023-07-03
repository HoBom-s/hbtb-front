<template>
  <div class="cursor-pointer" :style="cardStyle">
    <q-card>
      <q-img :src="props.item.thumbnail" width="385px" height="256px" />
      <q-card-section>
        <div :style="cardTitleFontStyle">
          {{ props.item.title }}
        </div>
        <div class="q-mt-sm q-mb-sm text-subtitle2">
          <q-avatar size="26px">
            <img :src="authorProfileImage" />
          </q-avatar>
          by {{ authorInformation }}
        </div>
        <div class="text-subtitle2" :style="cardAuthorFontStyle">
          {{ props.item.createdAt.split("T")[0] }}
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

const authorInformation = computed(() => {
  const toNickname = props.item.writers
    .map((author) => author.nickname)
    .join(", ");
  return toNickname;
});

const authorProfileImage = computed(() => {
  const toProfileImage = props.item.writers[0].profileImg;
  return toProfileImage;
});

const cardStyle = computed(() => {
  return {
    width: "385px",
    height: "376px",
  };
});

const cardTitleFontStyle = computed(() => {
  return {
    fontSize: palette.fontSize.sm,
    fontWeight: palette.fontWeight.bold,
  };
});

const cardAuthorFontStyle = computed(() => {
  return {
    color: palette.colors.authorGray,
  };
});
</script>
