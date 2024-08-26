<template>
  <Loading v-if="isLoading" />
  <v-app v-else>
    <v-app-bar app>
      <v-toolbar-title>Dashboard Project</v-toolbar-title>
      <v-spacer></v-spacer>
      <h1 v-if="isAuthenticated">Welcome {{ getUser?.username }}</h1>
      <v-btn v-if="!isAuthenticated" text @click="goToLogin">Login</v-btn>
      <v-btn v-if="!isAuthenticated" text @click="goToRegister">Register</v-btn>
      <v-btn v-if="isAuthenticated" text @click="logout">Logout</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, getCurrentInstance } from "vue";
import Loading from '~/components/Loading.vue';

export default defineComponent({
  components: {
    Loading,
  },
  setup() {
    const instance = getCurrentInstance();
    const store = instance?.proxy.$store; // Accessing store
    const router = instance?.proxy.$router; // Accessing router
    const isLoading = ref(true);

    const isAuthenticated = computed(() => store?.getters['auth/isAuthenticated']);
    const getUser = computed(() => store?.getters['auth/getUser']);

    const goToLogin = () => {
      router?.push('/login');
    };

    const goToRegister = () => {
      router?.push('/register');
    };

    const logout = () => {
      store?.dispatch('auth/logout');
      router?.push('/');
    };

    onMounted(async () => {
      await store?.dispatch('auth/initializeAuth');
      isLoading.value = false;
    });

    return {
      isAuthenticated,
      getUser,
      goToLogin,
      goToRegister,
      logout,
      isLoading,
    };
  },
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
