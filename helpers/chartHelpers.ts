import { ref, computed, onMounted } from 'vue';

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

  const userCharts = computed(
    () => store?.getters["chart/getAllCharts"] || []
  );

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
  const deleteChart = async (chartId: string) => {
    try {
      if (confirm("Do you really want to delete?")) {
        await store?.dispatch("charts/deleteChart", {
          userId: selectedUser.value._id,
          id: chartId,
        });
      }
    } catch (error) {
      console.error("Failed to delete chart:", error);
    }
  };

  const getChartOptions = (chart: any) => {
    if (!chart || !chart.sensors) {
      return { options: {}, series: [] };
    }

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

    return { options, series };
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

  onMounted(() => {
    store?.dispatch("auth/fetchUsers").catch((error: any) => {
      console.error("Failed to fetch users:", error);
    });
  });

  return {
    users,
    selectedUser,
    dateRange,
    userCharts,
    filteredCharts,
    selectUser,
    deleteChart,

    getChartOptions,
    addChart,
    selectedChartType,
    selectedSensors,
    sensors,
    selectedColor
  };
}
