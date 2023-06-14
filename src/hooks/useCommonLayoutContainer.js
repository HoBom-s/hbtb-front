import { reactive, onMounted, computed } from "vue";

import { getAllCategoryRequestService } from "@/apis/categoryFetcher";

import { agent } from "@/types";

import namespace from "@/static/name";

/**
 * 공통적으로 Header, Footer를 가지고 있어야 하는 Component에 대한 로직
 *
 * Category에 대한 공통 로직 처리
 */
const useCommonLayoutContainer = () => {
  const state = reactive({
    categories: [],

    selectedCategory: {},
  });

  onMounted(async () => {
    const categories = await getAllCategoryRequestService();
    const categoryInstanceArray = categories.map((cat) => {
      const { _id, title, path, sortIndex, spot, createdAt, updatedAt } = cat;
      const catObj = agent
        .instanceOfName(namespace.categorySchema)
        .createInstance(
          _id,
          title,
          path,
          sortIndex,
          spot,
          createdAt,
          updatedAt
        );
      return catObj;
    });
    if (categoryInstanceArray.every((cat) => cat.ofPathCondition(cat.path))) {
      state.categories = categoryInstanceArray;
      state.selectedCategory = categoryInstanceArray[0];
    } else {
      state.categories = [];
    }
  });

  const mainContainerStyle = computed(() => {
    return {
      width: "1200px",
      height: "100%",
      margin: "100px auto",
    };
  });

  // Methods
  function onCategoryItemClickEvent(clickedCategory) {
    state.selectedCategory = clickedCategory;
  }

  return {
    state,
    mainContainerStyle,
    onCategoryItemClickEvent,
  };
};

export default useCommonLayoutContainer;
