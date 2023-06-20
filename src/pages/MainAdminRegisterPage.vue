<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <RegisterFormBox
          :inputValues="state.inputValues"
          :roleOptions="roleOptions"
          @onInputValueChangeEvent="onInputValueChangeEvent"
          @onUploadButtonClickEvent="onUploadButtonClickEvent"
          @onSelectValueChangeEvent="onSelectValueChangeEvent"
          @onRegsiterubmitButtonClickEvent="onRegsiterubmitButtonClickEvent"
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { reactive } from "vue";

import RegisterFormBox from "@/components/auth/RegisterFormBox.vue";

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

const roleOptions = ["Admin", "Normal"];

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
</script>
