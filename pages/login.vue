<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-4">
          <v-card-title class="text-center">
            <span class="headline">Login</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="handleLogin">
              <v-text-field
                label="Email"
                v-model="email"
                :rules="emailRules"
                type="email"
                required
                outlined
                dense
                prepend-inner-icon="mdi-email"
                class="mb-4"
              ></v-text-field>

              <v-text-field
                label="Password"
                v-model="password"
                :rules="passwordRules"
                type="password"
                required
                outlined
                dense
                prepend-inner-icon="mdi-lock"
                class="mb-4"
              ></v-text-field>

              <v-btn 
                block 
                color="primary" 
                type="submit" 
                class="mb-4"
                :disabled="!valid"
              >
                Login
              </v-btn>

              <v-alert v-if="error" type="error" dismissible class="mb-4">
                {{ error }}
              </v-alert>

              <v-btn text block @click="goToRegister">
                Go to Register
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from 'vue';
import { useAuth } from '~/composables/useAuth';

export default defineComponent({
  setup() {
    const email = ref('alqassab31@gmail.com');
    const password = ref('password');
    const error = ref<string | null>(null);
    const valid = ref(false);
    const instance = getCurrentInstance();
    const router = instance?.proxy.$router;

    if (!router) {
      throw new Error('Router instance is not available');
    }
    const { login } = useAuth(router);

    // Validation rules
    const emailRules = [
      (v: string) => !!v || 'Email is required',
      (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid',
    ];
    const passwordRules = [
      (v: string) => !!v || 'Password is required',
      (v: string) => v.length >= 6 || 'Password must be at least 6 characters',
    ];

    const handleLogin = async () => {
      if (valid.value) {
        try {
          await login(email.value, password.value);
        } catch (err) {
          error.value = 'Login failed';
        }
      }
    };

    const goToRegister = () => {
      router.push('/register');
    };

    return {
      email,
      password,
      error,
      valid,
      emailRules,
      passwordRules,
      handleLogin,
      goToRegister,
    };
  },
});
</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.headline {
  font-size: 24px;
  font-weight: bold;
}
</style>
