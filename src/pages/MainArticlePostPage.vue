<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
  <CommonManageLayoutContainer>
    <PostHeaderBox
      :inputValues="state.inputValues"
      :validateArticleTitle="validateArticleTitle"
      :validateArticleSubtitle="validateArticleSubtitle"
      @onInputValueChangeEvent="onInputValueChangeEvent"
    />
    <div class="row q-mt-md q-col-gutter-md">
      <div class="col-md-9 col-sm-12 col-xs-12">
        <q-editor
          height="auto"
          minHeight="600px"
          maxHeight="100%"
          :definitions="definitions"
          :toolbar="toolbars"
          :modelValue="state.contents"
          @update:modelValue="onContentChangeEvent"
        />
      </div>
      <div class="col-md-3 col-sm-12 col-xs-12">
        <PostOptionBox
          :categories="categoryOptions"
          :tags="state.tags"
          :selectedCategory="state.inputValues.selectedCategory"
          @onSelectValueChangeEvent="onSelectValueChangeEvent"
        />
      </div>
    </div>
  </CommonManageLayoutContainer>
</template>

<script setup>
import { reactive, onMounted, computed } from "vue";
import { useQuasar } from "quasar";

import CommonManageLayoutContainer from "@/containers/CommonManageLayoutContainer.vue";
import PostHeaderBox from "@/components/publish/PostHeaderBox.vue";
import PostOptionBox from "@/components/publish/PostOptionBox.vue";

import { getAllCategoryRequestService } from "@/apis/categoryFetcher";
import { getAllTagRequestService } from "@/apis/tagFetcher";

import { agent } from "@/types";

import namespace from "@/static/name";

import validator from "@/utils/validator";

const $q = useQuasar();

const definitions = {
  upload: {
    tip: "Upload",
    icon: "cloud_upload",
    label: "Upload",
    handler: onUploadButtonClickEvent,
  },
};

const toolbars = [
  [
    {
      label: $q.lang.editor.align,
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      list: "only-icons",
      options: ["left", "center", "right", "justify"],
    },
    {
      label: $q.lang.editor.align,
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      options: ["left", "center", "right", "justify"],
    },
  ],
  ["bold", "italic", "strike", "underline"],
  ["upload", "save"],
];

const state = reactive({
  categories: [],

  tags: [],

  contents: "",

  inputValues: {
    title: "",
    subtitle: "",
    selectedCategory: "",
  },
});

onMounted(async () => {
  const categoryResults = await getAllCategoryRequestService();

  const categoryInstanceArray = categoryResults.map((cat) => {
    const { _id, title, path, sortIndex, spot, createdAt, updatedAt } = cat;

    const categoryObject = agent
      .instanceOfName(namespace.categorySchema)
      .createInstance(_id, title, path, sortIndex, spot, createdAt, updatedAt);

    return categoryObject;
  });

  const tagResults = await getAllTagRequestService();

  const tagInstanceArray = tagResults.map((tag) => {
    const { _id, title, path, count, createdAt } = tag;

    const tagObject = agent
      .instanceOfName(namespace.tagSchema)
      .createInstance(_id, title, path, count, createdAt);

    return tagObject;
  });

  state.categories = categoryInstanceArray;

  state.tags = tagInstanceArray;

  state.inputValues.selectedCategory = categoryInstanceArray[0].title;
});

const validateArticleTitle = computed(() => {
  const titleValue = state.inputValues.title;
  const validTitleObject = validator.validateArticleTitle(titleValue);
  return validTitleObject;
});

const validateArticleSubtitle = computed(() => {
  const subtitleValue = state.inputValues.subtitle;
  const validSubtitleObject = validator.validateArticleSubtitle(subtitleValue);
  return validSubtitleObject;
});

const categoryOptions = computed(() => {
  const options = state.categories.map((cat) => {
    const categoryTitle = cat.title;
    return categoryTitle;
  });

  return options;
});

// Methods
function onContentChangeEvent(changedContents) {
  console.log(changedContents);
}

function onInputValueChangeEvent(name, value) {
  state.inputValues[name] = value;
}

function onSelectValueChangeEvent(value) {
  state.inputValues.selectedCategory = value;
}

function onUploadButtonClickEvent(e) {
  const input = document.createElement("input");
  state.contents += input;
}
</script>
