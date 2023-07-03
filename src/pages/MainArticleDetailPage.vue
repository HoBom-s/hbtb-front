<template>
  <CommonLayoutContainer>
    <div>
      <div class="text-h6 q-mb-lg">
        <div
          :style="{
            fontSize: '3rem',
            fontWeight: palette.fontWeight.bigBold,
          }"
        >
          {{ state.articleInformation.title }}
        </div>
        <div
          class="q-mt-lg"
          :style="{
            fontSize: palette.fontSize.lg,
            fontWeight: palette.fontWeight.bold,
            color: palette.colors.authorGray,
          }"
        >
          {{ state.articleInformation.subtitle }}
        </div>
      </div>
      <div class="q-pt-lg q-pb-lg">
        {{ state.articleInformation.contents }}
      </div>
    </div>
  </CommonLayoutContainer>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";

import CommonLayoutContainer from "@/containers/CommonLayoutContainer.vue";

import { getArticleFindById } from "@/apis/articleFetcher";

import { agent } from "@/types";

import namespace from "@/static/name";

import palette from "@/utils/palette";

const route = useRoute();

const { articlePath } = route.params;

const state = reactive({
  articleInformation: {},
});

onMounted(async () => {
  const articleResult = await getArticleFindById(
    articlePath.slice(1, articlePath.length)
  );

  const {
    _id,
    thumbnail,
    title,
    subtitle,
    contents,
    tags,
    writers,
    path,
    createdAt,
    updatedAt,
  } = articleResult;

  const articleResultObject = agent
    .instanceOfName(namespace.articleSchema)
    .createInstance(
      _id,
      thumbnail,
      title,
      subtitle,
      contents,
      tags,
      writers,
      path,
      createdAt,
      updatedAt
    );

  state.articleInformation = articleResultObject;
});
</script>
