<template>
  <div class="q-mt-md">
    <q-card class="fit" bordered>
      <q-tabs
        dense
        class="text-grey"
        activeColor="orange"
        indicatorColor="orange"
        align="justify"
        :modelValue="props.selectedTabItem"
        @update:modelValue="onTabValueChangeEvent"
      >
        <q-tab
          v-for="item of props.tabItems"
          :key="item.name"
          :name="item.name"
          :label="item.label"
          :icon="item.iconName"
        />
      </q-tabs>
      <q-separator />
      <q-tab-panels :modelValue="props.selectedTabItem" animated>
        <q-tab-panel name="category" class="q-pa-sm">
          <q-list class="rounded-borders" separator>
            <ManagementItemList
              :itemKind="'categories'"
              :categories="props.categories"
              :tags="props.tags"
            />
          </q-list>
        </q-tab-panel>
        <q-tab-panel name="tag" class="q-pa-sm">
          <q-list class="rounded-borders" separator>
            <ManagementItemList
              :itemKind="'tags'"
              :categories="props.categories"
              :tags="props.tags"
            />
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

import ManagementItemList from "./ManagementItemList.vue";

const props = defineProps({
  tabItems: {
    type: Array,
    required: true,
  },

  selectedTabItem: {
    type: String,
    required: true,
  },

  categories: {
    type: Array,
    required: true,
  },

  tags: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits({
  // No validation
  onTabValueChangeEvent: () => true,
});

// Methods
function onTabValueChangeEvent(value) {
  emits("onTabValueChangeEvent", value);
}
</script>
