<template>
  <CommonManageLayoutContainer>
    <CardManagementList :iconPosition="'left'" :cardItems="getCardItems" />
    <div class="row q-gutter-sm" :style="{ maxHieght: '450px' }">
      <div class="col">
        <ManagementItemBox
          :tabItems="tabItems"
          :selectedTabItem="state.selectedTabItem"
          :categories="state.categories"
          :tags="state.tags"
          @onTabValueChangeEvent="onTabValueChangeEvent"
          @onItemSlideLeftEvent="onItemSlideLeftEvent"
          @onItemSlideRightEvent="onItemSlideRightEvent"
        />
      </div>
      <div class="col">
        <div class="q-mt-md">
          <q-card :style="{ maxHeight: '450px' }">
            <q-card-section>
              <div
                class="text-h6"
                :style="{ fontWeight: palette.fontWeight.bigBold }"
              >
                TOTAL ITEM COUNT
              </div>
            </q-card-section>
            <q-card-section
              class="q-pa-md flex q-gutter-md"
              bordered
              :style="{
                justifyContent: 'center',
                maxHeight: '374px',
                overflowY: 'auto',
              }"
            >
              <CircleChart :itemObject="getChartCategoryTagItemObject" />
              <CircleChart :itemObject="getChartArticleItemObject" />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <DataGridChart :title="'ARTICLES'" :columns="columns" :rows="rows" />
    <BaseEditDialog
      :isDialogOpen="state.isUpdateDialogOpen"
      :title="'UPDATE ITEM'"
      @onBaseEditDialogCloseButtonClickEvent="
        onBaseEditDialogCloseButtonClickEvent
      "
      @onBaseEditDialogConfirmButtonClickEvent="
        onBaseEditDialogConfirmButtonClickEvent
      "
    >
      <div v-if="state.selectedTabItem === 'category'">
        <AppInput
          :inputType="'text'"
          :inputLabel="'Category Title'"
          :inputName="'categoryTitle'"
          :isMarginTop="true"
          :inputValue="state.inputValues.categoryTitle"
          :validateFormValue="validateCategoryTitle"
          @onInputValueChangeEvent="onInputValueChangeEvent"
        />
        <AppInput
          :inputType="'text'"
          :inputLabel="'Category Path'"
          :inputName="'categoryPath'"
          :isMarginTop="true"
          :inputValue="state.inputValues.categoryPath"
          :validateFormValue="validateCategoryPath"
          @onInputValueChangeEvent="onInputValueChangeEvent"
        />
        <AppInput
          :inputType="'number'"
          :inputLabel="'Category Sort Index'"
          :inputName="'categorySortIndex'"
          :isMarginTop="true"
          :inputValue="state.inputValues.categorySortIndex"
          :validateFormValue="validateCategorySortIndex"
          @onInputValueChangeEvent="onInputValueChangeEvent"
        />
        <AppSelect
          :selectLabel="'Category Spot'"
          :options="categorySpotOptions"
          :modelValues="state.inputValues.categorySpot"
          :isMarginTop="true"
          @onSelectValueChangeEvent="onSelectValueChangeEvent"
        />
      </div>
      <div v-else>
        <AppInput
          :inputType="'text'"
          :inputLabel="'Tag Title'"
          :inputName="'tagTitle'"
          :isMarginTop="true"
          :inputValue="state.inputValues.tagTitle"
          :validateFormValue="validateTagTitle"
          @onInputValueChangeEvent="onInputValueChangeEvent"
        />
        <AppInput
          :inputType="'text'"
          :inputLabel="'Tag Path'"
          :inputName="'tagPath'"
          :isMarginTop="true"
          :inputValue="state.inputValues.tagPath"
          :validateFormValue="validateTagPath"
          @onInputValueChangeEvent="onInputValueChangeEvent"
        />
      </div>
    </BaseEditDialog>
    <BaseEditDialog
      :isDialogOpen="state.isRemoveDialogOpen"
      :title="'WARNING'"
      @onBaseEditDialogCloseButtonClickEvent="
        onBaseEditDialogCloseButtonClickEvent
      "
      @onBaseEditDialogConfirmButtonClickEvent="
        onBaseEditDialogConfirmButtonClickEvent
      "
    >
      <div class="q-mt-md">Do you want to delete ?</div>
    </BaseEditDialog>
  </CommonManageLayoutContainer>
</template>

<script setup>
import { reactive, onBeforeMount, onMounted, computed } from "vue";

import useValidate from "@/hooks/useValidate";
import useStorage from "@/hooks/useStorage";

import CommonManageLayoutContainer from "@/containers/CommonManageLayoutContainer.vue";
import CardManagementList from "@/components/cards/CardManagementList.vue";
import ManagementItemBox from "@/components/management/ManagementItemBox.vue";
import DataGridChart from "@/components/charts/DataGridChart.vue";
import CircleChart from "@/components/charts/CircleChart.vue";
import BaseEditDialog from "@/components/dialog/BaseEditDialog.vue";
import AppInput from "@/components/common/AppInput.vue";
import AppSelect from "@/components/common/AppSelect.vue";

import { userGetMyInformationService } from "@/apis/userFetcher";
import {
  getAllCategoryRequestService,
  updateCategoryRequestService,
  deleteCategoryRequestService,
} from "@/apis/categoryFetcher";
import {
  getAllTagRequestService,
  updateTagRequestService,
  deleteTagRequestService,
} from "@/apis/tagFetcher";
import { getAllArticleRequestService } from "@/apis/articleFetcher";

import { agent } from "@/types";

import namespace from "@/static/name";

import palette from "@/utils/palette";
import funcUtil from "@/utils/funcUtil";
import validator from "@/utils/validator";
import errorUtil from "@/utils/errorUtil";

let timer;

const tabItems = [
  { name: "category", label: "Category", iconName: "list" },
  { name: "tag", label: "Tag", iconName: "tag" },
];

const categorySpotOptions = ["Header", "Footer"];

const state = reactive({
  articles: [],

  categories: [],

  tags: [],

  myInformation: {},

  selectedTabItem: "category",

  selectedUpdateItem: {},

  selectedRemoveItem: "",

  isUpdateDialogOpen: false,

  isRemoveDialogOpen: false,

  inputValues: {
    categoryTitle: "",
    categoryPath: "",
    categorySortIndex: 1,
    categorySpot: "",
    tagTitle: "",
    tagPath: "",
  },
});

onBeforeMount(() => {
  clearTimeout(timer);
});

onMounted(async () => {
  await doFetchAllSchema();
});

const getCardItems = computed(() => {
  const nickname = funcUtil.pick(state.myInformation, "nickname");
  const role = funcUtil.pick(state.myInformation, "role");

  const articleCounts = (() => {
    let cnt = 0;
    state.articles.forEach((art) => {
      art.writers.forEach((writer) => {
        if (writer.nickname === nickname) {
          cnt++;
        }
      });
    });
    return cnt;
  })();

  const cardItems = [
    {
      title: "My Account",
      icon: "person",
      value: nickname,
      iconColor: "#3e51b5",
      bgColor: "#5064b5",
    },
    {
      title: "Role",
      icon: "badge",
      value: role,
      iconColor: "#FFA630",
      bgColor: "#FFA07A",
    },
    {
      title: "Articles",
      icon: "article",
      value: articleCounts,
      iconColor: "#ea4b64",
      bgColor: "#ea6a7f",
    },
    {
      title: "Serivce Name",
      icon: "monitoring",
      value: "HoBom Tech Blog",
      iconColor: "#9400D3",
      bgColor: "#9932CC",
    },
  ];

  return cardItems;
});

const getChartCategoryTagItemObject = computed(() => {
  const itemObj = {};
  itemObj.categories = state.categories;
  itemObj.tags = state.tags;
  return itemObj;
});

const getChartArticleItemObject = computed(() => {
  const itemObj = {};
  itemObj.articles = state.articles;
  return itemObj;
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

const validateCategoryTitle = computed(() => {
  const categoryTitleValue = state.inputValues.categoryTitle;
  const validateObject = validator.validateCategoryTitle(categoryTitleValue);
  return validateObject;
});

const validateCategoryPath = computed(() => {
  const categoryPathValue = state.inputValues.categoryPath;
  const validateObject = validator.validateCategoryPath(categoryPathValue);
  return validateObject;
});

const validateCategorySortIndex = computed(() => {
  const categorySortIndexValue = state.inputValues.categorySortIndex;
  const validateObject = validator.validateCategorySortIndex(
    categorySortIndexValue
  );
  return validateObject;
});

const validateTagTitle = computed(() => {
  const tagTitleValue = state.inputValues.tagTitle;
  const validateObject = validator.validateTagTitle(tagTitleValue);
  return validateObject;
});

const validateTagPath = computed(() => {
  const tagPathValue = state.inputValues.tagPath;
  const validateObject = validator.validateTagPath(tagPathValue);
  return validateObject;
});

// Methods
function onTabValueChangeEvent(value) {
  state.selectedTabItem = value;
}

function onItemSlideLeftEvent(e, item) {
  const { reset } = e;

  funcUtil
    .match(state.selectedTabItem)
    .on(
      (tabValue) => tabValue === "category",
      () => {
        const { title, path, sortIndex, spot } = item;
        const selectedSpot = spot === "H" ? "Header" : "Footer";
        state.inputValues.categoryTitle = title;
        state.inputValues.categoryPath = path;
        state.inputValues.categorySortIndex = sortIndex;
        state.inputValues.categorySpot = selectedSpot;
        state.selectedUpdateItem = item;
      }
    )
    .on(
      (tabValue) => tabValue === "tag",
      () => {
        const { title, path } = item;
        state.inputValues.tagTitle = title;
        state.inputValues.tagPath = path;
      }
    )
    .otherwise(() => errorUtil.notImplemented());

  state.selectedUpdateItem = item;
  state.isUpdateDialogOpen = true;
  quasarFinalReset(reset);
}

function onItemSlideRightEvent(e, _id) {
  const { reset } = e;
  state.selectedRemoveItem = _id;
  state.isRemoveDialogOpen = true;
  quasarFinalReset(reset);
}

function onInputValueChangeEvent(name, value) {
  state.inputValues[name] = value;
}

function onSelectValueChangeEvent(value) {
  state.inputValues.categorySpot = value;
}

function onBaseEditDialogCloseButtonClickEvent() {
  state.selectedRemoveItem = "";
  state.selectedUpdateItem = {};
  if (state.isUpdateDialogOpen) {
    state.isUpdateDialogOpen = false;
  } else if (state.isRemoveDialogOpen) {
    state.isRemoveDialogOpen = false;
  }
}

async function onBaseEditDialogConfirmButtonClickEvent() {
  const [accessTokenValue] = useStorage("accessToken", "session");
  const accessToken = accessTokenValue.value;

  if (state.isUpdateDialogOpen) {
    const updateResult = await funcUtil
      .match(state.selectedTabItem)
      .on(
        (tabValue) => tabValue === "category",
        async () => {
          const {
            categoryTitle,
            categoryPath,
            categorySortIndex,
            categorySpot,
          } = state.inputValues;

          const [isValidateUpdateCategory] = useValidate([
            () =>
              validator.validateCategoryTitle(categoryTitle).hasError === false,
            () =>
              validator.validateCategoryPath(categoryPath).hasError === false,
            () =>
              validator.validateCategorySortIndex(categorySortIndex)
                .hasError === false,
          ]);

          if (!isValidateUpdateCategory) {
            return null;
          }
          const updatedCategoryResult = await updateCategoryRequestService(
            {
              _id: state.selectedUpdateItem._id,
              title: categoryTitle,
              path: categoryPath,
              sortIndex: categorySortIndex,
              spot: categorySpot,
            },
            accessToken
          );
          return updatedCategoryResult;
        }
      )
      .on(
        (tabValue) => tabValue === "tag",
        async () => {
          const { tagTitle, tagPath } = state.inputValues;

          const [isValidateUpdateTag] = useValidate([
            () => validator.validateTagTitle(tagTitle).hasError === false,
            () => validator.validateTagPath(tagPath).hasError === false,
          ]);

          if (!isValidateUpdateTag) {
            return null;
          }

          const updatedTagResult = await updateTagRequestService(
            {
              _id: state.selectedUpdateItem._id,
              title: tagTitle,
              path: tagPath,
              count: state.selectedUpdateItem.count,
            },
            accessToken
          );
          return updatedTagResult;
        }
      )
      .otherwise(() => errorUtil.notImplemented());

    if (updateResult._id) {
      state.selectedUpdateItem = {};
      state.isUpdateDialogOpen = false;
      await doFetchAllSchema();
    }
  } else if (state.isRemoveDialogOpen) {
    const removeResult = await funcUtil
      .match(state.selectedTabItem)
      .on(
        (tabValue) => tabValue === "category",
        async () =>
          await deleteCategoryRequestService(
            state.selectedRemoveItem,
            accessToken
          )
      )
      .on(
        (tabValue) => tabValue === "tag",
        async () =>
          await deleteTagRequestService(state.selectedRemoveItem, accessToken)
      )
      .otherwise(() => errorUtil.notImplemented());

    if (removeResult) {
      state.selectedRemoveItem = "";
      state.isRemoveDialogOpen = false;
      await doFetchAllSchema();
    }
  }
}

async function doFetchAllSchema() {
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

  const [accessTokenValue] = useStorage("accessToken", "session");
  const accessToken = accessTokenValue.value;

  const myInforMationObjectResult = await userGetMyInformationService(
    accessToken
  );
  const { _id, nickname, introduction, role, profileImg } =
    myInforMationObjectResult;

  const userInformationObject = agent
    .instanceOfName(namespace.userSchema)
    .createInstance(_id, nickname, introduction, role, profileImg);

  state.myInformation = userInformationObject;
}

function quasarFinalReset(reset) {
  timer = setTimeout(() => {
    reset();
  }, 500);
}
</script>
