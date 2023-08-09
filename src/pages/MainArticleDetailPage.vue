<template>
  <CommonDetailLayoutContainer
    :thumbnail="state.articleInformation.thumbnail"
    :title="state.articleInformation.title"
    :subtitle="state.articleInformation.subtitle"
    :createdDate="state.articleInformation.createdAt"
  >
    <div>
      <div class="text-h6 q-mb-lg">
        <div
          :style="{
            fontSize: '3rem',
            fontWeight: palette.fontWeight.bigBold,
          }"
        >
          {{ state.articleInformation.title }}
        </div>
        <div
          class="q-mt-lg"
          :style="{
            fontSize: palette.fontSize.lg,
            fontWeight: palette.fontWeight.bold,
            color: palette.colors.authorGray,
          }"
        >
          {{ state.articleInformation.subtitle }}
        </div>
        <q-breadcrumbs v-if="state.isAdmin" class="q-mt-md">
          <q-breadcrumbs-el
            label="Edit"
            class="cursor-pointer text-subtitle2"
            @click="onEditButtonClickEvent"
          />
          <q-breadcrumbs-el
            label="Delete"
            class="cursor-pointer text-subtitle2"
            @click="onDeleteButtonClickEvent"
          />
        </q-breadcrumbs>
      </div>
      <div class="q-pt-lg q-pb-lg">
        <v-md-preview :text="state.articleInformation.contents" />
      </div>
      <div class="q-pb-lg">
        <div :style="{ display: 'flex', alignItems: 'center' }">
          <q-avatar size="56px">
            <img :src="state.articleInformation.writers[0].profileImg" />
          </q-avatar>
          <div class="q-pl-md">
            <div :style="{ fontWeight: palette.fontWeight.bold }">
              by {{ state.articleInformation.writers[0].nickname }}
            </div>
            <div>
              <p>{{ state.articleInformation.writers[0].introduction }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CommonDetailLayoutContainer>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";

import useStorage from "@/hooks/useStorage";

import CommonDetailLayoutContainer from "@/containers/CommonDetailLayoutContainer.vue";

import {
  getArticleFindById,
  deelteArticleRequestService,
} from "@/apis/articleFetcher";
import { userGetMyInformationService } from "@/apis/userFetcher";

import { agent } from "@/types";

import namespace from "@/static/name";

import palette from "@/utils/palette";

const { articlePath } = history.state;

const router = useRouter();

const state = reactive({
  articleInformation: {
    _id: "",
    thumbnail: "",
    title: "",
    subtitle: "",
    createdAt: "",
    writers: [
      {
        nickname: "",
        profileImg: "",
        introduction: "",
      },
    ],
  },

  isAdmin: false,
});

onMounted(async () => {
  const [accessToken] = useStorage("accessToken", "session");
  const tokenValue = accessToken.value;
  state.isAdmin = tokenValue ? true : false;

  const articleResult = await getArticleFindById(
    articlePath.slice(1, articlePath.length)
  );

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
  } = articleResult;

  const articleResultObject = agent
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

  state.articleInformation = articleResultObject;
});

// Methods
async function onEditButtonClickEvent() {
  const [accessToken] = useStorage("accessToken", "session");

  const writerInformation = state.articleInformation.writers[0];

  const myInformation = await userGetMyInformationService(accessToken.value);

  if (writerInformation._id === myInformation._id) {
    router.push({
      path: "/edit",
      name: "MainArticleEditPage",
      state: {
        path: state.articleInformation.path,
      },
    });
  }
}

async function onDeleteButtonClickEvent() {
  const [accessToken] = useStorage("accessToken", "session");
  const tokenValue = accessToken.value;
  const deletedArticleResult = await deelteArticleRequestService(
    state.articleInformation._id,
    tokenValue
  );
  if (deletedArticleResult) {
    router.push("/");
  }
}
</script>
