<template>
  <div class="flex" flat :style="btnBoxStyle">
    <q-btn
      flat
      size="sm"
      :style="{ width: '40px', height: '36px' }"
      @click="onPrevButtonClickEvent"
    >
      <q-icon name="navigate_before" />
    </q-btn>
    <PaginatorButton
      v-for="item of pageNumberList"
      :key="item"
      :curPageNumber="props.curPageNumber"
      :item="item"
      @onPageNumberButtonClickEvent="onPageNumberButtonClickEvent"
    />
    <q-btn
      flat
      size="sm"
      :style="{ width: '40px', height: '36px' }"
      @click="onNextButtonClickEvent"
    >
      <q-icon name="navigate_next" />
    </q-btn>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

import PaginatorButton from "./PaginatorButton.vue";

const props = defineProps({
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
    required: true,
  },
});

const emits = defineEmits({
  // No validation
  onPrevButtonClickEvent: () => true,

  // No validation
  onNextButtonClickEvent: () => true,

  // No validation
  onPageNumberButtonClickEvent: () => true,
});

/**
 * Button 형식의 Pagination이라면 아래의 pageNumberList Array가 숫자로 보여져야 한다.
 *    가정: curPage가 1이고, divider가 5인 경우
 *            startPageNumber = (Math.ceil(1 / 5) - 1) * 5 + 1 이므로, 1이 반환.
 *          curPage가 6이고, divider가 5인 경우
 *            startPageNumber = (Math.ceil(6 / 5) - 1) * 5 + 1 이므로, 6이 반환.
 */
const pageNumberList = computed(() => {
  const startPageNumber =
    (Math.ceil(props.curPageNumber / props.divider) - 1) * props.divider + 1;
  const pageNumberArray = Array.from({ length: props.divider })
    .fill(0)
    .map((_, idx) =>
      startPageNumber + idx <= props.totalPageNumber
        ? startPageNumber + idx
        : null
    )
    .filter((ele) => Number.isInteger(ele));
  return pageNumberArray;
});

const btnBoxStyle = computed(() => {
  return {
    alignItems: "center",
  };
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
