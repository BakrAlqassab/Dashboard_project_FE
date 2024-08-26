<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-color-picker v-model="selectedColor" label="Select Color"></v-color-picker>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            :items="sensors"
            v-model="selectedSensor"
            label="Select Sensor"
            :rules="[v => !!v || 'Sensor is required']"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            :items="chartTypes"
            v-model="selectedChartType"
            label="Select Chart Type"
            :rules="[v => !!v || 'Chart type is required']"
          ></v-select>
        </v-col>
      </v-row>
  
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn color="primary" @click="addChart" :disabled="!canAddChart">Add Chart</v-btn>
        </v-col>
      </v-row>
  
      <v-row class="mt-5">
        <v-col cols="12">
          <v-date-picker v-model="dateRange" range></v-date-picker>
        </v-col>
      </v-row>
  
      <v-row class="mt-5">
        <v-col cols="12">
          <h3>Added Charts</h3>
        </v-col>
      </v-row>
  
      <v-row>
        <v-col v-for="chart in filteredCharts" :key="chart.id" cols="12" md="6">
          <v-card>
            <v-card-title>{{ chart.type }} Chart</v-card-title>
            <v-card-subtitle>Color: {{ chart.color }}</v-card-subtitle>
            <v-card-subtitle>Date: {{ chart.date }}</v-card-subtitle>
            <v-card-subtitle>Sensor: {{ chart.sensor }}</v-card-subtitle>
            <v-card-subtitle>Added by: {{ chart.user.username }}</v-card-subtitle>
            <!-- Add your chart display logic here -->
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed, getCurrentInstance } from 'vue';
  
  export default defineComponent({
    setup() {
      const instance = getCurrentInstance();
      const store = instance?.proxy.$store;
  
      const selectedColor = ref<string>('#FF0000');
      const sensors = ref<string[]>(['Sensor 1', 'Sensor 2', 'Sensor 3']);
      const chartTypes = ref<string[]>(['Line', 'Bar', 'Pie']);
      
      const selectedSensor = ref<string>(sensors.value[0]);
      const selectedChartType = ref<string>(chartTypes.value[0]);
      const dateRange = ref<string[]>([]);
  
      const currentUser = computed(() => store?.getters['auth/getUser']);
      const charts = computed(() => store?.getters['charts/getAllCharts'] || []);
      
      const canAddChart = computed(() => selectedSensor.value && selectedChartType.value);
  
      const addChart = () => {
        if (!canAddChart.value) return;
        
        store?.dispatch('charts/addChart', {
          color: selectedColor.value,
          sensor: selectedSensor.value,
          type: selectedChartType.value,
          date: new Date().toISOString().split('T')[0],
          user: currentUser.value,
        });
      };
  
      const filteredCharts = computed(() => {
        if (!dateRange.value.length) {
          return charts.value.filter((chart: any) => chart.user.id === currentUser.value.id);
        }
        return charts.value.filter((chart: any) => {
          const chartDate = new Date(chart.date);
          const startDate = new Date(dateRange.value[0]);
          const endDate = new Date(dateRange.value[1]);
          return chartDate >= startDate && chartDate <= endDate && chart.user.id === currentUser.value.id;
        });
      });
  
      return {
        selectedColor,
        selectedSensor,
        selectedChartType,
        dateRange,
        sensors,
        chartTypes,
        charts,
        filteredCharts,
        addChart,
        canAddChart,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  