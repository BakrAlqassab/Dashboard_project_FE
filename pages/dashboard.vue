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
              class="mb-4"
              dense
              outlined
            />
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-select
              :items="chartTypes"
              v-model="selectedChartType"
              label="Select Chart Type"
              class="mb-4"
              dense
              outlined
            />
          </v-col>
          <v-col cols="4" class="text-center ma-auto">
            <v-btn color="primary" class="pa-4" block @click="addChart"> Add Chart </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- <v-divider class="my-4"></v-divider> -->

    <!-- Date Picker Range -->
    <v-card outlined class="d-flex justify-center mb-12">
      <v-col cols="12" md="4">
        <v-card-title>Select Date Range</v-card-title>
        <v-card-text>
          <v-date-picker
            v-model="dateRange"
            range
            color="primary"
            header-color="primary"
            class="styled-date-picker d-flex justify-center"
            @change="filteredCharts"
          />
        </v-card-text>
      </v-col>
    </v-card>

    <v-divider class="my-4"></v-divider>

    <!-- Display Charts -->
    <v-row v-if="filteredCharts.length" class="justify-lg-start justify-space-around">
      <v-col
        cols="12"
        lg="3"
        md="5"
        v-for="(chart, index) in filteredCharts"
        :key="chart.id"
          :ref="index === filteredCharts.length - 1 ? 'lastChart' : null"
      >
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
    <v-row v-else>
      <v-col>
        <noCharts />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { ref, computed, onMounted, getCurrentInstance } from "vue";
import VueApexCharts from "vue-apexcharts";
import { useChartHelpers } from "../helpers/chartHelpers";
import noCharts from "../components/noCharts.vue";

export default {
  components: {
    apexchart: VueApexCharts,
    noCharts,
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
      lastChart,
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
      lastChart,
      getChartOptions,
      snackbar,
      snackbarMessage,
    };
  },
};
</script>

<style>
/* Ensure that the date picker is fully responsive */
@media screen and (max-width: 768px) {
  ::v-deep .v-picker__body {
    width: 100%;
  }
}
</style>
