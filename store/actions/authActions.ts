import { ActionTree, ActionContext } from "vuex";
import { AuthState } from "~/store/modules/state";
import { AuthTypes } from "~/store/modules/types";
import axios from "axios";
import { RootState } from "../modules/state";

export const actions = {
  // to fetch the user when reload the page
  async fetchUsers({ commit }: ActionContext<AuthState, RootState>) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("/users/fetchUsers", {
        headers: {
          Authorization: `Bearer ${token}}`, // Assuming you store your JWT in the store
        },
      });

      const users = await response.data;
      commit("SET_USERS", users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },

  async fetchUser({ commit }: ActionContext<AuthState, RootState>) {
    try {
      const response = await axios.get("/users/me");
      const user = response.data;

      commit("SET_USER", user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  },

  async initializeAuth({
    commit,
    dispatch,
  }: ActionContext<AuthState, RootState>) {
    const token = localStorage.getItem("authToken");
    if (token) {
      commit("SET_TOKEN", token);
      await dispatch("fetchUser");
    }
  },
  async login(
    { commit }: ActionContext<AuthState, any>,
    credentials: { email: string; password: string }
  ) {
    try {
      const response = await axios.post("/users/login", credentials);
      const token = response.data.token;
      const user = response.data.user;

      commit(AuthTypes.SET_TOKEN, token);
      commit(AuthTypes.SET_USER, user);

      localStorage.setItem("authToken", token);
      return user;
    } catch (error) {
      throw new Error("Login failed");
    }
  },

  async register(
    { commit }: ActionContext<AuthState, any>,
    credentials: { username: string; email: string; password: string }
  ) {
    try {
      const response = await axios.post("/users/register", credentials);
      const token = response.data.token;
      const user = response.data.user;
      commit(AuthTypes.SET_TOKEN, token);
      commit(AuthTypes.SET_USER, user);
      localStorage.setItem("authToken", token);
      return user;
    } catch (error) {
      console.error(error);
    }
  },

  logout({ commit, dispatch }: ActionContext<AuthState, RootState>) {
    commit(AuthTypes.LOGOUT);
    localStorage.removeItem("authToken");
    dispatch("redirectToHome");
  },

  redirectToHome() {
    window.location.href = "/login";
  },
};
