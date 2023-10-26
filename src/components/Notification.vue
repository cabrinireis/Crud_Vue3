<script setup lang="ts">
import { susStore } from '@/stores/index'
const store = susStore()
</script>

<template>
  <v-snackbar
    data-test="tele"
    width="auto"
    v-model="store.notification.active"
    :color="store.notification.type"
    :timeout="9000"
  >
    {{ store.notification.text }}
  </v-snackbar>
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
