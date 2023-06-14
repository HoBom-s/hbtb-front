<template>
  <q-layout view="hHn 1pR fFf">
    <AppHeader
      :categories="state.categories"
      :selectedCategory="state.selectedCategory"
      @onCategoryItemClickEvent="onCategoryItemClickEvent"
    />
    <div :style="mainContainerStyle"><slot></slot></div>
    <AppFooter />
  </q-layout>
</template>

<script setup>
/**
 * Header와 Footer를 달고 있어야 하는 컴포넌트는
 * CommonLayoutContainer로 꼭 감싸주도록 한다.
 *
 * HOC를 이용하고자 했으나 굳이 Composition API에서는 HOC보다는
 * hooks로 공통 로직을 관리하는 것이 유리하다고 판단.
 */

import AppHeader from "../components/common/AppHeader.vue";
import AppFooter from "../components/common/AppFooter.vue";

import useCommonLayoutContainer from "@/hooks/useCommonLayoutContainer";

const { state, mainContainerStyle, onCategoryItemClickEvent } =
  useCommonLayoutContainer();
</script>
