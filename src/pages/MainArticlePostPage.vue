<template>
  <CommonManageLayoutContainer>
    <q-editor
      height="auto"
      minHeight="768px"
      maxHeight="100%"
      :modelValue="state.contents"
      @update:modelValue="onContentChangeEvent"
    />
  </CommonManageLayoutContainer>
</template>

<script setup>
import { reactive } from "vue";

import CommonManageLayoutContainer from "@/containers/CommonManageLayoutContainer.vue";

const state = reactive({
  contents: "",
});

// Methods
function onContentChangeEvent(changedContents) {
  console.log(changedContents);
}
</script>
