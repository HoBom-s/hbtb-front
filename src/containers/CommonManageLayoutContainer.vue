<template>
  <q-layout>
    <AppManageHeader
      :userInformation="state.userInofrmation"
      @onHoBomTitleButtonClickEvent="onHoBomTitleButtonClickEvent"
      @onLogoutButtonClickEvent="onLogoutButtonClickEvent"
    />
    <AppManageSidebar
      :manageSidebarItems="manageSidebarItems"
      @onPublishButtonClickEvent="onPublishButtonClickEvent"
    />
    <q-page-container>
      <q-page padding>
        <slot></slot>
      </q-page>
    </q-page-container>
    <BaseEditDialog
      :isDialogOpen="state.isCategoryCreateDialogOpen"
      :title="'CATEGORY CREATE'"
      @onBaseEditDialogCloseButtonClickEvent="
        onBaseCategoryEditDialogCloseButtonClickEvent
      "
      @onBaseEditDialogConfirmButtonClickEvent="
        onBaseCategoryEditDialogAddButtonClickEvent
      "
    >
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
      <AppSelect
        :selectLabel="'Category Spot'"
        :options="categorySpotOptions"
        :modelValues="state.inputValues.categorySpot"
        :isMarginTop="true"
        @onSelectValueChangeEvent="onSelectValueChangeEvent"
      />
    </BaseEditDialog>
    <BaseEditDialog
      :isDialogOpen="state.isTagCreateDialogOpen"
      :title="'TAG CREATE'"
      @onBaseEditDialogCloseButtonClickEvent="
        onBaseTagEditDialogCloseButtonClickEvent
      "
      @onBaseEditDialogConfirmButtonClickEvent="
        onBaseTagEditDialogAddButtonClickEvent
      "
    >
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
    </BaseEditDialog>
  </q-layout>
</template>

<script setup>
import { reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

import useStorage from "@/hooks/useStorage";
import useValidate from "@/hooks/useValidate";

import AppManageHeader from "@/components/common/AppManageHeader.vue";
import AppManageSidebar from "@/components/common/AppManageSidebar.vue";
import AppInput from "@/components/common/AppInput.vue";
import AppSelect from "@/components/common/AppSelect.vue";
import BaseEditDialog from "@/components/dialog/BaseEditDialog.vue";

import { createCategoryRequestService } from "@/apis/categoryFetcher";
import { createTagRequestService } from "@/apis/tagFetcher";
import {
  userGetMyInformationService,
  userLogoutRequestService,
} from "@/apis/userFetcher";

import { agent } from "@/types";

import namespace from "@/static/name";

import validator from "@/utils/validator";
import funcUtil from "@/utils/funcUtil";

const router = useRouter();

const manageSidebarItems = [
  {
    iconName: "dashboard",
    menuTitle: "Dashboard",
    path: "/management",
    hasChild: false,
    onClick: () => router.push("/management"),
  },
  {
    iconName: "pages",
    menuTitle: "Pages",
    hasChild: true,
    childMenuItems: [
      {
        iconName: "code",
        menuTitle: "HoBom Tech Blog",
        onClick: () => router.push("/"),
      },
      {
        iconName: "vpn_lock",
        menuTitle: "Management",
        onClick: () => router.push("/management"),
      },
    ],
  },
  {
    iconName: "list",
    menuTitle: "Category Create",
    hasChild: false,
    onClick: onCategoryButtonClickEvent,
  },
  {
    iconName: "tag",
    menuTitle: "Tag Create",
    hasChild: false,
    onClick: onTagButtonClickEvent,
  },
];

const categorySpotOptions = ["Header", "Footer"];

const state = reactive({
  isCategoryCreateDialogOpen: false,

  isTagCreateDialogOpen: false,

  inputValues: {
    categoryTitle: "",
    categoryPath: "",
    categorySpot: "Header",
    tagTitle: "",
    tagPath: "",
  },

  userInofrmation: {},
});

onMounted(async () => {
  const [accessTokenValue] = useStorage("accessToken", "session");

  const tokenValue = accessTokenValue.value;

  if (!tokenValue) {
    router.push("/admin/login");
  }

  const userInformationResult = await userGetMyInformationService(tokenValue);
  const { _id, nickname, introduction, role, profileImg } =
    userInformationResult;

  const userInformationInstance = agent
    .instanceOfName(namespace.userSchema)
    .createInstance(_id, nickname, introduction, role, profileImg);

  state.userInofrmation = userInformationInstance;
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
function onHoBomTitleButtonClickEvent() {
  router.push("/");
}

async function onLogoutButtonClickEvent() {
  // eslint-disable-next-line no-unused-vars
  const [accessTokenValue, _, removeSessionStorageItem] = useStorage(
    "accessToken",
    "session"
  );

  const tokenValue = accessTokenValue.value;

  const { _id } = state.userInofrmation;

  const logoutResult = await userLogoutRequestService(tokenValue, _id);
  const pickedUserId = funcUtil.pick(logoutResult, "_id");
  if (pickedUserId) {
    removeSessionStorageItem();
    router.push("/");
  }
}

function onPublishButtonClickEvent() {
  router.push("/post");
}

function onCategoryButtonClickEvent() {
  state.isCategoryCreateDialogOpen = true;
}

function onTagButtonClickEvent() {
  state.isTagCreateDialogOpen = true;
}

function onInputValueChangeEvent(name, value) {
  state.inputValues[name] = value;
}

function onSelectValueChangeEvent(value) {
  state.inputValues.categorySpot = value;
}

function onBaseCategoryEditDialogCloseButtonClickEvent() {
  state.inputValues.categoryTitle = "";
  state.inputValues.categoryPath = "";
  state.inputValues.categorySpot = "Header";
  state.isCategoryCreateDialogOpen = false;
}

async function onBaseCategoryEditDialogAddButtonClickEvent() {
  const { categoryTitle, categoryPath, categorySpot } = state.inputValues;

  const [isValidCategoryInformation] = useValidate([
    () => validator.validateCategoryTitle(categoryTitle).hasError === false,
    () => validator.validateCategoryPath(categoryPath).hasError === false,
  ]);

  if (!isValidCategoryInformation) {
    return;
  }

  const createdCategoryResult = await createCategoryRequestService(
    categoryTitle,
    categoryPath,
    1,
    categorySpot
  );

  if (createdCategoryResult._id) {
    state.inputValues.categoryTitle = "";
    state.inputValues.categoryPath = "";
    state.inputValues.categorySpot = "Header";
    state.isCategoryCreateDialogOpen = false;
    window.location.reload();
  }
}

function onBaseTagEditDialogCloseButtonClickEvent() {
  state.inputValues.tagTitle = "";
  state.inputValues.tagPath = "";
  state.isTagCreateDialogOpen = false;
}

async function onBaseTagEditDialogAddButtonClickEvent() {
  const { tagTitle, tagPath } = state.inputValues;

  const [isValidTagInformation] = useValidate([
    () => validator.validateTagTitle(tagTitle).hasError === false,
    () => validator.validateTagPath(tagPath).hasError === false,
  ]);

  if (!isValidTagInformation) {
    return;
  }

  const createdTagResult = await createTagRequestService(tagTitle, tagPath);

  if (createdTagResult._id) {
    state.inputValues.tagTitle = "";
    state.inputValues.tagPath = "";
    state.isTagCreateDialogOpen = false;
    window.location.reload();
  }
}
</script>
