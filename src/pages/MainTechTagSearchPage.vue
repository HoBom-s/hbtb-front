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
        <div
          v-if="state.articles.length === 0"
          class="q-pt-xl q-pb-xl"
          :style="{
            width: '800px',
            fontSize: '3rem',
            fontWeight: palette.fontWeight.bold,
            color: palette.colors.authorGray,
          }"
        >
          검색 결과가 없습니다.
        </div>
        <div v-else :style="{ width: '800px' }">
          <CardArticleList
            :cardItems="state.articles"
            @onArticleCardItemClickEvent="onArticleCardItemClickEvent"
          />
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
import { useRouter } from "vue-router";

import CommonLayoutContainer from "@/containers/CommonLayoutContainer.vue";
import CardArticleList from "@/components/cards/CardArticleList.vue";
import TagItemList from "@/components/tags/TagItemList.vue";

import { getAllArticleRequestService } from "@/apis/articleFetcher";
import { getAllTagRequestService } from "@/apis/tagFetcher";

import { agent } from "@/types";

import namespace from "@/static/name";

import palette from "@/utils/palette";

const router = useRouter();

const { searchTag } = history.state;

const state = reactive({
  searchTag: searchTag,

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
      if (tag.path === state.searchTag) {
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
  () => state.searchTag,
  async (newPath) => {
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
        if (tag.path === newPath) {
          filteredArticles.push(art);
        }
      });
    });

    state.articles = filteredArticles;
  }
);

// Methods
function onTagItemClickEvent(clickedTag) {
  const { path } = clickedTag;
  state.searchTag = path;
}

function onArticleCardItemClickEvent(clickedArticle) {
  const { path } = clickedArticle;

  router.push({
    path: "/article",
    name: "MainArticleDetailPage",
    state: {
      articlePath: path,
    },
  });
}
</script>
