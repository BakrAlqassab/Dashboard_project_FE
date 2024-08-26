import { Middleware } from '@nuxt/types';
const authMiddleware: Middleware =async  ({ store, redirect, route }) => {
  // to make sure teh token value and user fetch correctly before go to the next step
  if (!store.state.auth.user && !store.state.auth.isLoading) {
    await store.dispatch('auth/initializeAuth');
  }

  const isAuthenticated = store.getters['auth/isAuthenticated'];

  // If not authenticated, redirect to login
  if (!isAuthenticated && route.name !== 'login' && route.name !== 'register') {
    return redirect('/login');
  }

  // If authenticated, prevent access to login/register pages
  if (isAuthenticated && (route.name === 'login' || route.name === 'register')) {
    console.log("authe middleware")
    return redirect('/dashboard');
  }
};

export default authMiddleware;

