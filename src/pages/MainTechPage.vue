<template>
  <CommonLayoutContainer>
    <div>
      <div class="text-h6 q-mb-md" :style="recentPostFontStyle">
        Recent articles
      </div>
      <div class="q-mb-md flex" :style="recentArticleBoxStyle">
        <CardArticleRecentList :cardItems="recentArticleList" />
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
        <div :style="mainArticleBoxStyle">
          <CardArticleList :cardItems="state.articles" />
        </div>
        <div :style="mainArticleTagBoxStyle">
          <TagItemList
            :tags="state.tags"
            @onTagItemClickEvent="onTagItemClickEvent"
          />
        </div>
      </div>
    </div>
    <PaginateCreator
      :paginator="'list'"
      :curPageNumber="state.curPageNumer"
      :totalPageNumber="10"
      :divider="5"
      @onPrevButtonClickEvent="onPrevButtonClickEvent"
      @onNextButtonClickEvent="onNextButtonClickEvent"
      @onPageNumberButtonClickEvent="onPageNumberButtonClickEvent"
    />
  </CommonLayoutContainer>
</template>

<script setup>
import { reactive, onMounted, computed } from "vue";

import CommonLayoutContainer from "@/containers/CommonLayoutContainer.vue";
import TagItemList from "@/components/tags/TagItemList.vue";
import CardArticleRecentList from "@/components/cards/CardArticleRecentList.vue";
import CardArticleList from "@/components/cards/CardArticleList.vue";
import PaginateCreator from "@/components/paginator/PaginateCreator.vue";

import { getAllTagRequestService } from "@/apis/tagFetcher";
import { getAllArticleRequestService } from "@/apis/articleFetcher";

import { agent } from "@/types";

import namespace from "@/static/name";

import palette from "@/utils/palette";
import errorUtil from "@/utils/errorUtil";

const state = reactive({
  tags: [],

  articles: [],

  curPageNumer: 1,
});

// TODO - BackEnd Data
const totalPageNumber = 10;

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

  const articles = await getAllArticleRequestService();

  const articleInstanceArray = articles.map((art) => {
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

  state.articles = articleInstanceArray;
});

const isFirstPage = computed(() => {
  return state.curPageNumer === 1;
});

const isLastPage = computed(() => {
  return state.curPageNumer === totalPageNumber;
});

const recentArticleList = computed(() => {
  const recentArticles = state.articles.slice(0, 3);
  return recentArticles;
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
    maxHeight: "700px",
    overflowY: "auto",
  };
});

// Methods
function onTagItemClickEvent(clickedTag) {
  console.log(clickedTag);
  errorUtil.notImplemented();
}

function onPrevButtonClickEvent() {
  if (isFirstPage.value) {
    return;
  }

  state.curPageNumer -= 1;
}

function onNextButtonClickEvent() {
  if (isLastPage.value) {
    return;
  }

  state.curPageNumer += 1;
}

function onPageNumberButtonClickEvent(clickedPageNumner) {
  state.curPageNumer = clickedPageNumner;
}
</script>
