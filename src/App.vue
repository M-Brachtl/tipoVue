<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <RouterView />
  <nav>
    <RouterLink to="/">Global View</RouterLink>
    <RouterLink to="/user">User View</RouterLink>
  </nav>
</template>