<script>
import auth from '../services/auth'

export default {
  setup() {
    auth.logout();
  },
}
</script>

<template>
  <h1>Logged out</h1>
  <router-link to="/login">Login</router-link> 
</template>

<style>
</style>
