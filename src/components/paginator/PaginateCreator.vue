<template>
  <div class="q-mt-md">
    <div v-if="matchedPaginator">
      <PaginatorButtonList
        :curPageNumber="props.curPageNumber"
        :totalPageNumber="props.totalPageNumber"
        :divider="props.divider"
        @onPrevButtonClickEvent="onPrevButtonClickEvent"
        @onNextButtonClickEvent="onNextButtonClickEvent"
        @onPageNumberButtonClickEvent="onPageNumberButtonClickEvent"
      />
    </div>
    <!-- TODO: 더보기 버튼 추가 -->
    <div v-else></div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

import PaginatorButtonList from "./PaginatorButtonList.vue";

import funcUtil from "@/utils/funcUtil";

const props = defineProps({
  paginator: {
    type: String,
    required: true,
    // Paginator validation
    validator(value) {
      return ["list", "button"].includes(value);
    },
  },

  curPageNumber: {
    type: Number,
    required: true,
  },

  totalPageNumber: {
    type: Number,
    required: true,
  },

  divider: {
    type: Number,
  },
});

const emits = defineEmits({
  onPrevButtonClickEvent: () => true,

  onNextButtonClickEvent: () => true,

  onPageNumberButtonClickEvent: () => true,
});

const matchedPaginator = computed(() => {
  /**
   * List형식의 Paginator: "list"
   * More Button 형식의 Paginator: "button"
   */
  const matchedPaginatorResult = funcUtil
    .match(props.paginator)
    .on(
      () => props.paginator === "list",
      () => true
    )
    .on(
      () => props.paginator === "button",
      () => false
    )
    .otherwise(() => true);
  return matchedPaginatorResult;
});

// Methods
function onPrevButtonClickEvent() {
  emits("onPrevButtonClickEvent");
}

function onNextButtonClickEvent() {
  emits("onNextButtonClickEvent");
}

function onPageNumberButtonClickEvent(clickedPageNumber) {
  emits("onPageNumberButtonClickEvent", clickedPageNumber);
}
</script>
