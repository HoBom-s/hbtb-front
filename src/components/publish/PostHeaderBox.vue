<template>
  <div
    class="q-pb-sm"
    :style="{
      color: palette.colors.authorGray,
      fontWeight: palette.fontWeight.bigBold,
      fontSize: '26px',
    }"
  >
    Article Publish
  </div>
  <div class="row q-col-gutter-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <AppInput
        :inputType="'text'"
        :inputLabel="'Main Title'"
        :inputName="'title'"
        :inputValue="props.inputValues.title"
        :isMarginTop="true"
        :validateFormValue="props.validateArticleTitle"
        @onInputValueChangeEvent="onInputValueChangeEvent"
      />
    </div>
    <div class="col-md-6 col-sm-12 col-xs-12">
      <AppInput
        :inputType="'text'"
        :inputLabel="'Main Subtitle'"
        :inputName="'subtitle'"
        :inputValue="props.inputValues.subtitle"
        :isMarginTop="true"
        :validateFormValue="props.validateArticleSubtitle"
        @onInputValueChangeEvent="onInputValueChangeEvent"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

import AppInput from "@/components/common/AppInput.vue";

import palette from "@/utils/palette";

const props = defineProps({
  inputValues: {
    type: Object,
    required: true,
  },

  validateArticleTitle: {
    type: Object,
    required: true,
  },

  validateArticleSubtitle: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits({
  onInputValueChangeEvent: () => true,
});

// Methods
function onInputValueChangeEvent(name, value) {
  emits("onInputValueChangeEvent", name, value);
}
</script>
