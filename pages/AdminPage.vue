<template>
  <v-container>
    <h1>Admin Page</h1>

    <!-- Users Cards -->
    <v-row>
      <v-col cols="6" md="4" v-for="user in users" :key="user._id">
        <v-card @click="selectUser(user)">
          <v-card-title>{{ user.username }}</v-card-title>
          <v-card-subtitle>{{ user.email }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Selected User Charts -->
    <v-row v-if="selectedUser">
      <h2>{{ selectedUser.username }}'s Charts {{ userCharts.length }}</h2>
      <v-col>
        <v-date-picker
          v-model="dateRange"
          range
          color="#19585F"
          header-color="#19585F"
          class="styled-date-picker"
          @change="filteredCharts"
        ></v-date-picker>
      </v-col>
      <v-col cols="12" v-for="chart in filteredCharts" :key="chart._id">
        <v-card>
          <v-card-title>{{ chart.type }} Chart</v-card-title>
          <v-card-subtitle>Color: {{ chart.color }}</v-card-subtitle>
          <v-card-subtitle>Date: {{ chart.createdAt }}</v-card-subtitle>
          <v-icon right @click="deleteChart(chart._id)">mdi-delete</v-icon>
          <apexchart
            :options="getChartOptions(chart)?.options"
            :series="getChartOptions(chart)?.series"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { ref, computed, onMounted, getCurrentInstance, watch } from "vue";
import VueApexCharts from "vue-apexcharts";
import ChartMixin from "../mixing/chart";
export default {
    mixins: [ChartMixin],
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const instance = getCurrentInstance();
    const store = instance?.proxy.$store;
    const users = computed(() => store?.getters["auth/getUsers"] || []);
    const userCharts = computed(
      () => store?.getters["chart/getAllCharts"] || []
    );
    const selectedUser = ref<any>(null);
    const dateRange = ref([
      new Date(new Date().setDate(new Date().getDate() - 5))
        .toISOString()
        .substr(0, 10),
      new Date(new Date().setDate(new Date().getDate() + 5))
        .toISOString()
        .substr(0, 10),
    ]);

    watch(users, (currentValue, oldValue) => {
      console.log("watch");
    //   console.log(currentValue);
    //   console.log(oldValue);
      if (users.value.length > 0) {
        console.log(users.value[0])
        selectUser(users.value[0])
        //   selectedUser.value = users.value[0];
        }
    });
    // const userCharts = ref<any[]>([]);

    // onMounted(() => {
    //   fetchUsers();
    // });

    // const fetchUsers = async () => {
    //   try {
    //     const response = await fetch("/api/users", {
    //       headers: {
    //         Authorization: `Bearer ${store?.getters["auth/getToken"]}`, // Assuming you store your JWT in the store
    //       },
    //     });

    //     if (!response.ok) {
    //       throw new Error("Failed to fetch users");
    //     }

    //   } catch (error) {
    //     console.error("Error fetching users:", error);
    //   }
    // };

    // const selectUser = async (user: any) => {
    //   selectedUser.value = user;
    //   // Replace with your API endpoint to fetch charts by user ID
    //   const response = await fetch(`/api/charts/user/${user._id}`);
    //   userCharts.value = await response.json();
    // };
    const selectUser = async (user: any) => {
      console.log("userId");
      console.log(user);

      selectedUser.value = user;

      store?.dispatch("charts/fetchCharts", user._id);
    };

    const filteredCharts = computed(() => {
      const [start, end] = dateRange.value;
      const startDate = new Date(start);
      const endDate = new Date(end);
      return store?.getters["charts/getChartsByDateRange"](startDate, endDate);
    });
    const deleteChart = async (chartId: string) => {
      try {
        // await store?.dispatch("charts/deleteChart", selectedUser._id, chartId);
        if(confirm("Do you really want to delete?")){
        console.log("selectedUser._id");
        console.log(selectedUser.value._id);
        console.log(chartId);
        await store?.dispatch("charts/deleteChart", {
          userId: selectedUser.value._id,
          id: chartId,
        });

        // userCharts = userCharts.value.filter(
        //   (chart) => chart._id !== chartId
        // );
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
        console.error("Failed to fetch sensors:", error);
      });
     
    });

    return {
      users,
      dateRange,
      selectedUser,
      userCharts,
      filteredCharts,
      selectUser,
      deleteChart,
      getChartOptions,
    };
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
