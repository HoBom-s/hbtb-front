<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h6" :style="{ fontWeight: palette.fontWeight.bold }">
        Article Options
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="col q-row-gutter-sm">
        <div
          :style="{
            fontWeight: palette.fontWeight.bold,
            fontSize: palette.fontSize.l,
          }"
        >
          Category
        </div>
        <div>
          <AppSelect
            :selectLabel="'Choose category'"
            :options="props.categories"
            :modelValues="props.selectedCategory"
            :isMarginTop="true"
            @onSelectValueChangeEvent="onSelectValueChangeEvent"
          />
        </div>
        <div
          class="q-mt-md q-mb-sm"
          :style="{
            fontWeight: palette.fontWeight.bold,
            fontSize: palette.fontSize.l,
          }"
        >
          Tag
        </div>
        <TagItemList :tags="props.tags" />
        <div
          class="q-mt-md q-mb-sm"
          :style="{
            fontWeight: palette.fontWeight.bold,
            fontSize: palette.fontSize.l,
          }"
        >
          Thumbnail
        </div>
        <div>
          <AppUploader :isMarginTop="false" :uploadLabel="'Thumbnail'" />
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-pa-md">
      <q-btn
        flat
        outlined
        label="Publish"
        class="bg-orange text-white fit"
        :style="{
          fontWeight: palette.fontWeight.bigBold,
          fontSize: palette.fontSize.xl,
        }"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

import AppSelect from "@/components/common/AppSelect.vue";
import AppUploader from "@/components/common/AppUploader.vue";
import TagItemList from "@/components/tags/TagItemList.vue";

import palette from "@/utils/palette";

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },

  tags: {
    type: Array,
    required: true,
  },

  selectedCategory: {
    type: String,
    required: true,
  },
});

const emits = defineEmits({
  // No validation
  onSelectValueChangeEvent: () => true,
});

function onSelectValueChangeEvent(value) {
  emits("onSelectValueChangeEvent", value);
}
</script>
