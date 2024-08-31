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

export default {
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const instance = getCurrentInstance();
    const store = instance?.proxy.$store;
    const selectedColor = ref("#000000");
    const selectedSensors = ref<string[]>(["humidity"]);
    const snackbar = ref(false);
    const snackbarMessage = ref("");
    const selectedChartType = ref("line");
    const dateRange = ref([
      new Date(new Date().setDate(new Date().getDate() - 5))
        .toISOString()
        .substr(0, 10),
      new Date(new Date().setDate(new Date().getDate() + 5))
        .toISOString()
        .substr(0, 10),
    ]);

    const sensors = computed(() => store?.getters["sensors/getSensors"] || []);
    const chartTypes = ref(["line", "bar", "radar"]);
    const sensorOptions = computed(() =>
      sensors.value.map((sensor: any) => sensor.type)
    );

    // Cache for chart options with appropriate typing
    const chartOptionsCache: Ref<{ [key: string]: any }> = ref({});

    const getChartOptions = (chart: any) => {
      if (!chart || !chart.sensors) {
        return { options: {}, series: [] };
      }

      // Check if we already have cached options for this chart
      if (chartOptionsCache.value[chart._id]) {
        return chartOptionsCache.value[chart._id];
      }

      // Generate options and series
      const options = {
        chart: {
          type: chart.type,
        },
        title: {
          text: `Chart for ${chart.sensors
            .map((sensor: any) => sensor.type)
            .join(", ")}`,
        },
        colors: [chart.color],
      };

      const series = chart.sensors.map((sensor: any) => ({
        name: sensor.type,
        data: sensor.readings,
      }));

      const chartOptions = { options, series };

      // Cache the result
      chartOptionsCache.value[chart._id] = chartOptions;

      return chartOptions;
    };

    const addChart = () => {
      // Check if a chart type is selected
      if (!selectedChartType.value) {
        snackbarMessage.value = "Please select a chart type!";
        snackbar.value = true;
        return;
      }

      // Check if at least one sensor is selected
      if (selectedSensors.value.length === 0) {
        snackbarMessage.value = "Please select at least one sensor!";
        snackbar.value = true;
        return;
      }
      const newChart = {
        sensors: selectedSensors.value.map((sensorType) => {
          const sensor = sensors.value.find((s: any) => s.type === sensorType);
          return {
            type: sensor?.type,
            readings: sensor?.readings,
          };
        }),
        type: selectedChartType.value,
        color: selectedColor.value,
        date: new Date().toISOString().split("T")[0],
      };

      store?.dispatch("charts/addChart", newChart).catch((error) => {
        console.error("Failed to add chart:", error);
      });

      // Clear the cache after adding a new chart
      chartOptionsCache.value = {};
    };



    const filteredCharts = computed(() => {
      const [start, end] = dateRange.value;
      const startDate = new Date(start);
      const endDate = new Date(end);
      return store?.getters["charts/getChartsByDateRange"](startDate, endDate);
    });

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
