import { AuthState } from "../modules/state";

export const getters = {
  isAuthenticated(state: AuthState): boolean {
    return !!state.token;
  },
  token(state: AuthState): string | null {
    return state.token;
  },
  getUser(state: AuthState): object | null {
    return state.user;
  },
};
