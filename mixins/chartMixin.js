import { ref, computed, onMounted, getCurrentInstance } from 'vue';

export default {
  setup() {
    const instance = getCurrentInstance();
    const store = instance?.proxy.$store;

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

    const selectUser = async function (user: any) {
      selectedUser.value = user;
      await store?.dispatch("charts/fetchCharts", user._id);
    };

    const filteredCharts = computed(() => {
      const [start, end] = dateRange.value;
      const startDate = new Date(start);
      const endDate = new Date(end);
      return store?.getters["charts/getChartsByDateRange"](startDate, endDate);
    });

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

    onMounted(() => {
      store?.dispatch("auth/fetchUsers").catch((error) => {
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
    };
  },
};
