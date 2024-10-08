import { ref, computed, onMounted, Ref, nextTick } from "vue";

export function useChartHelpers(store: any) {
  const users = computed(() => store?.getters["auth/getUsers"] || []);
  const selectedUser = ref<any>(null);
  const dateRange = ref([
    new Date(new Date().setDate(new Date().getDate() - 5))
      .toISOString()
      .substr(0, 10),
    new Date(new Date().setDate(new Date().getDate() + 5))
      .toISOString()
      .substr(0, 10),
  ]);

  const userCharts = computed(() => store?.getters["chart/getAllCharts"] || []);

  const selectUser = async (user: any) => {
    selectedUser.value = user;
    await store?.dispatch("charts/fetchCharts", user._id);
  };

  const filteredCharts = computed(() => {
    const [start, end] = dateRange.value;
    const startDate = new Date(start);
    const endDate = new Date(end);
    return store?.getters["charts/getChartsByDateRange"](startDate, endDate);
  });
  const selectedChartType = ref("line");
  const selectedSensors = ref<string[]>(["humidity"]);
  const sensors = computed(() => store?.getters["sensors/getSensors"] || []);
  const selectedColor = ref("#000000");
  const chartOptionsCache: Ref<{ [key: string]: any }> = ref({});
  const snackbar = ref(false);
  const snackbarMessage = ref("");
  const lastChart = ref<HTMLElement[] | null>(null);
  const deleteChart = async (chartId: string) => {
    try {
      if (confirm("Do you really want to delete?")) {
        await store?.dispatch("charts/deleteChart", {
          userId: selectedUser.value._id,
          id: chartId,
        });

        store?.dispatch("charts/fetchCharts", selectedUser.value._id);

        snackbarMessage.value = "Chart removed.";
        snackbar.value = true;
      }
    } catch (error: any) {
      console.error("Failed to delete chart:", error);
    }
  };

  const getChartOptions = (chart: any) => {
    if (!chart || !chart.sensors) {
      return { options: {}, series: [] };
    }

    if (chartOptionsCache.value[chart._id]) {
      return chartOptionsCache.value[chart._id];
    }

    const options = {
      chart: {
        type: chart.type,
      },
      title: {
        text:""
//         text: `Chart for ${chart.sensors
//           .map((sensor: any) => sensor.type)
//           .join(", ")}`,
//         align: "center",
        
//         style: {
// width:"100%"

        // },
      },
      colors: [chart.color],
      responsive: [
        {
          breakpoint: 768,
          options: {
            title: {
              text: "",
            },
            legend: {
              fontSize: "8px",
            },
            dataLabels: {
              style: {
                fontSize: "10px", // Reduce font size for data labels
              },
            },
          },
        },
      ],
    };

    const series = chart.sensors.map((sensor: any) => ({
      name: sensor.type,
      data: sensor.readings,
    }));

    const chartOptions = { options, series };

    chartOptionsCache.value[chart._id] = chartOptions;

    return chartOptions;
  };

  const addChart = async () => {
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



  try {
    await store?.dispatch("charts/addChart", newChart);

    // Clear the cache after adding a new chart
    chartOptionsCache.value = {};

    // Wait for the DOM to update
    await nextTick();

    // Scroll to the last chart element
    const lastChartElement =
      lastChart.value && lastChart.value.length > 0
        ? lastChart.value[lastChart.value.length - 1]
        : null;

    if (lastChartElement) {
      (lastChartElement as HTMLElement).scrollIntoView({ behavior: "smooth" });
    }
  } catch (error: any) {
    console.error("Failed to add chart:", error);
  }
  };

  return {
    users,
    selectedUser,
    dateRange,
    userCharts,
    filteredCharts,
    selectUser,
    deleteChart,
    lastChart,
    getChartOptions,
    addChart,
    selectedChartType,
    selectedSensors,
    sensors,
    selectedColor,
  };
}
