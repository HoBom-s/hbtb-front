<template>
  <div :style="footerStyle">
    <div :style="footerFontStyle">
      © HOBOM SERVICE.
      <q-breadcrumbs align="left" class="text-subtitle2">
        <q-breadcrumbs-el
          label="Admin"
          icon="supervisor_account"
          class="cursor-pointer"
          @click="onAdminPageButtonClickEvent"
        />
      </q-breadcrumbs>
    </div>
    <div>
      <q-btn :style="footerButtonStyle" label="Related Pages" class="q-pa-md">
        <q-menu transitionShow="scale" transitionHide="scale">
          <q-list style="min-width: 100px">
            <q-item
              v-for="item of props.categories"
              :key="item.title"
              clickable
            >
              <q-item-section>{{ item.title }}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { useRouter } from "vue-router";

import useStorage from "@/hooks/useStorage";

import palette from "@/utils/palette";

const router = useRouter();

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const footerStyle = computed(() => {
  return {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "80px",
    paddingRight: "80px",
    height: "148px",
    background: palette.colors.mainBlack,
  };
});

const footerFontStyle = computed(() => {
  return {
    color: palette.colors.fontGray,
    fontSize: palette.fontSize.l,
    fontWeight: palette.fontWeight.bigBold,
  };
});

const footerButtonStyle = computed(() => {
  return {
    border: `1px solid ${palette.colors.fontGray}`,
    background: "transparent",
    color: palette.colors.fontGray,
  };
});

// Methods
function onAdminPageButtonClickEvent() {
  const [accessTokenValue] = useStorage("accessToken");
  accessTokenValue.value
    ? router.push("/management")
    : router.push("/admin/login");
}
</script>
