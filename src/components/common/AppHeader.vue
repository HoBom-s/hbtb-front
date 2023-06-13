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
    fontSize: palette.fontSize.l,
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
    height: "100%",
    objectFit: "cover",
  };
});

// Methods
function onCategoryItemClickEvent(clickedCategory) {
  emits("onCategoryItemClickEvent", clickedCategory);
}
</script>
