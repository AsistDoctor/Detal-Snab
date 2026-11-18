<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const cart = useCartStore()
const auth = useAuthStore()
const query = ref(String(route.query.q || ''))
const menuOpen = ref(false)
watch(() => route.query.q, (value) => { query.value = String(value || '') })
watch(() => route.fullPath, () => { menuOpen.value = false })
function search() {
  menuOpen.value = false
  router.push({ path: '/parts', query: query.value.trim() ? { q: query.value.trim() } : {} })
}
</script>

<template>
  <header class="site-header">
    <div class="topline">
      <div class="container topline-inner">
        <div class="topline-left">
          <span class="topline-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>Новосибирск</span>
          <a class="topline-item topline-phone" href="tel:+79137032658"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.5 2.8.7a2 2 0 0 1 1.7 2Z" /></svg>+7 913 703-26-58</a>
        </div>
        <nav class="top-nav" aria-label="Дополнительная навигация">
          <RouterLink to="/about">О компании</RouterLink>
          <div class="nav-drop">
            <RouterLink to="/how-to-find" class="with-caret">Новым клиентам<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></RouterLink>
            <div class="nav-drop-panel">
              <RouterLink to="/how-to-find">Как найти деталь</RouterLink>
              <RouterLink to="/how-to-order">Как сделать заказ</RouterLink>
              <RouterLink to="/payment">Оплата</RouterLink>
              <RouterLink to="/delivery">Доставка</RouterLink>
            </div>
          </div>
          <a href="#footer">Для поставщиков</a>
          <RouterLink to="/news">Новости</RouterLink>
          <RouterLink to="/contacts">Контакты</RouterLink>
        </nav>
        <RouterLink :to="auth.isLoggedIn ? '/account' : '/login'" class="account-link">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M6.2 18.5a6.5 6.5 0 0 1 11.6 0" /></svg>
          {{ auth.isLoggedIn ? 'Кабинет' : 'Вход' }}
        </RouterLink>
      </div>
    </div>

    <div class="main-header container">
      <RouterLink to="/" class="brand" aria-label="Деталь Снаб — на главную">
        <img src="../assets/logo-ds.png" alt="Деталь Снаб — запчасти для движения вперёд" width="132" height="92" class="brand-logo" />
      </RouterLink>
      <RouterLink to="/catalog" class="catalog-button">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="2" /><rect x="13" y="3" width="8" height="8" rx="2" /><rect x="3" y="13" width="8" height="8" rx="2" /><rect x="13" y="13" width="8" height="8" rx="2" /></svg>
        Каталог
      </RouterLink>
      <form class="header-search" @submit.prevent="search" role="search">
        <input v-model="query" type="search" placeholder="Артикул детали или наименование" aria-label="Поиск по каталогу" />
        <button type="submit" aria-label="Найти">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        </button>
      </form>
      <RouterLink to="/cart" class="header-cart">
        <span class="header-cart-label">Корзина</span>
        <span class="header-cart-icon"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2l2.5 12.5a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L21 8H6" /><circle cx="9.5" cy="21" r="1" /><circle cx="17.5" cy="21" r="1" /></svg></span>
        <b class="cart-count">{{ cart.count }}</b>
      </RouterLink>
      <button class="mobile-menu" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen" aria-label="Меню">
        <svg v-if="!menuOpen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" /></svg>
      </button>
    </div>

    <Transition name="drawer">
      <nav v-if="menuOpen" class="mobile-panel" aria-label="Меню">
        <RouterLink to="/catalog">Каталог</RouterLink>
        <RouterLink to="/about">О компании</RouterLink>
        <RouterLink to="/how-to-order">Новым клиентам</RouterLink>
        <a href="#footer" @click="menuOpen = false">Для поставщиков</a>
        <a href="#news" @click="menuOpen = false">Новости</a>
        <RouterLink to="/contacts">Контакты</RouterLink>
        <RouterLink :to="auth.isLoggedIn ? '/account' : '/login'">{{ auth.isLoggedIn ? 'Личный кабинет' : 'Вход' }}</RouterLink>
      </nav>
    </Transition>
  </header>
</template>
