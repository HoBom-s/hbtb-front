<template>
  <div :style="footerStyle">
    <div :style="footerFontStyle">© HOBOM TECH BLOG.</div>
    <div :style="footerFontStyle">관련사이트</div>
  </div>
</template>

<script setup>
import { computed } from "vue";

import palette from "@/utils/palette";

const footerStyle = computed(() => {
  return {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "80px",
    paddingRight: "80px",
    height: "148px",
    background: palette.colors.mainBlack,
  };
});

const footerFontStyle = computed(() => {
  return {
    color: palette.colors.fontGray,
    fontSize: palette.fontSize.l,
    fontWeight: palette.fontWeight.bigBold,
  };
});
</script>
