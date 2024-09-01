<template>
  <v-container fluid>
    <h1 class="text-h4 mb-4">Admin Page</h1>

    <!-- Users Section -->
    <v-card outlined class="pa-4 mb-6">
      <v-card-title>User Management</v-card-title>
      <v-divider></v-divider>
      <v-slide-group
        v-model="selectedUser"
        class="pa-4 user-slide-group"
        selected-class="bg-primary text-white"
        show-arrows
      >
        <v-slide-item v-for="user in users" :key="user._id" class="user-card">
          <v-card
            class="hoverable pa-3 ml-2 w-25"
            @click="selectUser(user)"
            :elevation="selectedUser && selectedUser._id === user._id ? 6 : 2"
            :class="{
              'selected-user-card':
                selectedUser && selectedUser._id === user._id,
            }"
          >
            <v-avatar size="32" class="mb-3" color="primary">
              <span class="white--text">{{ user.username.charAt(0) }}</span>
            </v-avatar>
            <v-card-title class="text-overline username">{{
              user.username
            }}</v-card-title>
            <v-card-subtitle class="text-overline email">{{
              user.email
            }}</v-card-subtitle>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-card>

    <!-- Charts Section -->
    <v-card v-if="selectedUser" outlined class="pa-4">
      <v-card-title> {{ selectedUser.username }}'s Charts </v-card-title>
      <v-divider></v-divider>
      <v-row class="my-4 d-flex justify-center">
        <v-col cols="12" md="4">
          <v-date-picker
            v-model="dateRange"
            range
            color="primary"
            header-color="primary"
            class="styled-date-picker d-flex justdify-center"
            @change="filteredCharts"
          />
        </v-col>
      </v-row>

      <v-row v-if="filteredCharts.length">
        <v-col
          cols="12"
          md="6"
          lg="4"
          v-for="chart in filteredCharts"
          :key="chart._id"
        >
          <v-card outlined class="mb-4">
            <v-card-title>
              {{ chart.type }} Chart
              <v-icon right class="ml-auto" @click="deleteChart(chart._id)">
                mdi-delete
              </v-icon>
            </v-card-title>
            <v-col class="d-flex justify-space-between">
              <v-card-subtitle class="text-caption"
                >Color: {{ chart.color }}</v-card-subtitle
              >
              <v-card-subtitle class="text-caption"
                >Date: {{ chart.createdAt }}</v-card-subtitle
              >
            </v-col>

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
    </v-card>
  </v-container>
</template>

<script lang="ts">
import VueApexCharts from "vue-apexcharts";
import { useChartHelpers } from "../helpers/chartHelpers";
import { getCurrentInstance, watch, onMounted } from "vue";
import noCharts from "../components/noCharts.vue";

export default {
  components: {
    apexchart: VueApexCharts,
    noCharts,
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
    };
  },
};
</script>

<style scoped>
.hoverable {
  transition: all 0.3s ease;
  cursor: pointer;
  /* width: 250px; */
}

.hoverable:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
} 

.selected-user-card {
  border-left: 4px solid #19485f;
  background-color: #f5f5f5;
}
@media screen and (max-width: 768px) {
  ::v-deep .v-slide-group__next,
  ::v-deep .v-slide-group__prev {
    min-width: 25px;
  }

  .username, .email {
    font-size: 10px !important;
  }
}
</style>
