<template>
  <v-container>
    <v-form @submit.prevent="handleRegister">
      <v-text-field
        label="Username"
        v-model="username"
        required
      ></v-text-field>
      
      <v-text-field
        label="Email"
        v-model="email"
        type="email"
        required
      ></v-text-field>
      
      <v-text-field
        label="Password"
        v-model="password"
        type="password"
        required
      ></v-text-field>

      <v-btn type="submit" color="primary">Register</v-btn>

      <v-alert v-if="error" type="error" dismissible>
        {{ error }}
      </v-alert>

      <v-btn text @click="goToLogin">Go to Login</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from 'vue';
import { useAuth } from '~/composables/useAuth';

export default defineComponent({
  // middleware: 'auth',

  setup() {
    const username = ref('Beko 2024');
    const email = ref('alqassab24@gmail.com');
    const password = ref('password');
    const error = ref<string | null>(null);
      const instance = getCurrentInstance();
      const router = instance?.proxy.$router;
    const { register } = useAuth(router);

    const handleRegister = async () => {
      try {
        await register(username.value, email.value, password.value);
      } catch (err) {
        error.value = 'Registration failed';
      }
    };

    return {
      username,
      email,
      password,
      error,
      handleRegister,
    };
  },
});
</script>

<style scoped>
.v-container {
  max-width: 400px;
  margin: auto;
  /* padding-top: 100px; */
}
</style>
