<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
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
          @onRegsiterubmitButtonClickEvent="onRegsiterubmitButtonClickEvent"
          @onHomeButtonClickEvent="onHomeButtonClickEvent"
          @onSignInSubmitButtonClickEvent="onSignInSubmitButtonClickEvent"
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";

import RegisterFormBox from "@/components/auth/RegisterFormBox.vue";

import validator from "@/utils/validator";
import errorUtil from "@/utils/errorUtil";

const state = reactive({
  inputValues: {
    nickname: "",

    password: "",

    passwordCheck: "",

    profileImg: "",

    role: "",

    introduction: "",
  },
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
  const passwordCheckValue = state.inputValues.password;
  const validateObject = validator.validatePasswordCheck(
    passwordCheckValue,
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

function onRegsiterubmitButtonClickEvent() {
  errorUtil.notImplemented("Login Button is not implemented");
}

function onHomeButtonClickEvent() {
  router.push("/");
}

function onSignInSubmitButtonClickEvent() {
  router.push("/admin/login");
}
</script>
