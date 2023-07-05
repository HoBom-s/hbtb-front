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
        <v-md-editor
          height="780px"
          ref="contentsRef"
          :disabledMenus="[]"
          @uploadImage="onUploadContentImageButtonClickEvent"
        />
      </div>
      <div class="col-md-3 col-sm-12 col-xs-12">
        <PostOptionBox
          :tags="state.tags"
          :selectedTag="state.selectedTag"
          :inputValues="state.inputValues"
          :validatePath="validatePath"
          @onTagItemClickEvent="onTagItemClickEvent"
          @onUploadButtonClickEvent="onUploadButtonClickEvent"
          @onInputValueChangeEvent="onInputValueChangeEvent"
          @onPublishButtonClickEvent="onPublishButtonClickEvent"
        />
      </div>
    </div>
    <BaseAlertDialog
      :isDialogOpen="state.isArticlePublishDialogOpen"
      :title="'WARNING'"
      :content="'Please check your article information'"
      @onBaseAlertDialogCloseButtonClickEvent="
        onBaseAlertDialogCloseButtonClickEvent
      "
    />
  </CommonManageLayoutContainer>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

import useValidate from "@/hooks/useValidate";
import useStorage from "@/hooks/useStorage";

import CommonManageLayoutContainer from "@/containers/CommonManageLayoutContainer.vue";
import PostHeaderBox from "@/components/publish/PostHeaderBox.vue";
import PostOptionBox from "@/components/publish/PostOptionBox.vue";
import BaseAlertDialog from "@/components/dialog/BaseAlertDialog.vue";

import { getAllTagRequestService } from "@/apis/tagFetcher";
import { postImageUploadRequestService } from "@/apis/imageFetcher";
import { createArticleRequestService } from "@/apis/articleFetcher";
import { userGetMyInformationService } from "@/apis/userFetcher";

import { agent } from "@/types";

import namespace from "@/static/name";

import validator from "@/utils/validator";

const router = useRouter();

const contentsRef = ref(null);

const state = reactive({
  tags: [],

  articleThumbnail: "",

  selectedTag: [],

  inputValues: {
    title: "",
    subtitle: "",
    path: "",
  },

  isArticlePublishDialogOpen: false,
});

onMounted(async () => {
  // Apply 'display:none' on Editor's loop error
  window.addEventListener("error", (e) => {
    if (
      e.message === "ResizeObserver loop limit exceeded" ||
      e.message === "Script error."
    ) {
      const resizeObserverErrDiv = document.getElementById(
        "webpack-dev-server-client-overlay-div"
      );
      const resizeObserverErr = document.getElementById(
        "webpack-dev-server-client-overlay"
      );
      if (resizeObserverErr) {
        resizeObserverErr.setAttribute("style", "display: none");
      }
      if (resizeObserverErrDiv) {
        resizeObserverErrDiv.setAttribute("style", "display: none");
      }
    }
  });

  const tagResults = await getAllTagRequestService();

  const tagInstanceArray = tagResults.map((tag) => {
    const { _id, title, path, count, createdAt } = tag;

    const tagObject = agent
      .instanceOfName(namespace.tagSchema)
      .createInstance(_id, title, path, count, createdAt);

    return tagObject;
  });

  state.tags = tagInstanceArray;
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

const validatePath = computed(() => {
  const articlePathValue = state.inputValues.path;
  const validateObject = validator.validateCategoryPath(articlePathValue);
  return validateObject;
});

// Methods
function onInputValueChangeEvent(name, value) {
  state.inputValues[name] = value;
}

function onTagItemClickEvent(clickedTag) {
  const found = state.selectedTag.find((tag) => tag._id === clickedTag._id);
  if (found) {
    state.selectedTag = state.selectedTag.filter(
      (tag) => tag._id !== clickedTag._id
    );
  } else {
    state.selectedTag.push(clickedTag);
  }
}

async function onUploadButtonClickEvent(file) {
  const imageUrl = await postImageUploadRequestService(file);
  state.articleThumbnail = imageUrl;
}

async function onUploadContentImageButtonClickEvent(e, insertImage) {
  const file = e.target.files[0];
  const imageUrl = await postImageUploadRequestService(file);
  insertImage({
    url: imageUrl,
    desc: "Post Image",
    width: "300px",
    height: "300px",
  });
}

function onBaseAlertDialogCloseButtonClickEvent(isClose) {
  state.isArticlePublishDialogOpen = isClose;
}

async function onPublishButtonClickEvent() {
  const [accessToken] = useStorage("accessToken", "session");
  const tokenValue = accessToken.value;

  const userInformation = await userGetMyInformationService(tokenValue);

  const tags = state.selectedTag.map((tag) => {
    const tagObj = {};
    tagObj.title = tag.title;
    tagObj.path = tag.path;
    return tagObj;
  });

  const articleContents = contentsRef.value.text;

  const [isValidateArticleInformation] = useValidate([
    () => validateArticleTitle.value.hasError === false,
    () => validateArticleSubtitle.value.hasError === false,
    () => validatePath.value.hasError === false,
  ]);

  if (
    !isValidateArticleInformation ||
    !articleContents.length ||
    !tags.length ||
    state.articleThumbnail === ""
  ) {
    state.isArticlePublishDialogOpen = true;
    return;
  }

  const createdArticleResult = await createArticleRequestService(
    state.articleThumbnail,
    state.inputValues.title,
    state.inputValues.subtitle,
    articleContents,
    tags,
    [userInformation.nickname],
    state.inputValues.path,
    tokenValue
  );

  if (createdArticleResult._id) {
    router.push("/");
  } else {
    state.isArticlePublishDialogOpen = true;
  }
}
</script>
