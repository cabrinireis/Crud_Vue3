<script setup lang="ts">
import { RouterView } from 'vue-router'
import { susStore } from './stores'
const store = susStore()
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
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main style="min-height: calc(100vh - 64px)">
      <v-snackbar
        width="auto"
        v-model="store.notification.active"
        :color="store.notification.type"
        :timeout="2000"
      >
        {{ store.notification.text }}
      </v-snackbar>
      <router-view />
    </v-main>
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
