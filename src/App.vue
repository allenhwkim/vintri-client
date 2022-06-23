<script>
  import auth from './services/auth'
  export default {
    data() {
      return {
        auth
      }
    }
  }
</script>

<template>
  <header class="header" :class="{ loggedIn: auth.token }">
    <div class="wrapper">
      <router-link to="/">
        <img src="@/assets/vintro-logo.png" height="60" alt="Logo">
      </router-link>
      <div v-if="auth.token">
        <router-link to="/logout">Logout</router-link>
      </div>
    </div>
  </header>

  <main class="container" :class="{ loggedIn: auth.token }">
    <router-view></router-view>
  </main>
</template>

<style>
@import './assets/normalize.css';
@import './assets/style.css';

.header {
  height: 100px;
  padding: 0 20px;
  background-color: var(--header-bg, #2d2925);
  color: var(--white, #fff);
}
.header a {
  color: var(--white, #fff);
  text-decoration: none; 
}

@media (min-width: 576px)  { .container, .header .wrapper { max-width: 540px; } }
@media (min-width: 768px)  { .container, .header .wrapper { max-width: 720px; } }
@media (min-width: 992px)  { .container, .header .wrapper { max-width: 960px; } }
@media (min-width: 1200px) { .container, .header .wrapper { max-width: 1140px; } }
.container, 
.header .wrapper {
  width: 100%;
  padding: 12px;
  margin: 3em auto 0 auto;
  background-color: var(--white);
  border-radius: 8px;
  overflow: auto;
}
.header:not(.loggedIn) .wrapper,
.container:not(.loggedIn) {
  width: 540px;
}
.header {
  box-shadow: 0px 2px 4px rgba(255, 255, 255, 0.2);
}
.container {
  box-shadow: 0 0 40px #fff;
}

.header .wrapper {
  background-color: inherit;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
