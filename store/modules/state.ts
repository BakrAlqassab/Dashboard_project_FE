export const state = () => ({
    token: null as string | null,
    user: null as object | null,
    isLoading: false,
  });

  export interface RootState {
    // Add other state properties if necessary
  }
  
  export type AuthState = ReturnType<typeof state>;
  