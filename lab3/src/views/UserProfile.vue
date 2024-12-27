<template>
  <div class="profile-container">
    <h1>{{ fullName ? `${fullName}'s Session` : 'Loading profile...' }}</h1>

    <p class="username-info">Username: {{ username }}</p>

    <div class="actions" v-if="isAuthorizedUser">
      <button @click="toggleCreatePost" class="btn">Create New Post</button>
    </div>

    <ul class="posts-list">
      <li 
        v-for="post in posts" 
        :key="post.id" 
        class="post-item" 
        :class="{ expanded: post.id === selectedPostId }"
        @click="goToPostDetails(post.id)"
      >
        <div class="post-content">{{ post.content }}</div>
        <div v-if="post.id === selectedPostId" class="post-actions">
          <button @click.stop="toggleLike(post)" class="like-btn">
            <span v-if="post.liked">❤️</span>
            <span v-else>🤍</span> Like
          </button>
        </div>
      </li>
    </ul>
    <p v-if="posts.length === 0" class="no-posts">No posts to display</p>

    <div v-if="showCreatePost" class="create-post-form">
      <textarea
        v-model="newPostContent"
        placeholder="What's on your mind?"
        maxlength="140"
      ></textarea>
      <button @click="submitPost" class="btn submit-post-btn">Publish</button>
    </div>
  </div>
</template>

<script>
import { getUserPosts, createUserPost, getMe, likePost, unlikePost } from "../api";

export default {
  data() {
    return {
      username: this.$route.params.username, // Отримуємо username з URL
      fullName: '',
      posts: [],
      showCreatePost: false,
      newPostContent: '',
      selectedPostId: null,
      isAuthorizedUser: false, // Стан для контролю видимості кнопки
    };
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await getUserPosts(this.username, 1);
        this.posts = response.data.map(post => ({
          ...post,
          liked: false, // Початкове значення для лайків
        }));
      } catch (error) {
        alert('Failed to fetch posts!');
      }
    },
    goToPostDetails(postId) {
      this.$router.push({ name: 'PostDetails', params: { username: this.username, postId } });
    },
    toggleCreatePost() {
      this.showCreatePost = !this.showCreatePost;
    },
    async submitPost() {
      if (!this.newPostContent.trim()) {
        alert('Post content cannot be empty!');
        return;
      }

      try {
        await createUserPost(this.username, { content: this.newPostContent });
        this.newPostContent = '';
        this.showCreatePost = false;
        this.fetchPosts();
      } catch (error) {
        alert('Failed to create post!');
      }
    },
    selectPost(postId) {
      this.selectedPostId = this.selectedPostId === postId ? null : postId;
      console.log(this.selectedPostId);
    },
    async toggleLike(post) {
      try {
        if (post.liked) {
          await unlikePost(this.username, post.id);
          post.liked = false;
        } else {
          await likePost(this.username, post.id);
          post.liked = true;
        }
      } catch (error) {
        alert('Failed to toggle like!');
      }
    },
    async checkAuthorization() {
      try {
        const response = await getMe();
        const currentUser = response.data;
        this.isAuthorizedUser =
          currentUser.username === this.username; // Перевірка username
        this.fullName = currentUser.full_name;
        this.fetchPosts();
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    },
  },
  async mounted() {
    await this.checkAuthorization();
  },
};
</script>





<style scoped>
.profile-container {
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
  margin-bottom: 10px;
  color: #ffffff;
}

.username-info {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #fce4ec;
}

.actions {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #f1a7c5;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #e295b1;
}

.create-post-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;
}

textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  border: 2px solid #f1a7c5;
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
  resize: none;
}

.submit-post-btn {
  background-color: #f48fb1;
}

.posts-list {
  width: 100%;
  max-width: 600px;
  list-style: none;
  padding: 0;
  margin: 20px 0;
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.post-item {
  padding: 15px;
  border-bottom: 1px solid #f1a7c5;
  color: #f1a7c5;
  text-align: left;
}

.post-item:last-child {
  border-bottom: none;
}

.no-posts {
  font-size: 1.2rem;
  color: #fce4ec;
  margin-top: 20px;
}

.like-btn {
  background: none;
  border: none;
  color: #e63946;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.2s;
}

.like-btn:hover {
  transform: scale(1.2);
}
</style>

