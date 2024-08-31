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
      <hr />

      <v-col cols="5" v-for="chart in filteredCharts" :key="chart._id">
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
import VueApexCharts from "vue-apexcharts";
import { useChartHelpers } from "../helpers/chartHelpers";
import { getCurrentInstance, watch } from "vue";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const instance = getCurrentInstance();
    const store = instance?.proxy.$store;

    const {
      users,
      selectedUser,
      dateRange,
      userCharts,
      filteredCharts,
      selectUser,
      deleteChart,
      getChartOptions,
    } = useChartHelpers(store);

    watch(users, (currentValue, oldValue) => {
      if (users.value.length > 0) {
        selectUser(users.value[0]);
      }
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
</script>

<style scoped>
/* Add any custom styles here */
</style>
