<script setup>
import { computed, ref } from 'vue'
import { useCartStore } from '../stores/cart'
import { useUiStore } from '../stores/ui'
import { formatPrice } from '../data'
import ProductCard from '../components/ProductCard.vue'
import { products } from '../data'

const cart = useCartStore()
const ui = useUiStore()
const checked = ref(new Set(cart.items.map((i) => i.id)))

const checkedItems = computed(() => cart.items.filter((i) => checked.value.has(i.id)))
const checkedCount = computed(() => checkedItems.value.reduce((sum, i) => sum + i.qty, 0))
const checkedTotal = computed(() => checkedItems.value.reduce((sum, i) => sum + i.price * i.qty, 0))
const allChecked = computed(() => cart.items.length > 0 && checked.value.size === cart.items.length)

function toggleAll() {
  checked.value = allChecked.value ? new Set() : new Set(cart.items.map((i) => i.id))
}
function toggleOne(id) {
  const next = new Set(checked.value)
  next.has(id) ? next.delete(id) : next.add(id)
  checked.value = next
}
function removeChecked() {
  if (!checked.value.size) { ui.notify('Отметьте позиции для удаления'); return }
  cart.items = cart.items.filter((i) => !checked.value.has(i.id))
  cart.persist()
  checked.value = new Set()
  ui.notify('Выбранные позиции удалены')
}
function setQty(id, value) {
  cart.setQty(id, value)
}
</script>

<template>
  <div class="container content-page">
    <div class="breadcrumbs"><RouterLink to="/">Главная</RouterLink><span>/</span> Корзина</div>
    <h1>Корзина</h1>

    <template v-if="cart.items.length">
      <div class="cart-toolbar">
        <label class="pf-check cart-check-all">
          <input type="checkbox" :checked="allChecked" @change="toggleAll" /> Выбрать все
        </label>
        <button class="text-button" @click="removeChecked">Удалить выбранные</button>
      </div>

      <div class="cart-table">
        <div class="cart-mock-head">
          <span>Артикул</span><span>Наименование</span><span>Срок</span><span>Склад</span>
          <span>Цена</span><span>Кол-во</span><span>Вес</span><span>Сумма</span><span></span>
        </div>
        <div v-for="item in cart.items" :key="item.id" class="cart-mock-row">
          <span><input type="checkbox" class="cart-cb" :checked="checked.has(item.id)" @change="toggleOne(item.id)" /></span>
          <span class="c-art"><b>{{ item.article }}</b><small>{{ item.brand }}</small></span>
          <span class="c-name"><RouterLink :to="`/product/${item.id}`">{{ item.name }}</RouterLink></span>
          <span class="c-term">{{ item.term }}</span>
          <span class="c-sup">{{ item.supplier }}</span>
          <span class="c-price">{{ formatPrice(item.price) }}</span>
          <span class="c-qty quantity-control">
            <button aria-label="Уменьшить" @click="setQty(item.id, item.qty - 1)">−</button>
            <input type="number" min="1" max="99" :value="item.qty" @change="setQty(item.id, $event.target.value)" />
            <button aria-label="Увеличить" @click="setQty(item.id, item.qty + 1)">+</button>
          </span>
          <span class="c-weight">{{ item.weight }}</span>
          <b class="c-sum">{{ formatPrice(item.price * item.qty) }}</b>
          <button class="remove-button" aria-label="Удалить" @click="cart.remove(item.id)">✕</button>
        </div>
        <div class="cart-mock-total">
          Итого товаров: <b>{{ checkedCount }}</b> на сумму <b>{{ formatPrice(checkedTotal) }}</b>
        </div>
        <div class="cart-mock-actions">
          <RouterLink class="primary-button" :class="{ 'is-disabled': !checkedCount }" to="/checkout">Оформить заказ</RouterLink>
        </div>
      </div>
    </template>

    <div v-else class="empty-state cart-empty">
      <div class="empty-icon"><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2l2.5 12.5a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L21 8H6" /><circle cx="9.5" cy="21" r="1" /><circle cx="17.5" cy="21" r="1" /></svg></div>
      <h2>В корзине пока пусто</h2>
      <p>Добавьте товары из каталога, чтобы оформить заказ.</p>
      <RouterLink to="/catalog" class="primary-button">Перейти в каталог</RouterLink>
    </div>

    <section class="section-block" aria-label="Популярные товары">
      <div class="section-heading"><h2>Популярные товары</h2>
        <div class="slider-arrows"><span class="slider-arrow slider-arrow-prev">‹</span><span class="slider-arrow slider-arrow-next">›</span></div>
      </div>
      <div class="products-track">
        <ProductCard v-for="product in products.slice(0, 4)" :key="product.id" :product="product" />
      </div>
    </section>
  </div>
</template>
