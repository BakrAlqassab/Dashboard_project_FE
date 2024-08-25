
import { getCurrentInstance } from 'vue';

export function useAuth(routger: any) {
    const instance = getCurrentInstance();
    if (!instance) {
        throw new Error('Vue instance not found');
      }
    
      const store = instance.proxy.$store;
      const router = instance.proxy.$router;
    
      if (!store) {
        throw new Error('Store is not available');
      }
  const login = async (email: string, password: string) => {
    try {
        console.log("useAuth")
        console.log(email)
        console.log(password)
       await store.dispatch('login', { email, password });
       console.log("password")
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return {
    login,
  };
}
