<script setup>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import { useUiStore } from './stores/ui'
const ui = useUiStore()
</script>

<template>
  <div class="app-shell">
    <SiteHeader />
    <main class="page-main">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </RouterView>
    </main>
    <SiteFooter />
    <Transition name="toast">
      <div v-if="ui.toast" class="toast-message" role="status">{{ ui.toast }}</div>
    </Transition>
  </div>
</template>
