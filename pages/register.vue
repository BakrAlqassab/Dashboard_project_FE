<template>
  <v-container class="ma-auto">
    <v-card class="mx-auto my-12" max-width="400">
      <v-card-title class="headline">Register</v-card-title>

      <v-card-text>
        <v-form ref="form" @submit.prevent="handleRegister" v-model="valid">
          <v-text-field
            label="Username"
            v-model="username"
            :rules="usernameRules"
            required
            prepend-icon="mdi-account"
          ></v-text-field>

          <v-text-field
            label="Email"
            v-model="email"
            type="email"
            :rules="emailRules"
            required
            prepend-icon="mdi-email"
          ></v-text-field>

          <v-text-field
            label="Password"
            v-model="password"
            type="password"
            :rules="passwordRules"
            required
            prepend-icon="mdi-lock"
          ></v-text-field>

          <v-btn :disabled="!valid" type="submit" color="primary" block>
            Register
          </v-btn>

          <v-row justify="center">
            <v-col cols="12">
              <p class="text-center">
                Already have an account ?
                <v-btn     text 
            block 
            outlined
            color="primary"
            class="mx-0 my-2"
             @click="goToLogin">Log in here</v-btn>
              </p>
            </v-col>
          </v-row>

          <v-alert v-if="error" type="error" dismissible class="mt-3">
            {{ error }}
          </v-alert>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from "vue";
import { useAuth } from "~/composables/useAuth";

export default defineComponent({
  setup() {
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const error = ref<string | null>(null);
    const valid = ref(false);
    const instance = getCurrentInstance();
    const router = instance?.proxy.$router;
    const { register } = useAuth(router);

    // Validation rules
    const usernameRules = [(v: string) => !!v || "Username is required"];
    const emailRules = [
      (v: string) => !!v || "Email is required",
      (v: string) => /.+@.+\..+/.test(v) || "Email must be valid",
    ];
    const passwordRules = [
      (v: string) => !!v || "Password is required",
      (v: string) => v.length >= 6 || "Password must be at least 6 characters",
    ];

    const handleRegister = async () => {
      if (valid.value) {
        try {
          await register(username.value, email.value, password.value);
        } catch (err) {
          error.value = "Registration failed";
        }
      }
    };

    const goToLogin = () => {
      router?.push("/login");
    };

    return {
      username,
      email,
      password,
      error,
      valid,
      usernameRules,
      emailRules,
      passwordRules,
      handleRegister,
      goToLogin,
    };
  },
});
</script>

<style scoped>
.v-container {
  max-width: 400px;
}
</style>
