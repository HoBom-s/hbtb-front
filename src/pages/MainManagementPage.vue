<template>
  <CommonManageLayoutContainer>
    <CardManagementList :iconPosition="'left'" :cardItems="getCardItems" />
    <div class="row q-gutter-sm">
      <div class="col">
        <ManagementItemBox
          :tabItems="tabItems"
          :selectedTabItem="state.selectedTabItem"
          :categories="state.categories"
          :tags="state.tags"
          @onTabValueChangeEvent="onTabValueChangeEvent"
        />
      </div>
      <div class="col"></div>
    </div>
    <DataGridChart :title="'ARTICLES'" :columns="columns" :rows="rows" />
  </CommonManageLayoutContainer>
</template>

<script setup>
import { reactive, onMounted, computed } from "vue";

import CommonManageLayoutContainer from "@/containers/CommonManageLayoutContainer.vue";
import CardManagementList from "@/components/cards/CardManagementList.vue";
import ManagementItemBox from "@/components/management/ManagementItemBox.vue";
import DataGridChart from "@/components/charts/DataGridChart.vue";

import { getAllCategoryRequestService } from "@/apis/categoryFetcher";
import { getAllTagRequestService } from "@/apis/tagFetcher";
import { getAllArticleRequestService } from "@/apis/articleFetcher";

import { agent } from "@/types";

import namespace from "@/static/name";

const tabItems = [
  { name: "category", label: "Category", iconName: "list" },
  { name: "tag", label: "Tag", iconName: "tag" },
];

const state = reactive({
  articles: [],

  categories: [],

  tags: [],

  selectedTabItem: "category",
});

onMounted(async () => {
  const categories = await getAllCategoryRequestService();

  const categoryInstanceArray = categories.map((cat) => {
    const { _id, title, path, sortIndex, spot, createdAt, updatedAt } = cat;

    const categoryObject = agent
      .instanceOfName(namespace.categorySchema)
      .createInstance(_id, title, path, sortIndex, spot, createdAt, updatedAt);

    return categoryObject;
  });

  state.categories = categoryInstanceArray;

  const tags = await getAllTagRequestService();

  const tagInstanceArray = tags.map((tag) => {
    const { _id, title, path, count, createdAt } = tag;

    const tagObject = agent
      .instanceOfName(namespace.tagSchema)
      .createInstance(_id, title, path, count, createdAt);

    return tagObject;
  });

  state.tags = tagInstanceArray;

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

const getCardItems = computed(() => {
  const cardItems = [
    {
      title: "My Account",
      icon: "person",
      value: "Robin",
      iconColor: "#3e51b5",
      bgColor: "#5064b5",
    },
    {
      title: "Total Likes",
      icon: "favorite",
      value: "500",
      iconColor: "#FFA630",
      bgColor: "#FFA07A",
    },
    {
      title: "Comments",
      icon: "comments",
      value: "50",
      iconColor: "#ea4b64",
      bgColor: "#ea6a7f",
    },
    {
      title: "Website Visits",
      icon: "monitoring",
      value: "1020",
      iconColor: "#9400D3",
      bgColor: "#9932CC",
    },
  ];

  return cardItems;
});

const columns = computed(() => {
  const col = [
    {
      name: "name",
      label: "Article (Author)",
      field: "name",
      format: (value) => `${value}`,
      align: "left",
      required: true,
      sortable: true,
    },
    {
      name: "title",
      label: "Article's title",
      field: "title",
      align: "left",
      required: true,
    },
    {
      name: "subtitle",
      label: "Article's subtitle",
      field: "subtitle",
      align: "left",
      required: true,
    },
    {
      name: "path",
      label: "Path",
      field: "path",
      align: "left",
      required: true,
    },
    {
      name: "createdAt",
      label: "Create Date",
      field: "createdAt",
      align: "left",
      required: true,
      sortable: true,
    },
    {
      name: "updatedAt",
      label: "Update Date",
      field: "updatedAt",
      align: "left",
      required: true,
      sortable: true,
    },
  ];

  return col;
});

const rows = computed(() => {
  const rowArray = state.articles.map((art) => {
    const obj = {};

    obj._id = art._id;
    obj.name = art.writers.map((writer) => writer.nickname).join(", ");
    obj.title = art.title;
    obj.subtitle = art.subtitle;
    obj.path = art.path;
    obj.createdAt = art.createdAt.split("T")[0];
    obj.updatedAt = art.updatedAt.split("T")[0];

    return obj;
  });

  return rowArray;
});

// Methods
function onTabValueChangeEvent(value) {
  state.selectedTabItem = value;
}
</script>
