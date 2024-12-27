<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p class="register-prompt">
      Don't have an account? 
      <router-link to="/register" class="register-link">Register here</router-link>
    </p>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';
import { login } from '../api';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        await login({ username: this.username, password: this.password });
        
    
        localStorage.setItem('username', this.username);
        localStorage.setItem('password', this.password);
        
        const authStore = useAuthStore();
        authStore.setUserCredentials(this.username, this.password);

        this.$router.push(`/users/${this.username}/posts`);
      } catch (error) {
        alert('Login failed!');
      }
    },
  },
};
</script>


<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8c6d8, #f1a7c5);
  font-family: Arial, sans-serif;
  color: #ffffff;
  padding: 0;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #ffffff;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px;
}

input {
  padding: 10px;
  border: 2px solid #f1a7c5;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #ffffff;
  color: #f1a7c5;
}

input::placeholder {
  color: #f1a7c5;
}

button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #f1a7c5;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #e295b1;
}

.register-prompt {
  margin-top: 20px;
  font-size: 1rem;
  color: #ffffff;
}

.register-link {
  color: #ffffff;
  font-weight: bold;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.register-link:hover {
  color: #e295b1;
}
</style>
