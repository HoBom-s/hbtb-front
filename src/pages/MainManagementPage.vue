<template>
  <CommonManageLayoutContainer>
    <CardManagementList :iconPosition="'left'" :cardItems="getCardItems" />
  </CommonManageLayoutContainer>
</template>

<script setup>
import { computed } from "vue";

import CommonManageLayoutContainer from "@/containers/CommonManageLayoutContainer.vue";
import CardManagementList from "@/components/cards/CardManagementList.vue";

const getCardItems = computed(() => {
  const cardItems = [
    {
      title: "My Account",
      icon: "person",
      value: "Robin",
      iconColor: "#3e51b5",
      bgColor: "#5064b5",
    },
    {
      title: "Total Likes",
      icon: "favorite",
      value: "500",
      iconColor: "#FFA630",
      bgColor: "#FFA07A",
    },
    {
      title: "Comments",
      icon: "comments",
      value: "50",
      iconColor: "#ea4b64",
      bgColor: "#ea6a7f",
    },
    {
      title: "Website Visits",
      icon: "monitoring",
      value: "1020",
      iconColor: "#9400D3",
      bgColor: "#9932CC",
    },
  ];
  return cardItems;
});
</script>
