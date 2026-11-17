<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cart'
import { formatPrice } from '../data'
const cart = useCartStore()
const shipping = 0
const total = computed(() => cart.total + shipping)
</script>

<template>
  <div class="container content-page">
    <div class="breadcrumbs"><RouterLink to="/">Главная</RouterLink><span>/</span> Корзина</div>
    <div class="page-title-row"><div><h1>Корзина</h1><p class="muted">Проверьте список товаров перед оформлением заказа</p></div><span class="result-count">{{ cart.count }} товара</span></div>
    <div v-if="cart.items.length" class="cart-layout">
      <section class="cart-table-wrap">
        <div class="cart-table-head"><span>Товар</span><span>Цена</span><span>Количество</span><span>Сумма</span><span></span></div>
        <article v-for="item in cart.items" :key="item.id" class="cart-row">
          <div class="cart-product"><img :src="item.image" :alt="item.name"/><div><RouterLink :to="`/product/${item.id}`">{{ item.name }}</RouterLink><small>Артикул: {{ item.article }}</small></div></div>
          <div class="cart-price">{{ formatPrice(item.price) }}</div>
          <div class="quantity-control"><button @click="cart.setQty(item.id, item.qty - 1)" aria-label="Уменьшить">−</button><input type="number" min="1" max="99" :value="item.qty" @change="cart.setQty(item.id, $event.target.value)"/><button @click="cart.setQty(item.id, item.qty + 1)" aria-label="Увеличить">+</button></div>
          <b class="cart-line-total">{{ formatPrice(item.price * item.qty) }}</b>
          <button class="remove-button" @click="cart.remove(item.id)" aria-label="Удалить товар">×</button>
        </article>
        <div class="cart-footer-actions"><RouterLink to="/catalog" class="text-link">← Продолжить покупки</RouterLink><button class="reset-link" @click="cart.clear()">Очистить корзину</button></div>
      </section>
      <aside class="order-summary"><h2>Ваш заказ</h2><div class="summary-row"><span>Товары ({{ cart.count }})</span><b>{{ formatPrice(cart.total) }}</b></div><div class="summary-row"><span>Доставка</span><b>Рассчитывается отдельно</b></div><div class="summary-total"><span>Итого</span><strong>{{ formatPrice(total) }}</strong></div><RouterLink to="/checkout" class="primary-button full-button">Оформить заказ</RouterLink><p class="summary-note">Окончательная стоимость доставки будет рассчитана менеджером после оформления заказа.</p></aside>
    </div>
    <div v-else class="empty-state cart-empty"><div class="empty-icon">🛒</div><h2>В корзине пока пусто</h2><p>Добавьте товары из каталога, чтобы оформить заказ.</p><RouterLink to="/catalog" class="primary-button">Перейти в каталог</RouterLink></div>
  </div>
</template>
