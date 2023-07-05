<template>
  <q-layout>
    <AppHeader
      :categories="headerCategory"
      :tags="state.tags"
      :selectedCategory="state.selectedCategory"
      :isSearchItemClick="state.isSearchItemClick"
      :keyword="state.keyword"
      :thumbnail="props.thumbnail"
      :title="props.title"
      :subtitle="props.subtitle"
      :createdDate="props.createdDate"
      @onCategoryItemClickEvent="onCategoryItemClickEvent"
      @onTagItemClickEvent="onTagItemClickEvent"
      @onSearchItemClickEvent="onSearchItemClickEvent"
      @onLogoButtonClickEvent="onLogoButtonClickEvent"
      @onKeywordChangeEvent="onKeywordChangeEvent"
    />
    <div :style="mainContainerStyle"><slot></slot></div>
    <AppFooter :categories="footerCategory" />
  </q-layout>
</template>

<script setup>
import { reactive, defineProps, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

import AppHeader from "../components/common/AppHeader.vue";
import AppFooter from "../components/common/AppFooter.vue";

import { getAllCategoryRequestService } from "@/apis/categoryFetcher";
import { getAllTagRequestService } from "@/apis/tagFetcher";

import { agent } from "@/types";

import namespace from "@/static/name";

const router = useRouter();

const state = reactive({
  categories: [],

  tags: [],

  selectedCategory: {},

  isSearchItemClick: false,

  keyword: "",
});

const props = defineProps({
  thumbnail: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    reqired: true,
  },

  subtitle: {
    type: String,
    required: true,
  },

  createdDate: {
    type: String,
    required: true,
  },
});

onMounted(async () => {
  const categories = await getAllCategoryRequestService();

  const categoryInstanceArray = categories.map((cat) => {
    const { _id, title, path, sortIndex, spot, createdAt, updatedAt } = cat;
    const catObj = agent
      .instanceOfName(namespace.categorySchema)
      .createInstance(_id, title, path, sortIndex, spot, createdAt, updatedAt);
    return catObj;
  });

  state.categories = categoryInstanceArray;
  state.selectedCategory = categoryInstanceArray[0];

  const tags = await getAllTagRequestService();

  const tagInstanceArray = tags.map((tag) => {
    const { _id, title, path, count, createdAt } = tag;
    const tagObj = agent
      .instanceOfName(namespace.tagSchema)
      .createInstance(_id, title, path, count, createdAt);
    return tagObj;
  });

  state.tags = tagInstanceArray;
});

const mainContainerStyle = computed(() => {
  return {
    width: "1200px",
    height: "100%",
    margin: "100px auto",
  };
});

const headerCategory = computed(() => {
  return state.categories.filter((cat) => cat.spot === "H");
});

const footerCategory = computed(() => {
  return state.categories.filter((cat) => cat.splot === "F");
});

// Methods
function onCategoryItemClickEvent(clickedCategory) {
  state.selectedCategory = clickedCategory;
  const path = clickedCategory.path;
  router.push(path);
}

function onTagItemClickEvent(clickedTag) {
  const { title } = clickedTag;

  router.push({
    path: "/search",
    query: {
      keyword: title,
    },
  });
}

function onSearchItemClickEvent() {
  state.isSearchItemClick = !state.isSearchItemClick;
}

function onLogoButtonClickEvent() {
  router.push("/");
}

function onKeywordChangeEvent(e) {
  const { value } = e.target;
  state.keyword = value;
  if (e.key === "Enter") {
    router.push({
      path: "/search",
      query: {
        keyword: state.keyword,
      },
    });
  }
}
</script>
