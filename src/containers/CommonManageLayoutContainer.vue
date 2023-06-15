<template>
  <q-layout>
    <AppManageHeader />
    <AppManageSidebar :manageSidebarItems="manageSidebarItems" />
    <q-page-container>
      <q-page padding>
        <slot></slot>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import AppManageHeader from "@/components/common/AppManageHeader.vue";
import AppManageSidebar from "@/components/common/AppManageSidebar.vue";

const manageSidebarItems = [
  {
    iconName: "dashboard",
    menuTitle: "HoBom Dashboard",
    hasChild: false,
  },
  {
    iconName: "dashboard",
    menuTitle: "Dashboard",
    hasChild: false,
  },
  {
    iconName: "pages",
    menuTitle: "Pages",
    hasChild: true,
    childMenuItems: [
      {
        iconName: "email",
        menuTitle: "Page - 1",
      },
      {
        iconName: "lock",
        menuTitle: "Lock Page",
      },
      {
        iconName: "list",
        menuTitle: "Page - 2",
      },
      {
        iconName: "person",
        menuTitle: "Page - 3",
      },
    ],
  },
  {
    iconName: "list",
    menuTitle: "Category",
    hasChild: false,
  },
  {
    iconName: "insert_chart",
    menuTitle: "Charts",
    hasChild: false,
  },
];
</script>
