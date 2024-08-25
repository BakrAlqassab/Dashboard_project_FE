<template>
  <v-container>
    <v-form @submit.prevent="handleRegister">
      <v-text-field label="Name" v-model="name" required></v-text-field>
      <v-text-field label="Email" v-model="email" type="email" required></v-text-field>
      <v-text-field label="Password" v-model="password" type="password" required></v-text-field>
      <v-btn type="submit" color="primary">Register</v-btn>
      <v-alert v-if="error" type="error" dismissible>{{ error }}</v-alert>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuth } from '~/composables/useAuth';

export default defineComponent({
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const error = ref<string | null>(null);
    const { register } = useAuth();

    const handleRegister = async () => {
      try {
        await register(name.value, email.value, password.value);
      } catch (err) {
        error.value = 'Registration failed';
      }
    };

    return {
      name,
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
<!-- </style> -->
