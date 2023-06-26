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
          @onSignUpButtonClickEvent="onSignUpButtonClickEvent"
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
    () => validator.validateNickname(nicknameValue).hasError,
    () => validator.validatePassword(passwordValue).hasError,
  ]);

  if (!isValidUserInformation) {
    state.isLoginWarningDialogOpen = true;
    return;
  }

  const [setSessionItem] = useStorage("accessToken", "session");
  const [refreshTokenValue] = useStorage("refreshToken", "cookie");
  const authAccessToken = await userLoginRequestService(
    nicknameValue,
    passwordValue
  );
  setSessionItem(authAccessToken);
  if (!refreshTokenValue) {
    state.isLoginWarningDialogOpen = true;
    return;
  }
}

function onHomeButtonClickEvent() {
  router.push("/");
}

function onSignUpButtonClickEvent() {
  router.push("/admin/register");
}

function onBaseAlertDialogCloseButtonClickEvent(isClose) {
  state.isLoginWarningDialogOpen = isClose;
}
</script>
