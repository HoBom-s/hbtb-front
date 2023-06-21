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
  </q-layout>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";

import LoginFormBox from "@/components/auth/LoginFormBox.vue";

import validator from "@/utils/validator";
import errorUtil from "@/utils/errorUtil";

const state = reactive({
  inputValues: {
    nickname: "",

    password: "",
  },
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

function onLoginSubmitButtonClickEvent() {
  errorUtil.notImplemented("Login Button is not implemented");
}

function onHomeButtonClickEvent() {
  router.push("/");
}

function onSignUpButtonClickEvent() {
  router.push("/admin/register");
}
</script>
