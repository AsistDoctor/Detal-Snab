<script setup>
defineProps({ open: Boolean, title: String, intro: String, blocks: Array })
const emit = defineEmits(['close'])
</script>

<template>
  <Transition name="toast">
    <div v-if="open" class="pmodal-overlay" @click.self="emit('close')">
      <div class="pmodal pmodal-nk" role="dialog" :aria-label="title">
        <button class="pmodal-close" aria-label="Закрыть" @click="emit('close')"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" /></svg></button>
        <h2>{{ title }}</h2>
        <p class="info-intro">{{ intro }}</p>
        <div class="nk-blocks">
          <div v-for="b in blocks" :key="b.h" class="info-block">
            <h3>{{ b.h }}</h3>
            <p v-for="t in b.text || []" :key="t">{{ t }}</p>
            <ul v-if="b.bullets"><li v-for="li in b.bullets" :key="li">{{ li }}</li></ul>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
