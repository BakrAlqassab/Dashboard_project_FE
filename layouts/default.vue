<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Dashboard Project</v-toolbar-title>
      
      <v-spacer></v-spacer>
      <h1 v-if="isAuthenticated">Welcome {{ getUser?.username }}</h1>
      
      <v-btn v-if="!isAuthenticated" text @click="goToLogin">
        Login
      </v-btn>
      
      <v-btn v-if="!isAuthenticated" text @click="goToRegister">
        Register
      </v-btn>
      
      <v-btn v-if="isAuthenticated" text @click="logout">
        Logout
      </v-btn>
    </v-app-bar>
    
    <v-main v-if="!isLoading">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <!-- Loading Screen -->
    <v-main v-else>
      <Loading />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'getUser']),
  },
  methods: {
    ...mapActions('auth', ['logout']),
    goToLogin() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    },
  },
  created() {
    this.$store.dispatch('auth/initializeAuth');
  },
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
