import { defineEmits, computed } from "vue";

import errorUtil from "@/utils/errorUtil";

/**
 * Pagination Hook
 *    단순 Pagination Buttons or More Button에서도 사용할 수 있는 로직
 *
 * @param {number} curPageNumber
 * @param {number} totalPageNumber
 * @param {number} divider
 * @returns {
 *  Array,
 *  Function,
 *  Function,
 *  Function
 * }
 */
const usePaginate = (curPageNumber, totalPageNumber, divider = 5) => {
  errorUtil.invalidParameter(
    typeof curPageNumber === "number",
    "The current page number must be number"
  );

  errorUtil.invalidParameter(
    typeof totalPageNumber === "number",
    "The total page number must be number"
  );

  const emits = defineEmits({
    onPrevButtonClickEvent: () => true,

    onNextButtonClickEvent: () => true,

    onPageNumberButtonClickEvent: () => true,
  });

  const isFirstPage = computed(() => {
    return curPageNumber === 1;
  });

  const isLastPage = computed(() => {
    return curPageNumber === totalPageNumber;
  });

  /**
   * Button 형식의 Pagination이라면 아래의 pageNumberList Array가 숫자로 보여져야 한다.
   *    가정: curPage가 1이고, divider가 5인 경우
   *            startPageNumber = (Math.ceil(1 / 5) - 1) * 5 + 1 이므로, 1이 반환.
   *          curPage가 6이고, divider가 5인 경우
   *            startPageNumber = (Math.ceil(6 / 5) - 1) * 5 + 1 이므로, 6이 반환.
   */
  const pageNumberList = computed(() => {
    const startPageNumber = (Math.ceil(curPage / divider) - 1) * divider + 1;
    const pageNumberArray = Array.from({ length: divider })
      .fill(0)
      .map((_, idx) =>
        startPageNumber + idx <= totalPageNumber ? startPageNumber + idx : null
      )
      .filter((ele) => Number.isInteger(ele));
    return pageNumberArray;
  });

  // Methods
  const onPrevButtonClickEvent = () => {
    if (isFirstPage) {
      return;
    }

    emits("onPrevButtonClickEvent");
  };

  const onNextButtonClickEvent = () => {
    if (isLastPage) {
      return;
    }

    emits("onNextButtonClickEvent");
  };

  const onPageNumberButtonClickEvent = (clickedPageNumber) => {
    emits("onPageNumberButtonClickEvent", clickedPageNumber);
  };

  return {
    pageNumberList,
    onPrevButtonClickEvent,
    onNextButtonClickEvent,
    onPageNumberButtonClickEvent,
  };
};

export default usePaginate;
