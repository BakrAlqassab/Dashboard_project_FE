<template>
  <Loading v-if="isLoading" />
  <v-app v-else>
    <!-- Navigation Bar -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title
        class="text-subtitle-2 text-md-h6 cursor-pointer"
        @click="navigateToDashboard"
      >
        <v-icon left class="logo-icon animate-logo">mdi-chart-line</v-icon>
        <span class="animate-logo">Vue-charts</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- Side Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list-item>
        <v-list-item-content>
          <v-icon
            @click="toggleDrawer"
            class="ml-auto d-flex justify-end"
            style="cursor: pointer"
            >mdi-close</v-icon
          >
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item
          v-if="isAuthenticated"
          link
          @click="navigateToDashboard"
          class="pointer"
          :class="{ 'selected-page': isActivePage('dashboard') }"
        >
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>

        <v-list-item
          v-if="isAuthenticated"
          link
          @click="navigateToAdmin"
          class="pointer"
          :class="{ 'selected-page': isActivePage('adminPage') }"
        >
          <v-list-item-icon>
            <v-icon>mdi-account-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Admin</v-list-item-title>
        </v-list-item>

        <v-divider class="my-2"></v-divider>

        <v-list-item
          v-if="isAuthenticated"
          link
          @click="logout"
          class="pointer"
        >
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>

        <v-list-item
          v-if="!isAuthenticated"
          link
          @click="goToLogin"
          class="pointer"
        >
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>

        <v-list-item
          v-if="!isAuthenticated"
          link
          @click="goToRegister"
          class="pointer"
        >
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Register</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content Area -->
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  getCurrentInstance,
} from "vue";
import Loading from "~/components/Loading.vue";
import "vuetify/dist/vuetify.min.css";

export default defineComponent({
  components: {
    Loading,
  },
  setup() {
    const drawer = ref(false);
    const isLoading = ref(true);

    const instance = getCurrentInstance();
    const store = instance?.proxy.$store; 
    const router = instance?.proxy.$router;

    // Computed properties for authentication state and user data
    const isAuthenticated = computed(
      () => store?.getters["auth/isAuthenticated"] || false
    );
    const getUser = computed(() => store?.getters["auth/getUser"]);

    const navigateToDashboard = () => {
      router?.push("/dashboard");
      drawer.value = false;
    };

    const isActivePage = (page: string) => {
      return router?.currentRoute.name === page;
    };

    const navigateToAdmin = () => {
      router?.push("/adminPage");
      drawer.value = false;
    };

    const goToLogin = () => {
      router?.push("/login");
      drawer.value = false;
    };

    const goToRegister = () => {
      router?.push("/register");
      drawer.value = false;
    };

    const logout = () => {
      store?.dispatch("auth/logout");
      router?.push("/login");
      drawer.value = false;
    };

    const toggleDrawer = () => {
      drawer.value = !drawer.value;
    };

    // Initialize authentication state adn fetch the user's data
    onMounted(async () => {
      await store?.dispatch("auth/initializeAuth");
      isLoading.value = false;
    });

    return {
      drawer,
      isAuthenticated,
      getUser,
      goToLogin,
      goToRegister,
      logout,
      navigateToDashboard,
      navigateToAdmin,
      toggleDrawer,
      isLoading,
      isActivePage,
    };
  },
});
</script>

<style scoped>
.selected-page {
  background-color: rgba(
    0,
    0,
    0,
    0.3
  ) !important; /* Highlight the active page with the primary color */
  color: white !important;
}
</style>
