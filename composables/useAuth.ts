
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
    
       await store.dispatch('auth/login', { email, password });
        router.push('/dashboard'); // Redirect to the dashboard after login
    } catch (error) {
      console.error('Login failed:', error);
    }
  }; 
  
  const register = async (username:string,email: string, password: string) => {
    try {
    
    
       const user = await store.dispatch('auth/register', { username, email, password });

       if (user) {  // Check if user was successfully returned
        router.push('/dashboard'); // Redirect to the dashboard after successful registration
      } else {
        console.error('Registration failed: No user returned.');
      }
    
      
    } catch (error) {
      console.error('register failed:', error);
    }
  };

  return {
    login,
    register
  };
}
