import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: localStorage.getItem('username') || null,
    password: localStorage.getItem('password') || null,
  }),
  actions: {
    setUserCredentials(username, password) {
      this.username = username;
      this.password = password;
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
    },
    clearUserCredentials() {
      this.username = null;
      this.password = null;
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    },
  },
});

