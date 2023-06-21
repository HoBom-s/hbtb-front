<template>
  <q-card class="q-pa-md shadow-2 my_card" bordered>
    <q-card-section class="text-center">
      <div class="text-grey-9 text-h5 text-weight-bold">
        HoBom Tech Blog Service
      </div>
      <div class="q-mt-md text-grey-9 text-h5 text-weight-bold">Sign Up</div>
      <div class="q-mt-md text-grey-8">
        Sign Up below to access your account
      </div>
    </q-card-section>
    <q-card-section>
      <AppInput
        :inputType="'text'"
        :inputLabel="'Nickname'"
        :inputName="'nickname'"
        :inputValue="props.inputValues.nickname"
        :isMarginTop="false"
        :validateFormValue="props.validateRegisterNickname"
        @onInputValueChangeEvent="onInputValueChangeEvent"
      />
      <AppInput
        :inputType="'password'"
        :inputLabel="'Password'"
        :inputName="'password'"
        :inputValue="props.inputValues.password"
        :isMarginTop="true"
        :validateFormValue="props.validateRegisterPassword"
        @onInputValueChangeEvent="onInputValueChangeEvent"
      />
      <AppInput
        :inputType="'password'"
        :inputLabel="'Password check'"
        :inputName="'passwordCheck'"
        :inputValue="props.inputValues.passwordCheck"
        :isMarginTop="true"
        :validateFormValue="props.validateRegisterPasswordCheck"
        @onInputValueChangeEvent="onInputValueChangeEvent"
      />
      <AppUploader
        :isMarginTop="true"
        :uploadLabel="'Profile image file upload'"
        @onUploadButtonClickEvent="onUploadButtonClickEvent"
      />
      <AppSelect
        :selectLabel="'Role'"
        :options="props.roleOptions"
        :isMarginTop="true"
        :modelValues="props.inputValues.role"
        @onSelectValueChangeEvent="onSelectValueChangeEvent"
      />
      <AppInput
        :inputType="'text'"
        :inputLabel="'Introduction'"
        :inputName="'introduction'"
        :inputValue="props.inputValues.introduction"
        :isMarginTop="true"
        :validateFormValue="props.validateRegisterIntroduction"
        @onInputValueChangeEvent="onInputValueChangeEvent"
      />
    </q-card-section>
    <q-card-section>
      <q-btn
        rounded
        size="md"
        label="SIGN UP"
        class="full-width"
        :style="signUpButtonStyle"
        @click="onRegisterSubmitButtonClickEvent"
      />
    </q-card-section>
    <q-card-section>
      <q-breadcrumbs align="center">
        <q-breadcrumbs-el
          label="Home"
          icon="home"
          class="cursor-pointer"
          @click="onHomeButtonClickEvent"
        />
        <q-breadcrumbs-el
          label="Sign in"
          class="cursor-pointer"
          @click="onSignInSubmitButtonClickEvent"
        />
      </q-breadcrumbs>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

import AppInput from "@/components/common/AppInput.vue";
import AppSelect from "@/components/common/AppSelect.vue";
import AppUploader from "@/components/common/AppUploader.vue";

import palette from "@/utils/palette";

const props = defineProps({
  inputValues: {
    type: Object,
    required: true,
  },

  roleOptions: {
    type: Array,
    required: true,
  },

  validateRegisterNickname: {
    type: Object,
    required: true,
  },

  validateRegisterPassword: {
    type: Object,
    required: true,
  },

  validateRegisterPasswordCheck: {
    type: Object,
    required: true,
  },

  validateRegisterIntroduction: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits({
  // No validation
  onInputValueChangeEvent: () => true,

  // No validation
  onUploadButtonClickEvent: () => true,

  // No validation
  onSelectValueChangeEvent: () => true,

  // No validation
  onRegisterSubmitButtonClickEvent: () => true,

  // No validation
  onHomeButtonClickEvent: () => true,

  // No validation
  onSignInSubmitButtonClickEvent: () => true,
});

const signUpButtonStyle = computed(() => {
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

function onUploadButtonClickEvent(value) {
  emits("onUploadButtonClickEvent", value);
}

function onSelectValueChangeEvent(value) {
  emits("onSelectValueChangeEvent", value);
}

function onRegisterSubmitButtonClickEvent() {
  emits("onRegisterSubmitButtonClickEvent");
}

function onHomeButtonClickEvent() {
  emits("onHomeButtonClickEvent");
}

function onSignInSubmitButtonClickEvent() {
  emits("onSignInSubmitButtonClickEvent");
}
</script>
