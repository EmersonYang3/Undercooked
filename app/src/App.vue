<template>
  <router-view/>
  <notifications-view />
</template>

<script setup lang="ts">
import NotificationsView from './views/Global/NotificationsView.vue';

import KeyBindService from './services/KeyBindService';

KeyBindService.OnKeyHeldDown(" ", () => {
  console.log("space is being held down")
})

KeyBindService.OnKeyReleased(" ", (duration: number) => {
  console.log(`space was released after being held for ${duration}ms`)
})
</script>