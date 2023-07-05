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
          class="q-mt-md q-mb-sm"
          :style="{
            fontWeight: palette.fontWeight.bold,
            fontSize: palette.fontSize.l,
          }"
        >
          Tag
        </div>
        <TagItemList
          :tags="props.tags"
          :selectedTag="props.selectedTag"
          @onTagItemClickEvent="onTagItemClickEvent"
        />
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
          <AppUploader
            :isMarginTop="false"
            :uploadLabel="'Thumbnail'"
            @onUploadButtonClickEvent="onUploadButtonClickEvent"
          />
        </div>
        <div
          class="q-mt-md q-mb-sm"
          :style="{
            fontWeight: palette.fontWeight.bold,
            fontSize: palette.fontSize.l,
          }"
        >
          Path
        </div>
        <div>
          <AppInput
            :inputType="'text'"
            :inputLabel="'Path'"
            :inputName="'path'"
            :inputValue="props.inputValues.path"
            :isMarginTop="false"
            :validateFormValue="props.validatePath"
            @onInputValueChangeEvent="onInputValueChangeEvent"
          />
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
        @click="onPublishButtonClickEvent"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

import AppUploader from "@/components/common/AppUploader.vue";
import AppInput from "@/components/common/AppInput.vue";
import TagItemList from "@/components/tags/TagItemList.vue";

import palette from "@/utils/palette";

const props = defineProps({
  tags: {
    type: Array,
    required: true,
  },

  selectedTag: {
    type: Array,
    required: true,
  },

  inputValues: {
    type: Object,
    required: true,
  },

  validatePath: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits({
  // No validation
  onUploadButtonClickEvent: () => true,

  onTagItemClickEvent: () => true,

  onPublishButtonClickEvent: () => true,

  onInputValueChangeEvent: () => true,
});

// Methods
function onUploadButtonClickEvent(file) {
  emits("onUploadButtonClickEvent", file);
}

function onTagItemClickEvent(clickedTag) {
  emits("onTagItemClickEvent", clickedTag);
}

function onPublishButtonClickEvent() {
  emits("onPublishButtonClickEvent");
}

function onInputValueChangeEvent(name, value) {
  emits("onInputValueChangeEvent", name, value);
}
</script>
