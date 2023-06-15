<template>
  <q-layout>
    <q-page-container>
      <q-page class="column flex-center bg-grey-4">
        <q-card class="q-pa-xl">
          <div class="text-center group">
            <q-icon class="q-mb-md" name="warning" color="warning" size="2em" />
            <p
              class="caption text-center q-mb-md"
              :style="{ fontSize: palette.fontSize.l }"
            >
              Oops. Nothing here...
            </p>
          </div>
          <p class="text-center group">
            <q-btn
              class="q-pl-md q-pr-md"
              iconRight="home"
              push
              :style="{ background: palette.color.mainOrange }"
              @click="onGoHomeButtonClickEvent"
            >
              Go home
            </q-btn>
          </p>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import palette from "@/utils/palette";

// Methods
function onGoHomeButtonClickEvent() {
  window.location.replace("/");
}
</script>
