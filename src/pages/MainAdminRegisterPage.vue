<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <RegisterFormBox
          :inputValues="state.inputValues"
          @onInputValueChangeEvent="onInputValueChangeEvent"
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
  },
});

// Methods
function onInputValueChangeEvent(name, value) {
  state.inputValues[name] = value;
}

function onRegsiterubmitButtonClickEvent() {
  errorUtil.notImplemented("Login Button is not implemented");
}
</script>
