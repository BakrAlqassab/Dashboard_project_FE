

// export default {
//     setup() {
//         const instance = getCurrentInstance();
//         const store = instance?.proxy.$store;
//         const users = computed(() => store?.getters["auth/getUsers"] || []);
//         const userCharts = computed(
//           () => store?.getters["chart/getAllCharts"] || []
//         );
//         const selectedUser = ref<any>(null);
//         const dateRange = ref([
//           new Date(new Date().setDate(new Date().getDate() - 5))
//             .toISOString()
//             .substr(0, 10),
//           new Date(new Date().setDate(new Date().getDate() + 5))
//             .toISOString()
//             .substr(0, 10),
//         ]);

//         const filteredCharts = computed(() => {
//             const [start, end] = dateRange.value;
//             const startDate = new Date(start);
//             const endDate = new Date(end);
//             return store?.getters["charts/getChartsByDateRange"](startDate, endDate);
//           });


          
//     const getChartOptions = (chart: any) => {
//         if (!chart || !chart.sensors) {
//           return { options: {}, series: [] };
//         }
  
//         const options = {
//           chart: {
//             type: chart.type,
//           },
//           title: {
//             text: `Chart for ${chart.sensors
//               .map((sensor: any) => sensor.type)
//               .join(", ")}`,
//           },
//           colors: [chart.color],
//         };
  
//         const series = chart.sensors.map((sensor: any) => ({
//           name: sensor.type,
//           data: sensor.readings,
//         }));
  
//         return { options, series };
//       };

// }
// };
