<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <LoginFormBox
          @onInputValueChangeEvent="onInputValueChangeEvent"
          @onLoginSubmitButtonClickEvent="onLoginSubmitButtonClickEvent"
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { reactive } from "vue";

import LoginFormBox from "@/components/auth/LoginFormBox.vue";

import errorUtil from "@/utils/errorUtil";

const state = reactive({
  inputValues: {
    email: "",
    password: "",
  },
});

// Methods
function onInputValueChangeEvent(name, value) {
  state.inputValues[name] = value;
}

function onLoginSubmitButtonClickEvent() {
  errorUtil.notImplemented("Login Button is not implemented");
}
</script>
