<script setup>
import { formatPrice } from '../data'
import { useCartStore } from '../stores/cart'
import { useUiStore } from '../stores/ui'
const props = defineProps({ product: { type: Object, required: true } })
const cart = useCartStore()
const ui = useUiStore()
function add() { cart.add(props.product); ui.notify('Товар добавлен в корзину') }
</script>

<template>
  <article class="product-card">
    <RouterLink :to="`/product/${product.id}`" class="product-image-wrap">
      <span v-if="product.badge" class="product-badge">{{ product.badge }}</span>
      <img :src="product.image" :alt="product.name" class="product-image" />
    </RouterLink>
    <div class="product-meta">Артикул: {{ product.article }}</div>
    <RouterLink :to="`/product/${product.id}`" class="product-name">{{ product.name }}</RouterLink>
    <div class="product-bottom">
      <div><strong>{{ formatPrice(product.price) }}</strong><del v-if="product.oldPrice">{{ formatPrice(product.oldPrice) }}</del></div>
      <button class="icon-cart-btn" @click="add" aria-label="Добавить в корзину">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2l2.5 12.5a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L21 8H6" /><circle cx="9.5" cy="21" r="1" /><circle cx="17.5" cy="21" r="1" /></svg>
      </button>
    </div>
  </article>
</template>
