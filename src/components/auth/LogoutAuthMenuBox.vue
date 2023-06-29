<template>
  <q-menu>
    <div class="row no wrap q-pa-md">
      <div class="column">
        <div
          class="q-mb-md"
          :style="{
            fontSize: palette.fontSize.l,
            fontWeight: palette.fontWeight.bigBold,
          }"
        >
          ACCOUNT
        </div>
        <div
          class="text-subtitle1"
          :style="{ fontWeight: palette.fontWeight.bold }"
        >
          {{ props.userInformation.nickname }}
        </div>
        <div class="text-subtitle2 q-mt-sm">
          {{ props.userInformation.role }}
        </div>
        <div class="text-subtitle2 q-mt-sm">
          Today : {{ new Date().toString().split("GMT")[0] }}
        </div>
      </div>
      <q-separator vertical inset class="q-mx-lg" />
      <div class="column items-center">
        <q-avatar size="72px">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
        <div
          class="text-subtitle1 q-mt-md q-mb-xs"
          :style="{ fontWeight: palette.fontWeight.bold }"
        >
          {{ props.userInformation.nickname }}
        </div>
        <q-btn
          color="orange"
          label="Logout"
          push
          size="sm"
          v-close-popup
          :style="{ fontWeight: palette.fontWeight.bigBold }"
          @click="onLogoutButtonClickEvent"
        />
      </div>
    </div>
  </q-menu>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

import palette from "@/utils/palette";

const props = defineProps({
  userInformation: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits({
  // No validation
  onLogoutButtonClickEvent: () => true,
});

// Methods
function onLogoutButtonClickEvent() {
  emits("onLogoutButtonClickEvent");
}
</script>
