<template>
  <v-container>
    <!-- Notification  -->
    <v-snackbar v-model="snackbar" :timeout="3000" color="red" top>
      {{ snackbarMessage }}
    </v-snackbar>

    <!-- Chart Settings -->
    <v-row>
      <v-col cols="12" md="4">
        <v-color-picker
          v-model="selectedColor"
          label="Select Color"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          :items="sensorOptions"
          v-model="selectedSensors"
          label="Select Sensors"
          multiple
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          :items="chartTypes"
          v-model="selectedChartType"
          label="Select Chart Type"
        />
      </v-col>
    </v-row>

    <v-btn color="primary" @click="addChart">Add Chart</v-btn>

    <!-- Date Picker Range -->
    <v-row>
      <v-col cols="12">
        <v-date-picker
          v-model="dateRange"
          range
          color="#19585F"
          header-color="#19585F"
          class="styled-date-picker"
          @change="filteredCharts"
        ></v-date-picker>
      </v-col>
    </v-row>

    <!-- Display Charts -->
    <v-row>
      <v-col cols="6" v-for="(chart, index) in filteredCharts" :key="index">
        <v-card>
          <v-col class="d-flex align-center justify-space-between">
            <v-card-title>{{ chart.type }} Chart</v-card-title>
            <v-card-subtitle>Color: {{ chart.color }}</v-card-subtitle>
            <v-card-subtitle>Date: {{ chart.createdAt }}</v-card-subtitle>
          </v-col>
          <v-col>
            <apexchart
              :options="getChartOptions(chart)?.options"
              :series="getChartOptions(chart)?.series"
            />
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { ref, computed, onMounted, getCurrentInstance, Ref } from "vue";
import VueApexCharts from "vue-apexcharts";
import { useChartHelpers } from "../helpers/chartHelpers";
export default {
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const instance = getCurrentInstance();
    const store = instance?.proxy.$store;
  
    const snackbar = ref(false);
    const snackbarMessage = ref("");
    const chartTypes = ref(["line", "bar", "radar"]);
    const sensorOptions = computed(() =>
      sensors.value.map((sensor: any) => sensor.type)
    );

    // Cache for chart options with appropriate typing

    
    const {
      dateRange,
      filteredCharts,
      selectedChartType,
      selectedSensors,
      getChartOptions,
      addChart,
      sensors,
      selectedColor
    } = useChartHelpers(store);


    onMounted(() => {
      store?.dispatch("sensors/fetchSensors").catch((error) => {
        console.error("Failed to fetch sensors:", error);
      });
      store?.dispatch("charts/fetchCharts").catch((error) => {
        console.error("Failed to fetch charts:", error);
      });

      filteredCharts;
    });

    return {
      selectedColor,
      selectedSensors,
      selectedChartType,
      dateRange,
      chartTypes,
      sensorOptions,
      filteredCharts,
      addChart,
      getChartOptions,
      snackbar,
      snackbarMessage,
    };
  },
};
</script>

<!-- <style scoped>
</style> -->
