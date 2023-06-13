<template>
  <div>
    <q-toolbar :style="toolbarStyle">
      <q-btn flat label="HBTB" :style="logoStyle" />
      <q-space />
      <CategoryItemList
        :categories="props.categories"
        @onCategoryItemClickEvent="onCategoryItemClickEvent"
      />
    </q-toolbar>
    <div :style="mainContentStyle">
      <img :style="imgStyle" src="../../assets/main-bg.jpg" />
      <div :style="mainFontStyle">
        <div>
          <h1 :style="mainFontFirstStyle">Tech Blog</h1>
          <p :style="mainFontSecondStyle">
            HoBom 서비스의 기술과 노하우를 공유합니다.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, defineProps, defineEmits, onMounted, computed } from "vue";

import CategoryItemList from "../categories/CategoryItemList.vue";

import palette from "@/utils/palette";

const state = reactive({
  headerScrollPosition: null,
});

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits({
  onCategoryItemClickEvent: () => true,
});

onMounted(() => {
  window.addEventListener("scroll", () => {
    state.headerScrollPosition = window.scrollY;
  });
});

const toolbarStyle = computed(() => {
  return {
    height: "84px",
    zIndex: 1,
    transition: "0.5s",
    top: 0,
    position: "fixed",
    background:
      state.headerScrollPosition < 84
        ? "transparent"
        : palette.colors.mainBlack,
  };
});

const logoStyle = computed(() => {
  return {
    fontSize: palette.fontSize.xl,
    fontWeight: palette.fontWeight.bold,
    color: palette.colors.mainWhite,
  };
});

const mainContentStyle = computed(() => {
  return {
    width: "100%",
    height: "420px",
    // paddingTop, Bottom 12px 고려
    top: 0,
    left: 0,
    zIndex: 0,
  };
});

const imgStyle = computed(() => {
  return {
    width: "100%",
    height: "420px",
    objectFit: "cover",
    position: "absolute",
    // 기본 100%
    filter: "brightness(100%)",
  };
});

const mainFontStyle = computed(() => {
  return {
    width: "1200px",
    height: "420px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
});

const mainFontFirstStyle = computed(() => {
  return {
    color: palette.colors.mainWhite,
    height: "70px",
    fontSize: "52px",
    fontWeight: palette.fontWeight.bigBold,
    marginBottom: "24px",
  };
});

const mainFontSecondStyle = computed(() => {
  return {
    color: palette.colors.fontGray,
    fontSize: palette.fontSize.l,
    fontWeight: palette.fontWeight.bold,
    letterSpacing: "-1px",
    lineHeight: "28px",
  };
});

// Methods
function onCategoryItemClickEvent(clickedCategory) {
  emits("onCategoryItemClickEvent", clickedCategory);
}
</script>
