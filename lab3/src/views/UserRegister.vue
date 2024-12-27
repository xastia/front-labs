<template>
  <div class="register-container">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <input v-model="fullName" type="text" placeholder="Full Name" />
      <button type="submit">Register</button>
    </form>
    <p class="login-prompt">
      Already have an account? 
      <router-link to="/login" class="login-link">Login here</router-link>
    </p>
  </div>
</template>

<script>
import { register } from '../api';
import { useAuthStore } from '../stores/auth';

export default {
  data() {
    return {
      username: '',
      password: '',
      fullName: '',
    };
  },
  methods: {
    async handleRegister() {
      try {
        await register({
          username: this.username,
          password: this.password,
          full_name: this.fullName,
        });
        //alert('Registration successful!');
        // Переходимо на сторінку профілю після успішної реєстрації

        const authStore = useAuthStore();
        authStore.setUserCredentials(this.username, this.password);
        this.$router.push(`/users/${this.username}`);
      } catch (error) {
        console.error(error.response?.data || error.message);
        alert('Registration failed: ' + (error.response?.data?.detail || 'Unknown error'));
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8c6d8, #f1a7c5);
  font-family: Arial, sans-serif;
  color: #ffffff;
  padding: 20px;
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

.login-prompt {
  margin-top: 20px;
  font-size: 1rem;
  color: #ffffff;
}

.login-link {
  color: #ffffff;
  font-weight: bold;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.login-link:hover {
  color: #e295b1;
}
</style>

