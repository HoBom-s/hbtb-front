<template>
  <CommonManageLayoutContainer>
    <q-editor
      height="auto"
      minHeight="768px"
      maxHeight="100%"
      :modelValue="state.contents"
    />
  </CommonManageLayoutContainer>
</template>

<script setup>
import { reactive } from "vue";

import CommonManageLayoutContainer from "@/containers/CommonManageLayoutContainer.vue";

const state = reactive({
  contents: "",
});
</script>
