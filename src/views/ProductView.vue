<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { products, formatPrice } from '../data'
import { useCartStore } from '../stores/cart'
import { useUiStore } from '../stores/ui'
const route = useRoute()
const cart = useCartStore()
const ui = useUiStore()
const product = computed(() => products.find((item) => item.id === Number(route.params.id)) || products[0])
function add() { cart.add(product.value); ui.notify('Товар добавлен в корзину') }
</script>

<template>
  <div class="container content-page">
    <div class="breadcrumbs"><RouterLink to="/">Главная</RouterLink><span>/</span><RouterLink to="/catalog">Каталог</RouterLink><span>/</span>{{ product.name }}</div>
    <div class="product-detail">
      <div class="detail-image"><img :src="product.image" :alt="product.name" /></div>
      <div class="detail-info"><span class="eyebrow">{{ product.category }}</span><h1>{{ product.name }}</h1><p class="article-line">Артикул: <b>{{ product.article }}</b></p><div class="detail-specs"><div><span>Производитель</span><b>{{ product.manufacturer }}</b></div><div><span>Наличие</span><b class="stock-status">{{ product.stock }} шт.</b></div><div><span>Срок доставки</span><b>{{ product.delivery }}</b></div><div><span>Гарантия</span><b>Официальная</b></div></div><p class="detail-description">Оригинальная деталь высокого качества. Подходит для обслуживания и ремонта техники. Перед заказом рекомендуем проверить совместимость по артикулу.</p><div class="detail-price"><strong>{{ formatPrice(product.price) }}</strong><del v-if="product.oldPrice">{{ formatPrice(product.oldPrice) }}</del></div><button class="primary-button add-detail" @click="add">🛒 Добавить в корзину</button></div>
    </div>
    <section class="section-block related-products"><div class="section-heading"><h2>Похожие товары</h2><RouterLink to="/catalog" class="text-link">В каталог →</RouterLink></div><div class="product-grid"><article v-for="item in products.filter(p => p.id !== product.id).slice(0,4)" :key="item.id" class="product-compact"><img :src="item.image" :alt="item.name"/><div><b>{{ item.name }}</b><strong>{{ formatPrice(item.price) }}</strong><RouterLink :to="`/product/${item.id}`">Подробнее</RouterLink></div></article></div></section>
  </div>
</template>
