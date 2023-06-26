<template>
  <q-layout>
    <q-page-container>
      <q-page class="column flex-center bg-grey-3">
        <div>
          <q-spinner-cube color="orange" size="2em" />
          <q-tooltip :offset="[0, 8]">Loading...</q-tooltip>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup></script>
