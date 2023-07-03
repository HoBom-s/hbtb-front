<template>
  <div
    class="q-pb-md cursor-pointer"
    :style="cardStyle"
    @click="onArticleCardItemClickEvent(props.item)"
  >
    <q-card>
      <q-card-section horizontal>
        <q-img :src="props.item.thumbnail" width="280px" height="190px" />
        <q-card-section>
          <div :style="cardTitleFontStyle">
            {{ props.item.title }}
          </div>
          <div class="q-mt-md text-subtitle2">
            {{ props.item.subtitle }}
          </div>
          <div class="q-mt-lg text-subtitle2">
            <q-avatar size="26px">
              <img :src="authorProfileImage" />
            </q-avatar>
            by {{ authorInformation }}
          </div>
          <div class="text-subtitle2 q-mt-lg" :style="cardAuthorFontStyle">
            {{ props.item.createdAt.split("T")[0] }}
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

import palette from "@/utils/palette";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits({
  // No validation
  onArticleCardItemClickEvent: () => true,
});

const authorInformation = computed(() => {
  const toNickname = props.item.writers.map((wri) => wri.nickname).join(", ");
  return toNickname;
});

const authorProfileImage = computed(() => {
  const toProfileImage = props.item.writers[0].profileImg;
  return toProfileImage;
});

const cardStyle = computed(() => {
  return {
    width: "700px",
  };
});

const cardTitleFontStyle = computed(() => {
  return {
    fontSize: palette.fontSize.md,
    fontWeight: palette.fontWeight.bold,
  };
});

const cardAuthorFontStyle = computed(() => {
  return {
    color: palette.colors.authorGray,
  };
});

// Methods
function onArticleCardItemClickEvent(clickedArticle) {
  emits("onArticleCardItemClickEvent", clickedArticle);
}
</script>
