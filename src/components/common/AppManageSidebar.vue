<template>
  <q-layout>
    <AppManageHeader />
    <q-drawer
      v-model="leftDrawerOpen"
      showIfAbove
      bordered
      class="bg-primary text-white"
    >
      <q-list>
        <q-item activeClass="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>HoBom Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item activeClass="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item icon="pages" label="Pages">
          <q-list class="q-pl-lg">
            <q-item activeClass="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="email" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Page - 1</q-item-label>
              </q-item-section>
            </q-item>
            <q-item activeClass="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="lock" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Lock Page</q-item-label>
              </q-item-section>
            </q-item>
            <q-item activeClass="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="lock" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Lock Page</q-item-label>
              </q-item-section>
            </q-item>
            <q-item activeClass="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Page - 2</q-item-label>
              </q-item-section>
            </q-item>
            <q-item activeClass="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Page - 3</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-item to="/TreeTable" activeClass="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Category</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Charts" activeClass="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="insert_chart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Charts</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  </q-layout>
</template>

<script setup>
import AppManageHeader from "@/components/common/AppManageHeader.vue";
</script>
