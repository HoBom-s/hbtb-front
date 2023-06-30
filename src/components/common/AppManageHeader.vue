<template>
  <q-header elevated>
    <q-toolbar class="bg-grey-9">
      <q-btn flat round dense icon="menu" />
      <q-toolbar-title
        class="q-ml-sm cursor-pointer"
        @click="onHoBomTitleButtonClickEvent"
      >
        HoBom Tech Blog Service
      </q-toolbar-title>
      <q-space />
      <div class="q-gutter-sm row items-center no-wrap q-mr-sm">
        <q-btn round dense flat style="color: red !important" type="a">
          <i class="fa fa-heart fa-2x fa-beat"></i>
        </q-btn>
        <q-btn round dense flat color="white" icon="notifications">
          <q-badge color="red" textColor="white" floating>5</q-badge>
        </q-btn>
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
});

// Methods
function onHoBomTitleButtonClickEvent() {
  emits("onHoBomTitleButtonClickEvent");
}

function onLogoutButtonClickEvent() {
  emits("onLogoutButtonClickEvent");
}
</script>
