<template>
  <q-card class="q-pa-md shadow-2 my_card" bordered>
    <q-card-section class="text-center">
      <div class="text-grey-9 text-h5 text-weight-bold">
        HoBom Tech Blog Service
      </div>
      <div class="q-mt-md text-grey-9 text-h5 text-weight-bold">Sign In</div>
      <div class="q-mt-md text-grey-8">
        Sign in below to access your account
      </div>
    </q-card-section>
    <q-card-section>
      <AppInput
        :inputType="'text'"
        :inputLabel="'Nickname'"
        :inputName="'nickname'"
        :inputValue="props.inputValues.nickname"
        :isMarginTop="false"
        @onInputValueChangeEvent="onInputValueChangeEvent"
      />
      <AppInput
        :inputType="'password'"
        :inputLabel="'Password'"
        :inputName="'password'"
        :inputValue="props.inputValues.password"
        :isMarginTop="true"
        @onInputValueChangeEvent="onInputValueChangeEvent"
      />
    </q-card-section>
    <q-card-section>
      <q-btn
        rounded
        size="md"
        label="SIGN IN"
        class="full-width"
        :style="signInButtonStyle"
        @click="onLoginSubmitButtonClickEvent"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

import AppInput from "@/components/common/AppInput.vue";

import palette from "@/utils/palette";

const props = defineProps({
  inputValues: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits({
  onInputValueChangeEvent: () => true,

  onLoginSubmitButtonClickEvent: () => true,
});

const signInButtonStyle = computed(() => {
  return {
    borderRadius: "8px",
    color: palette.colors.mainWhite,
    background: palette.colors.mainOrange,
    fontWeight: palette.fontWeight.bold,
  };
});

// Methods
function onInputValueChangeEvent(name, value) {
  emits("onInputValueChangeEvent", name, value);
}

function onLoginSubmitButtonClickEvent() {
  emits("onLoginSubmitButtonClickEvent");
}
</script>
