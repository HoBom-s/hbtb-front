<template>
  <q-drawer
    showIfAbove
    bordered
    :width="260"
    :breakpoint="500"
    :modelValue="props.isSidebarDrawerOpen"
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
                class="cursor-pointer"
                activeClass="q-item-no-link-highlighting"
              >
                <AppMannageSidebarItem :menuItem="childItem" />
              </q-item>
            </q-list>
          </q-expansion-item>
        </div>
        <div v-else>
          <q-item class="cursor-pointer">
            <AppMannageSidebarItem :menuItem="menuItem" />
          </q-item>
        </div>
      </div>
    </q-list>
    <div
      class="fixed-bottom q-mb-md"
      :style="{ display: 'flex', justifyContent: 'center' }"
    >
      <q-btn
        outline
        label="Publish"
        class="q-pa-sm"
        :style="{
          width: '220px',
          fontWeight: palette.fontWeight.bigBold,
        }"
        @click="onPublishButtonClickEvent"
      />
    </div>
  </q-drawer>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

import AppMannageSidebarItem from "@/components/common/AppMannageSidebarItem.vue";

import palette from "@/utils/palette";

const props = defineProps({
  isSidebarDrawerOpen: {
    type: Boolean,
    required: true,
  },

  manageSidebarItems: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits({
  // No validation
  onPublishButtonClickEvent: () => true,
});

// Methods
function onPublishButtonClickEvent() {
  emits("onPublishButtonClickEvent");
}
</script>
