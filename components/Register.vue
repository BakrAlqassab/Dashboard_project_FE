<!-- <template>
    <div>
      <h1>Register</h1>
      <form @submit.prevent="register">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue';
  import { useAuth } from '~/composables/useAuth';  // I'll guide you on creating this file next.
  
  export default {
    setup() {
      const { register } = useAuth();
      const email = ref('');
      const password = ref('');
  
      const submitRegister = () => {
        register(email.value, password.value);
      };
  
      return {
        email,
        password,
        register: submitRegister,
      };
    },
  };
  </script>
   -->