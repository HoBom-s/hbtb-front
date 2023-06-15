<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn flat dense round icon="menu" ariaLabel="Menu" />
      <q-toolbar-title>HoBom Tech Blog Service</q-toolbar-title>
      <q-space />
      <div class="q-gutter-sm row items-center no-wrap">
        <q-btn round dense flat color="white" icon="fab fa-github" type="a">
        </q-btn>
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
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup></script>
