<template>
  <div>
    <q-toolbar :style="toolbarStyle">
      <q-btn
        flat
        label="HoBom Tech"
        :style="logoStyle"
        @click="onLogoButtonClickEvent"
      />
      <q-space />
      <CategoryItemList
        :categories="props.categories"
        :selectedCategory="props.selectedCategory"
        :isSearchItemClick="state.isSearchItemClick"
        @onCategoryItemClickEvent="onCategoryItemClickEvent"
        @onSearchItemClickEvent="onSearchItemClickEvent"
      />
    </q-toolbar>
    <div :style="mainContentStyle">
      <img
        v-if="props.thumbnail"
        :style="thumbnailStype"
        :src="props.thumbnail"
      />
      <img v-else :style="imgStyle" src="../../assets/main-bg.jpg" />
      <div :style="mainFontStyle">
        <div v-if="props.title">
          <h1 :style="mainDetailFontFirstStyle">{{ props.title }}</h1>
          <p :style="mainFontSecondStyle">{{ props.subtitle }}</p>
          <p class="q-mt-xl" :style="mainFontSecondStyle">
            {{ props.createdDate.split("T")[0] }}
          </p>
        </div>
        <div v-else>
          <h1 :style="mainFontFirstStyle">Tech Blog</h1>
          <p :style="mainFontSecondStyle">
            HoBom 서비스의 기술과 노하우를 공유합니다.
          </p>
        </div>
      </div>
    </div>
    <div
      v-if="searchContentOpenCondition"
      class="fade-in-box"
      :style="mainSearchContentStyle"
    >
      <div
        :style="{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }"
      >
        <div
          :style="{
            width: '1200px',
          }"
        >
          <q-input
            filled
            square
            label="검색어를 입력하세요."
            bgColor="white"
            :modelValue="props.keyword"
            @keydown="onKeywordChangeEvent($event)"
          />
          <div
            class="q-mt-md"
            :style="{
              color: palette.colors.chipGray,
              fontSize: palette.fontSize.xl,
              fontWeight: palette.fontWeight.bold,
            }"
          >
            추천 키워드
          </div>
          <div class="q-mt-md">
            <TagItemList
              :tags="props.tags"
              @onTagItemClickEvent="onTagItemClickEvent"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, defineProps, defineEmits, onMounted, computed } from "vue";

import CategoryItemList from "../categories/CategoryItemList.vue";
import TagItemList from "../tags/TagItemList.vue";

import palette from "@/utils/palette";

const state = reactive({
  headerScrollPosition: null,

  isSearchItemClick: false,
});

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },

  tags: {
    type: Array,
    required: true,
  },

  selectedCategory: {
    type: Object,
    required: true,
  },

  isSearchItemClick: {
    type: Boolean,
    required: true,
  },

  keyword: {
    type: String,
    required: true,
  },

  thumbnail: {
    type: String,
  },

  title: {
    type: String,
  },

  subtitle: {
    type: String,
  },

  createdDate: {
    type: String,
  },
});

const emits = defineEmits({
  // No validation
  onCategoryItemClickEvent: () => true,

  onTagItemClickEvent: () => true,

  onSearchItemClickEvent: () => true,

  onLogoButtonClickEvent: () => true,

  onKeywordChangeEvent: () => true,
});

onMounted(() => {
  window.addEventListener("scroll", () => {
    state.headerScrollPosition = window.scrollY;
  });
});

const searchContentOpenCondition = computed(() => {
  if (props.isSearchItemClick && state.headerScrollPosition < 84) return true;
  return false;
});

const toolbarStyle = computed(() => {
  return {
    height: "84px",
    zIndex: 2,
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

const mainSearchContentStyle = computed(() => {
  return {
    width: "100%",
    height: `${420}px`,
    top: 0,
    left: 0,
    zIndex: 1,
    position: "fixed",
    background: palette.colors.mainBlack,
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

const thumbnailStype = computed(() => {
  return {
    width: "100%",
    height: "420px",
    objectFit: "cover",
    position: "absolute",
    // 기본 100%
    filter: "brightness(30%)",
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

const mainDetailFontFirstStyle = computed(() => {
  return {
    color: palette.colors.mainWhite,
    height: "70px",
    fontSize: "32px",
    fontWeight: palette.fontWeight.bigBold,
    marginBottom: "24px",
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

function onTagItemClickEvent(clickedTag) {
  emits("onTagItemClickEvent", clickedTag);
}

function onSearchItemClickEvent() {
  emits("onSearchItemClickEvent");
}

function onLogoButtonClickEvent() {
  emits("onLogoButtonClickEvent");
}

function onKeywordChangeEvent(e) {
  emits("onKeywordChangeEvent", e);
}
</script>

<style scoped>
.fade-in-box {
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
