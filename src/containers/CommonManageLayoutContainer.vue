<template>
  <q-layout>
    <AppManageHeader
      @onHoBomTitleButtonClickEvent="onHoBomTitleButtonClickEvent"
    />
    <AppManageSidebar
      :manageSidebarItems="manageSidebarItems"
      @onPublishButtonClickEvent="onPublishButtonClickEvent"
    />
    <q-page-container>
      <q-page padding>
        <slot></slot>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from "vue-router";

import AppManageHeader from "@/components/common/AppManageHeader.vue";
import AppManageSidebar from "@/components/common/AppManageSidebar.vue";

const router = useRouter();

const manageSidebarItems = [
  {
    iconName: "dashboard",
    menuTitle: "Dashboard",
    path: "/management",
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
    iconName: "tag",
    menuTitle: "Tag",
    hasChild: false,
  },
];

// Methods
function onHoBomTitleButtonClickEvent() {
  router.push("/");
}

function onPublishButtonClickEvent() {
  router.push("/post");
}
</script>
