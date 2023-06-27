<template>
  <div class="q-mt-md">
    <q-card class="q-pa-md flex" bordered :style="{ height: '423px' }">
      <div :style="{ display: 'flex', width: '380px' }">
        <Doughnut :data="dataForRender" :options="optionForRender" />
        <Doughnut :data="dataForRender" :options="optionForRender" />
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

import { Doughnut } from "vue-chartjs";

import ChartUtil from "@/utils/chart";

ChartUtil.chartRegist();

const props = defineProps({
  itemObject: {
    type: Object,
    required: true,
  },
});

const dataForRender = computed(() => {
  const datas = {};

  const keys = Object.keys(props.itemObject);

  datas.labels = keys;
  datas.datasets = [];

  const data = {};
  data.data = keys.map((key) => props.itemObject[key].length);

  datas.datasets.push(data);

  return datas;
});

const optionForRender = computed(() => {
  const options = {
    responsive: true,
  };

  return options;
});
</script>
