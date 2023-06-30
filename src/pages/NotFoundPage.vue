<template>
  <div
    class="fullscreen bg-grey-2 text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div
        :style="{
          fontSize: '17.125rem',
          color: palette.colors.mainOrange,
          fontWeight: palette.fontWeight.bigBold,
        }"
      >
        404
      </div>
      <div
        class="text-h2"
        :style="{ opacity: 0.7, color: palette.colors.mainOrange }"
      >
        Oops. Nothing here...
      </div>
      <q-btn
        class="q-mt-xl q-pa-md"
        color="white"
        textColor="orange"
        outline
        unelevated
        to="/"
        label="Go Home"
        noCaps
        :style="{ fontWeight: palette.fontWeight.bigBold }"
      />
    </div>
  </div>
</template>

<script setup>
import palette from "@/utils/palette";
</script>
