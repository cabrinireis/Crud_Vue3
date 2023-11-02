<script setup lang="ts">
import { RouterView } from 'vue-router'
import Notification from './components/Notification.vue'
import router from './router'

const logout = () => {
  sessionStorage.clear()
  router.push('/')
}
</script>

<template>
  <v-layout>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon>
        <v-icon x-large color="whith darken-4"> mdi-book-open </v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title>SUSnet</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon @click="logout()">mdi-export</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main style="min-height: calc(100vh - 64px)">
      <router-view />
    </v-main>
    <notification />
  </v-layout>
</template>

<style>
.header {
  width: 100%;
}
.app-notification {
  width: 300px;
  display: flex;
  right: 0;
  position: absolute;
}
</style>
