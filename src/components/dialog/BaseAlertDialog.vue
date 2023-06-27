<template>
  <q-dialog :modelValue="props.isDialogOpen">
    <q-card style="width: 300px">
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
        {{ props.content }}
      </q-card-section>
      <q-card-section
        align="right"
        class="bg-white"
        :style="{ color: palette.colors.mainOrange }"
      >
        <q-btn
          flat
          label="OK"
          @click="onBaseAlertDialogCloseButtonClickEvent"
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

  content: {
    type: String,
    required: true,
  },
});

const emits = defineEmits({
  // No validation
  onBaseAlertDialogCloseButtonClickEvent: () => true,
});

// Methods
function onBaseAlertDialogCloseButtonClickEvent() {
  emits("onBaseAlertDialogCloseButtonClickEvent", false);
}
</script>
