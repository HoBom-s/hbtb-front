<template>
  <CommonLayoutContainer>
    <div>
      <div class="flex qu-mb-md">
        <div
          class="text-h6 q-mb-md"
          :style="{
            width: '800px',
            fontSize: palette.fontSize.l,
            fontWeight: palette.fontWeight.bigBold,
            color: palette.colors.authorGray,
          }"
        >
          검색 결과
        </div>
        <div
          class="text-h6 q-mb-md"
          :style="{
            width: '400px',
            fontSize: palette.fontSize.l,
            fontWeight: palette.fontWeight.bold,
            color: palette.colors.authorGray,
          }"
        >
          Tags
        </div>
      </div>
      <div class="flex">
        <div :style="{ width: '800px' }">
          <CardArticleList :cardItems="state.articles" />
        </div>
        <div :style="{ width: '400px' }">
          <TagItemList
            :tags="state.tags"
            @onTagItemClickEvent="onTagItemClickEvent"
          />
        </div>
      </div>
    </div>
  </CommonLayoutContainer>
</template>

<script setup>
import { reactive, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import CommonLayoutContainer from "@/containers/CommonLayoutContainer.vue";
import CardArticleList from "@/components/cards/CardArticleList.vue";
import TagItemList from "@/components/tags/TagItemList.vue";

import { getAllArticleRequestService } from "@/apis/articleFetcher";
import { getAllTagRequestService } from "@/apis/tagFetcher";

import { agent } from "@/types";

import namespace from "@/static/name";

import palette from "@/utils/palette";

const route = useRoute();
const router = useRouter();

const { searchTag } = route.params;

const state = reactive({
  articles: [],

  tags: [],
});

onMounted(async () => {
  const articlesResult = await getAllArticleRequestService();

  const articleInstanceArray = articlesResult.map((art) => {
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
    } = art;

    const articleObject = agent
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

    return articleObject;
  });

  const filteredArticles = [];

  articleInstanceArray.forEach((art) => {
    const { tags } = art;
    tags.forEach((tag) => {
      if (tag.path === searchTag) {
        filteredArticles.push(art);
      }
    });
  });

  const tagsResult = await getAllTagRequestService();

  const tagInstanceArray = tagsResult.map((tag) => {
    const { _id, title, path, count, createdAt } = tag;

    const tagObject = agent
      .instanceOfName(namespace.tagSchema)
      .createInstance(_id, title, path, count, createdAt);

    return tagObject;
  });

  state.articles = filteredArticles;
  state.tags = tagInstanceArray;
});

watch(
  () => route.params,
  async (newPath) => {
    const { searchTag } = newPath;

    const articlesResult = await getAllArticleRequestService();

    const articleInstanceArray = articlesResult.map((art) => {
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
      } = art;

      const articleObject = agent
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

      return articleObject;
    });

    const filteredArticles = [];

    articleInstanceArray.forEach((art) => {
      const { tags } = art;
      tags.forEach((tag) => {
        if (tag.path === searchTag) {
          filteredArticles.push(art);
        }
      });
    });

    state.articles = filteredArticles;
  }
);

function onTagItemClickEvent(clickedTag) {
  const { path } = clickedTag;

  router.push({
    path: "/tag",
    name: "MainTechTagSearchPage",
    params: {
      searchTag: path,
    },
  });
}
</script>
