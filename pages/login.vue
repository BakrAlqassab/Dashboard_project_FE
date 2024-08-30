<template>
  <v-container>
    <v-form @submit.prevent="handleLogin">
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

      <v-btn type="submit" color="primary">Login</v-btn>

      <v-alert v-if="error" type="error" dismissible>
        {{ error }}
      </v-alert>

      <v-btn text @click="goToRegister">Go to Register</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref ,getCurrentInstance} from 'vue';
import { useAuth } from '~/composables/useAuth';

export default defineComponent({
  // middleware: 'auth',
  setup() {
    const email = ref('alqassab31@gmail.com');
    const password = ref('password');
    const error = ref<string | null>(null);
      const instance = getCurrentInstance();
      const router = instance?.proxy.$router;

      if (!router) {
        throw new Error('Router instance is not available');
      }
    const { login } = useAuth(router); 

    const handleLogin = async () => {
      try {
        await login(email.value, password.value);
      } catch (err) {
        error.value = 'Login failed';
      }
    };

    const goToRegister = () => {
      router.push('/register');
    };


    return {
      email,
      password,
      error,
      handleLogin,
      goToRegister,
    };
  },
});

</script>

<style scoped>
.v-container {
  max-width: 400px;
  margin: auto;
  padding-top: 100px;
}
</style>
