<template>
  <v-container fluid>
    <!-- Notification -->
    <v-snackbar v-model="snackbar" :timeout="3000" color="red" top>
      {{ snackbarMessage }}
    </v-snackbar>

    <!-- Chart Settings -->
    <v-card class="mb-12 pa-4" outlined>
  <v-card-title>Chart Settings</v-card-title>
  <v-card-text>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-color-picker
          v-model="selectedColor"
          label="Select Color"
          hide-inputs
          class="mb-4"
        />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-select
          :items="sensorOptions"
          v-model="selectedSensors"
          label="Select Sensors"
          multiple
          chips
          class="mb-4"
        />
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-select
          :items="chartTypes"
          v-model="selectedChartType"
          label="Select Chart Type"
          class="mb-4"
        />
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn color="primary" block @click="addChart">
          Add Chart
        </v-btn>
      </v-col>
    </v-row>
  </v-card-text>
</v-card>

<v-divider class="my-4"></v-divider>

    <!-- Date Picker Range -->
    <v-card outlined class="d-flex justify-center mb-12" >
      <v-col cols="12" md="6">
        <v-card-title>Select Date Range</v-card-title>
        <v-card-text>
          <v-date-picker
            v-model="dateRange"
            range
            color="primary"
            header-color="primary"
            class="styled-date-picker d-flex justdify-center"
            @change="filteredCharts"
          />
        </v-card-text>
      </v-col>
    </v-card>

    <v-divider class="my-4"></v-divider>
    <!-- Display Charts -->
    <v-row class="justify-lg-start  justify-space-around">
      <v-col cols="12" xl="3" md="5" v-for="chart in filteredCharts" :key="chart.id" >
        <v-card outlined>
          <v-card-subtitle>Color: {{ chart.color }}</v-card-subtitle>
          <v-card-subtitle>Date: {{ chart.createdAt }}</v-card-subtitle>
          <v-card-text>
            <apexchart
              :options="getChartOptions(chart)?.options"
              :series="getChartOptions(chart)?.series"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { ref, computed, onMounted, getCurrentInstance } from "vue";
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

    const {
      dateRange,
      filteredCharts,
      selectedChartType,
      selectedSensors,
      getChartOptions,
      addChart,
      sensors,
      selectedColor,
    } = useChartHelpers(store);

    onMounted(() => {
      store?.dispatch("sensors/fetchSensors").catch((error) => {
        snackbarMessage.value = "Failed to fetch sensors.";
        snackbar.value = true;
        console.error("Failed to fetch sensors:", error);
      });
      store?.dispatch("charts/fetchCharts").catch((error) => {
        snackbarMessage.value = "Failed to fetch charts.";
        snackbar.value = true;
        console.error("Failed to fetch charts:", error);
      });
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

<style>
@media screen and (max-width: 768px) {
  ::v-deep .v-picker__body {
    widows: 100%;
  }
}
</style>
