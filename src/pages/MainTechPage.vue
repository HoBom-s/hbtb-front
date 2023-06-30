<template>
  <CommonLayoutContainer>
    <div>
      <div class="text-h6 q-mb-md" :style="recentPostFontStyle">
        Recent articles
      </div>
      <div class="q-mb-md flex" :style="recentArticleBoxStyle">
        <CardArticleRecentList :cardItems="state.recentArticles" />
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
      :curPageNumber="state.curPageNumber"
      :totalPageNumber="state.totalPageNumber"
      :divider="perPageNumber"
      @onPrevButtonClickEvent="onPrevButtonClickEvent"
      @onNextButtonClickEvent="onNextButtonClickEvent"
      @onPageNumberButtonClickEvent="onPageNumberButtonClickEvent"
    />
  </CommonLayoutContainer>
</template>

<script setup>
import { reactive, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";

import CommonLayoutContainer from "@/containers/CommonLayoutContainer.vue";
import TagItemList from "@/components/tags/TagItemList.vue";
import CardArticleRecentList from "@/components/cards/CardArticleRecentList.vue";
import CardArticleList from "@/components/cards/CardArticleList.vue";
import PaginateCreator from "@/components/paginator/PaginateCreator.vue";

import { getAllTagRequestService } from "@/apis/tagFetcher";
import {
  getAllArticleRequestService,
  getArticlePerPageRequestService,
} from "@/apis/articleFetcher";

import { agent } from "@/types";

import namespace from "@/static/name";

import palette from "@/utils/palette";

const router = useRouter();

const perPageNumber = 5;

const state = reactive({
  tags: [],

  recentArticles: [],

  articles: [],

  curPageNumber: 1,

  totalPageNumber: 1,
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

  const recentArticleResult = await getAllArticleRequestService();

  state.recentArticles = recentArticleResult.slice(0, 3);

  const articleResult = await getArticlePerPageRequestService(
    state.curPageNumber,
    perPageNumber
  );
  const { articles } = articleResult;

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
  state.totalPageNumber = articleResult.totalPageNumber;
});

watch(
  () => state.curPageNumber,
  async (newCurPageNumber) => {
    const articleResult = await getArticlePerPageRequestService(
      newCurPageNumber,
      perPageNumber
    );

    const { articles } = articleResult;

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
  }
);

const isFirstPage = computed(() => {
  return state.curPageNumber === 1;
});

const isLastPage = computed(() => {
  return state.curPageNumber === state.totalPageNumber;
});

const recentPostFontStyle = computed(() => {
  return {
    fontSize: palette.fontSize.l,
    fontWeight: palette.fontWeight.bigBold,
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
  const { path } = clickedTag;

  router.push({
    path: "/tag",
    name: "MainTechTagSearchPage",
    params: {
      searchTag: path,
    },
  });
}

function onPrevButtonClickEvent() {
  if (isFirstPage.value) {
    return;
  }

  state.curPageNumber -= 1;
}

function onNextButtonClickEvent() {
  if (isLastPage.value) {
    return;
  }

  state.curPageNumber += 1;
}

function onPageNumberButtonClickEvent(clickedPageNumner) {
  state.curPageNumber = clickedPageNumner;
}
</script>
