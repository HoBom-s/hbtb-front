<template>
  <CommonManageLayoutContainer>
    <PostHeaderBox
      :inputValues="state.inputValues"
      :validateArticleTitle="validateArticleTitle"
      :validateArticleSubtitle="validateArticleSubtitle"
      @onInputValueChangeEvent="onInputValueChangeEvent"
    />
    <q-btn
      flat
      outlined
      label="Edit"
      class="bg-orange text-white q-mt-md q-pl-lg q-pr-lg"
      :style="{
        fontWeight: palette.fontWeight.bigBold,
        fontSize: palette.fontSize.xl,
      }"
      @click="onArticleEditButtonClickEvent"
    />
    <div class="row q-mt-md q-col-gutter-md">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <v-md-preview height="780px" :text="state.inputValues.contents" />
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
import { reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

import useStorage from "@/hooks/useStorage";
import useValidate from "@/hooks/useValidate";

import CommonManageLayoutContainer from "@/containers/CommonManageLayoutContainer.vue";
import PostHeaderBox from "@/components/publish/PostHeaderBox.vue";
import BaseAlertDialog from "@/components/dialog/BaseAlertDialog.vue";

import {
  getArticleFindById,
  updateArticleRequestService,
} from "@/apis/articleFetcher";
import { userGetMyInformationService } from "@/apis/userFetcher";

import { agent } from "@/types";

import namespace from "@/static/name";

import validator from "@/utils/validator";
import palette from "@/utils/palette";

const { path } = history.state;

const router = useRouter();

const state = reactive({
  inputValues: {
    title: "",
    subtitle: "",
    contents: "",
    path: "",
  },

  articleObject: {},

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
      const loopErr = document.getElementById(
        "webpack-dev-server-client-overlay-div"
      );
      if (resizeObserverErr) {
        resizeObserverErr.setAttribute("style", "display: none");
      }
      if (resizeObserverErrDiv) {
        resizeObserverErrDiv.setAttribute("style", "display: none");
      }
      if (loopErr) {
        loopErr.setAttribute("style", "display: none");
      }
    }
  });

  const articleInformation = await getArticleFindById(
    path.slice(1, path.length)
  );

  const {
    _id,
    thumbnail,
    title,
    subtitle,
    contents,
    tags,
    writers,
    createdAt,
    updatedAt,
  } = articleInformation;

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

  state.inputValues.title = articleObject.title;
  state.inputValues.subtitle = articleObject.subtitle;
  state.inputValues.contents = articleObject.contents;
  state.inputValues.path = articleObject.path;

  state.articleObject = articleObject;
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

// Methods
function onInputValueChangeEvent(name, value) {
  state.inputValues[name] = value;
}

function onBaseAlertDialogCloseButtonClickEvent(isClose) {
  state.isArticlePublishDialogOpen = isClose;
}

async function onArticleEditButtonClickEvent() {
  const [accessToken] = useStorage("accessToken", "session");
  const tokenValue = accessToken.value;

  const [isValidateArticleInformation] = useValidate([
    () => validateArticleTitle.value.hasError === false,
    () => validateArticleSubtitle.value.hasError === false,
  ]);

  if (!isValidateArticleInformation) {
    state.isArticlePublishDialogOpen = true;
    return;
  }

  const { _id, thumbnail, tags, path } = state.articleObject;

  const userInformation = await userGetMyInformationService(tokenValue);

  const updatedArticleResult = await updateArticleRequestService(
    _id,
    thumbnail,
    state.inputValues.title,
    state.inputValues.subtitle,
    state.inputValues.contents,
    tags,
    [userInformation.nickname],
    path,
    tokenValue
  );

  if (updatedArticleResult._id) {
    router.push("/");
  } else {
    state.isArticlePublishDialogOpen = true;
  }
}
</script>
