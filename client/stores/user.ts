import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    email: "",
    username: "",
    token: "",
  }),
  actions: {
    async signUp(email: string, username: string, password: string) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_API_BASE_URL}/auth/sign-up`,
          {
            email,
            username,
            password,
          },
        );
        this.email = response.data.email;
        this.username = response.data.username;
        this.token = response.data.accessToken;
      } catch (error) {
        console.error(error);
      }
    },
    async signIn(email: string, password: string) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_API_BASE_URL}/auth/sign-in`,
          {
            email,
            password,
          },
        );
        this.email = response.data.email;
        this.username = response.data.username;
        this.token = response.data.accessToken;
      } catch (error) {
        console.error(error);
      }
    },
    signOut() {
      this.username = "";
      this.token = "";
    },
  },
});
