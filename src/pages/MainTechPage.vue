<template>
  <CommonLayoutContainer>
    <div>
      <div class="text-h6 q-mb-md" :style="recentPostFontStyle">
        Recent articles
      </div>
      <div class="q-mb-md flex" :style="recentArticleBoxStyle">
        <CardArticleRecent />
        <CardArticleRecent />
        <CardArticleRecent />
      </div>
    </div>
    <div :style="mainContentBoxStyle">
      <div class="flex q-mb-md">
        <div class="text-h6 q-mb-md" :style="mainContentArticleFontTitleStyle">
          Articles
        </div>
        <div class="text-h6 q-mb-md" :style="mainContentTagListFontTitleStyle">
          Tags
        </div>
      </div>
      <div class="flex">
        <div :style="mainArticleBoxStyle">Main Article</div>
        <div :style="mainArticleTagBoxStyle">
          <TagItemList :tags="state.tags" />
        </div>
      </div>
    </div>
  </CommonLayoutContainer>
</template>

<script setup>
import { reactive, onMounted, computed } from "vue";

import CommonLayoutContainer from "@/containers/CommonLayoutContainer.vue";
import TagItemList from "@/components/tags/TagItemList.vue";
import CardArticleRecent from "@/components/cards/CardArticleRecent.vue";

import { getAllTagRequestService } from "@/apis/tagFetcher";

import { agent } from "@/types";

import namespace from "@/static/name";

import palette from "@/utils/palette";

const state = reactive({
  tags: [],
});

onMounted(async () => {
  const tags = await getAllTagRequestService();
  const tagInstanceArray = tags.map((tag) => {
    const { _id, title, path, createdAt, count } = tag;
    const tagObj = agent
      .instanceOfName(namespace.tagSchema)
      .createInstance(_id, title, path, count, createdAt);
    return tagObj;
  });
  if (tagInstanceArray.every((tag) => tag.ofPathCondition(tag.path))) {
    state.tags = tagInstanceArray;
  } else {
    state.tags = [];
  }
});

const recentPostFontStyle = computed(() => {
  return {
    fontSize: palette.fontSize.l,
    color: palette.colors.authorGray,
  };
});

const recentArticleBoxStyle = computed(() => {
  return {
    gap: "15px",
  };
});

const mainContentBoxStyle = computed(() => {
  return {
    marginTop: "100px",
  };
});

const mainContentArticleFontTitleStyle = computed(() => {
  return {
    width: "800px",
    fontSize: palette.fontSize.l,
    fontWeight: palette.fontWeight.bold,
    color: palette.colors.authorGray,
  };
});

const mainContentTagListFontTitleStyle = computed(() => {
  return {
    width: "400px",
    fontSize: palette.fontSize.l,
    fontWeight: palette.fontWeight.bold,
    color: palette.colors.authorGray,
  };
});

const mainArticleBoxStyle = computed(() => {
  return {
    width: "800px",
  };
});

const mainArticleTagBoxStyle = computed(() => {
  return {
    width: "400px",
    display: "flex",
    flexWrap: "wrap",
  };
});
</script>
