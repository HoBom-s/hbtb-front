<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <LoginFormBox
          :inputValues="state.inputValues"
          :validateLoginNickname="validateLoginNickname"
          :validateLoginPassword="validateLoginPassword"
          @onInputValueChangeEvent="onInputValueChangeEvent"
          @onLoginSubmitButtonClickEvent="onLoginSubmitButtonClickEvent"
          @onHomeButtonClickEvent="onHomeButtonClickEvent"
        />
      </q-page>
    </q-page-container>
    <BaseAlertDialog
      :isDialogOpen="state.isLoginWarningDialogOpen"
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
import useStorage from "@/hooks/useStorage";

import LoginFormBox from "@/components/auth/LoginFormBox.vue";
import BaseAlertDialog from "@/components/dialog/BaseAlertDialog.vue";

import { userLoginRequestService } from "@/apis/userFetcher";

import validator from "@/utils/validator";
import funcUtil from "@/utils/funcUtil";

const state = reactive({
  inputValues: {
    nickname: "",

    password: "",
  },

  isLoginWarningDialogOpen: false,
});

const router = useRouter();

const validateLoginNickname = computed(() => {
  const nicknameValue = state.inputValues.nickname;
  const validateObject = validator.validateNickname(nicknameValue);
  return validateObject;
});

const validateLoginPassword = computed(() => {
  const passwordValue = state.inputValues.password;
  const validateObject = validator.validatePassword(passwordValue);
  return validateObject;
});

// Methods
function onInputValueChangeEvent(name, value) {
  state.inputValues[name] = value;
}

async function onLoginSubmitButtonClickEvent() {
  const nicknameValue = state.inputValues.nickname;
  const passwordValue = state.inputValues.password;

  if (!nicknameValue || !passwordValue) {
    state.isLoginWarningDialogOpen = true;
    return;
  }

  const [isValidUserInformation] = useValidate([
    () => validator.validateNickname(nicknameValue).hasError === false,
    () => validator.validatePassword(passwordValue).hasError === false,
  ]);

  if (!isValidUserInformation) {
    state.isLoginWarningDialogOpen = true;
    return;
  }

  const authAccessTokenObject = await userLoginRequestService(
    nicknameValue,
    passwordValue
  );

  // eslint-disable-next-line no-unused-vars
  const [_, setSessionItem] = useStorage("accessToken", "session");

  const accessTokenValue = funcUtil.pick(authAccessTokenObject, "accessToken");
  if (!accessTokenValue) {
    state.isLoginWarningDialogOpen = true;
    return;
  }

  setSessionItem(accessTokenValue);
  router.push("/management");
}

function onHomeButtonClickEvent() {
  router.push("/");
}

function onBaseAlertDialogCloseButtonClickEvent(isClose) {
  state.isLoginWarningDialogOpen = isClose;
}
</script>
