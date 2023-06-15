<template>
  <q-drawer
    showIfAbove
    bordered
    :width="260"
    :breakpoint="500"
    class="bg-grey-9 text-white"
  >
    <q-list>
      <div
        v-for="menuItem of props.manageSidebarItems"
        :key="menuItem.menuTitle"
        activeClass="q-item-no-link-highlighting"
      >
        <div v-if="menuItem.hasChild">
          <q-expansion-item
            :icon="menuItem.iconName"
            :label="menuItem.menuTitle"
            expandSeparator
          >
            <q-list class="q-pl-lg">
              <q-item
                v-for="childItem of menuItem.childMenuItems"
                :key="childItem.menuTitle"
                activeClass="q-item-no-link-highlighting"
              >
                <AppMannageSidebarItem :menuItem="childItem" />
              </q-item>
            </q-list>
          </q-expansion-item>
        </div>
        <div v-else>
          <q-item>
            <AppMannageSidebarItem :menuItem="menuItem" />
          </q-item>
        </div>
      </div>
    </q-list>
  </q-drawer>
</template>

<script setup>
import { defineProps } from "vue";

import AppMannageSidebarItem from "@/components/common/AppMannageSidebarItem.vue";

const props = defineProps({
  manageSidebarItems: {
    type: Array,
    required: true,
  },
});
</script>
