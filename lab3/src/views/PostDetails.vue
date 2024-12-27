<template>
  <div class="post-details-container">
    <h1>Post Details</h1>
    <div v-if="post" class="post-content">
      <h2 class="post-text">{{ post.content }}</h2>
      <p class="post-author">Author: {{ post.author.username }}</p>
      <p class="post-date">Created: {{ formattedDate }}</p>
      <p class="post-likes">Likes: {{ post.likes }}</p>
      <button @click="toggleLike" class="like-btn">
        {{ post.liked ? 'Unlike' : 'Like' }}
      </button>
    </div>
    <p v-else>Loading post...</p>
  </div>
</template>

<script>
import { getPostDetails, likePost, unlikePost } from '../api';

export default {
  data() {
    return {
      postId: this.$route.params.postId, 
      username: this.$route.params.username, 
      post: null,
    };
  },
  computed: {
    formattedDate() {
      if (this.post && this.post.created_at) {
        return new Date(this.post.created_at).toLocaleString(); 
      }
      return 'Unknown date';
    },
  },
  async mounted() {
    await this.fetchPostDetails();
  },
  methods: {
    async fetchPostDetails() {
  try {
    const response = await getPostDetails(this.username, this.postId); 
    console.log('Response:', response.data);
    this.post = response.data;
  } catch (error) {
    console.log('Error:', error.response?.status, error.response?.data || error.message);
    alert('Failed to load post details!');
  }
},
    async toggleLike() {
      try {
        if (this.post.liked) {
          await unlikePost(this.username, this.post.id);
          this.post.liked = false;
          this.post.likes -= 1;
        } else {
          await likePost(this.username, this.post.id);
          this.post.liked = true;
          this.post.likes += 1;
        }
      } catch (error) {
        alert('Failed to toggle like!');
      }
    },
  },
};
</script>


<style scoped>
.post-details-container {
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

.post-content {
  background: #ffffff;
  color: #333333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
  max-width: 600px;
  width: 100%;
}

.post-text {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.post-author,
.post-date,
.post-likes {
  font-size: 1rem;
  margin-bottom: 5px;
  color: #666666;
}

.like-btn {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 15px;
  font-size: 1rem;
  background-color: #f48fb1;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.like-btn:hover {
  background-color: #e295b1;
}
</style>
