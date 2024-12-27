import axios from 'axios';
import { useAuthStore } from './/stores/auth';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', 
});


const getAuthHeader = () => {
    const authStore = useAuthStore();
    const username = authStore.username;
    const password = authStore.password; 
    return `Basic ${btoa(`${username}:${password}`)}`; 
  };

export const register = (data) => api.post('/register', data);
export const login = (data) => api.post('/login', data);
export const getMe = () => api.get('/me', {
    headers: {
        Authorization: getAuthHeader(), 
    }
});



export const getUserPosts = async (username, page) => {
    return api.get(`/users/${username}/posts?page=${page}`, {
        headers: {
            Authorization: getAuthHeader(), 
        },
    });
};

export const getPostDetails = (username, postId) => {
    return api.get(`/users/${username}/posts/${postId}`, {
      headers: { Authorization: getAuthHeader() },
    });
  };
  
export const publishPost = (username, data) =>
    api.post(`/users/${username}/posts`, data, {
        headers: {
            Authorization: getAuthHeader(),
        },
    });

export const likePost = (username, postId) =>
    api.put(`/users/${username}/posts/${postId}/like`, {}, {
        headers: {
            Authorization: getAuthHeader(),
        },
    });

export const unlikePost = (username, postId) =>
    api.delete(`/users/${username}/posts/${postId}/like`, {
        headers: {
            Authorization: getAuthHeader(),
        },
    });

export const createUserPost = async (username, postData) => {
    try {
        const authHeader = getAuthHeader();
        const response = api.post(
            `/users/${username}/posts`,
            { content: postData.content }, 
            {
                headers: {
                    Authorization: authHeader, 
                },
            }
        );
        return response.data; 
    } catch (error) {
        if (error.response && error.response.status === 403) {
            throw new Error("You are not authorized to create a post for this user!");
        } else {
            throw new Error("Failed to create post!");
        }
    }
};

  


  
