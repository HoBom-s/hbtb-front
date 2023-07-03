<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2 q-pa-md">
        <RegisterFormBox
          :inputValues="state.inputValues"
          :roleOptions="roleOptions"
          :validateRegisterNickname="validateRegisterNickname"
          :validateRegisterPassword="validateRegisterPassword"
          :validateRegisterPasswordCheck="validateRegisterPasswordCheck"
          :validateRegisterIntroduction="validateRegisterIntroduction"
          @onInputValueChangeEvent="onInputValueChangeEvent"
          @onUploadButtonClickEvent="onUploadButtonClickEvent"
          @onSelectValueChangeEvent="onSelectValueChangeEvent"
          @onRegisterSubmitButtonClickEvent="onRegisterSubmitButtonClickEvent"
          @onHomeButtonClickEvent="onHomeButtonClickEvent"
          @onSignInSubmitButtonClickEvent="onSignInSubmitButtonClickEvent"
        />
      </q-page>
    </q-page-container>
    <BaseAlertDialog
      :isDialogOpen="state.isRegisterWarningDialogOpen"
      :title="'WARNING'"
      :content="'Please check your accounts'"
      @onBaseAlertDialogCloseButtonClickEvent="
        onBaseAlertDialogCloseButtonClickEvent
      "
    />
  </q-layout>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";

import useValidate from "@/hooks/useValidate";

import RegisterFormBox from "@/components/auth/RegisterFormBox.vue";
import BaseAlertDialog from "@/components/dialog/BaseAlertDialog.vue";

import { userRegisterRequestService } from "@/apis/userFetcher";
import { postImageUploadRequestService } from "@/apis/imageFetcher";

import validator from "@/utils/validator";

const state = reactive({
  inputValues: {
    nickname: "",

    password: "",

    passwordCheck: "",

    profileImg: "",

    role: "",

    introduction: "",
  },

  isRegisterWarningDialogOpen: false,
});

const router = useRouter();

const roleOptions = ["Admin", "Normal"];

const validateRegisterNickname = computed(() => {
  const nicknameValue = state.inputValues.nickname;
  const validateObject = validator.validateNickname(nicknameValue);
  return validateObject;
});

const validateRegisterPassword = computed(() => {
  const passwordValue = state.inputValues.password;
  const validateObject = validator.validatePassword(passwordValue);
  return validateObject;
});

const validateRegisterPasswordCheck = computed(() => {
  const passwordValue = state.inputValues.password;
  const validateObject = validator.validatePasswordCheck(
    passwordValue,
    state.inputValues.passwordCheck
  );
  return validateObject;
});

const validateRegisterIntroduction = computed(() => {
  const introductionValue = state.inputValues.introduction;
  const validateObject = validator.validateIntroduction(introductionValue);
  return validateObject;
});

// Methods
function onInputValueChangeEvent(name, value) {
  state.inputValues[name] = value;
}

function onUploadButtonClickEvent(value) {
  state.inputValues.profileImg = value;
}

function onSelectValueChangeEvent(value) {
  state.inputValues.role = value;
}

async function onRegisterSubmitButtonClickEvent() {
  const { nickname, password, passwordCheck, role, introduction } =
    state.inputValues;

  const inputValueCheck = [
    nickname,
    password,
    passwordCheck,
    role,
    introduction,
  ].every((value) => value !== "");

  if (!inputValueCheck) {
    state.isRegisterWarningDialogOpen = true;
    return;
  }

  const [isValidRegisterUserInformation] = useValidate([
    () => validator.validateNickname(nickname).hasError === false,
    () => validator.validatePassword(password).hasError === false,
    () =>
      validator.validatePasswordCheck(password, state.inputValues.passwordCheck)
        .hasError === false,
    () => role !== "",
    () => validator.validateIntroduction(introduction).hasError === false,
  ]);

  if (!isValidRegisterUserInformation) {
    state.isRegisterWarningDialogOpen = true;
    return;
  }

  // TODO: 기본 이미지로 변경 & 닉네임 중복검사
  const tempImgUrl = "https://cdn.quasar.dev/img/boy-avatar.png";
  const uploadImageUrl = await postImageUploadRequestService(
    state.inputValues.profileImg
  );
  const imageUrl = uploadImageUrl ? uploadImageUrl : tempImgUrl;

  const registerResult = await userRegisterRequestService(
    nickname,
    password,
    imageUrl,
    role,
    introduction
  );

  if (registerResult._id) {
    router.push("/admin/login");
    return;
  }

  state.isRegisterWarningDialogOpen = true;
}

function onHomeButtonClickEvent() {
  router.push("/");
}

function onSignInSubmitButtonClickEvent() {
  router.push("/admin/login");
}

function onBaseAlertDialogCloseButtonClickEvent(isClose) {
  state.isRegisterWarningDialogOpen = isClose;
}
</script>
