<template>
  <q-header elevated>
    <q-toolbar class="bg-grey-9">
      <q-btn
        flat
        round
        dense
        icon="menu"
        @click="onSidebarDrawerButtonClickEvent"
      />
      <q-toolbar-title
        class="q-ml-sm cursor-pointer"
        @click="onHoBomTitleButtonClickEvent"
      >
        HoBom Tech Blog Service
      </q-toolbar-title>
      <q-space />
      <div class="q-gutter-sm row items-center no-wrap q-mr-sm">
        <q-btn round flat>
          <q-avatar size="26px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <LogoutAuthMenuBox
            :userInformation="props.userInformation"
            @onLogoutButtonClickEvent="onLogoutButtonClickEvent"
          />
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

import LogoutAuthMenuBox from "../auth/LogoutAuthMenuBox.vue";

const props = defineProps({
  userInformation: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits({
  // No validation
  onHoBomTitleButtonClickEvent: () => true,

  onLogoutButtonClickEvent: () => true,

  onSidebarDrawerButtonClickEvent: () => true,
});

// Methods
function onHoBomTitleButtonClickEvent() {
  emits("onHoBomTitleButtonClickEvent");
}

function onLogoutButtonClickEvent() {
  emits("onLogoutButtonClickEvent");
}

function onSidebarDrawerButtonClickEvent() {
  emits("onSidebarDrawerButtonClickEvent");
}
</script>
