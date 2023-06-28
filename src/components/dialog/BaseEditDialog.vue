<template>
  <q-dialog :modelValue="props.isDialogOpen" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div
          class="text-h6"
          :style="{ fontWeight: palette.fontWeight.bigBold }"
        >
          <q-icon
            name="warning"
            color="warning"
            size="1.525rem"
            class="q-mr-xs"
          />
          {{ props.title }}
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <slot></slot>
      </q-card-section>
      <q-card-section align="right" class="text-primary">
        <q-btn
          flat
          label="Cancel"
          @click="onBaseEditDialogCloseButtonClickEvent"
        />
        <q-btn
          flat
          label="Confirm"
          @click="onBaseEditDialogAddButtonClickEvent"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

import palette from "@/utils/palette";

const props = defineProps({
  isDialogOpen: {
    type: Boolean,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },
});

const emits = defineEmits({
  // No validation
  onBaseEditDialogCloseButtonClickEvent: () => true,

  onBaseEditDialogAddButtonClickEvent: () => true,
});

function onBaseEditDialogCloseButtonClickEvent() {
  emits("onBaseEditDialogCloseButtonClickEvent", false);
}

function onBaseEditDialogAddButtonClickEvent() {
  emits("onBaseEditDialogAddButtonClickEvent");
}
</script>
