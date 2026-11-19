<script setup>
import { computed, ref } from 'vue'
import { useUiStore } from '../stores/ui'
const ui = useUiStore()
const order = computed(() => {
  try { return JSON.parse(sessionStorage.getItem('ds-last-order') || 'null') } catch { return null }
})
const payMethod = ref('')
function choosePay(method) {
  payMethod.value = method
  ui.notify(`Способ оплаты: ${method} (демо)`)
}
</script>

<template>
  <div class="container content-page">
    <div class="breadcrumbs">
      <RouterLink to="/account">Личный кабинет</RouterLink><span>/</span>
      <RouterLink to="/cart">Корзина</RouterLink><span>/</span>
      Заказ оформлен
    </div>
    <h1>Заказ оформлен!</h1>

    <div v-if="order" class="success-mock">
      <section class="form-section">
        <b class="success-number">Заказ №{{ order.number }} от {{ order.date }}</b>
        <div class="summary-row"><span>Способ получения</span><b>{{ order.delivery }}</b></div>
        <div class="summary-row"><span>Сумма заказа</span><b>{{ order.items }} шт., {{ order.total.toLocaleString('ru-RU') }} ₽</b></div>
      </section>
      <section class="form-section">
        <h2>Выберите способ оплаты</h2>
        <div class="pay-choice">
          <button :class="{ selected: payMethod === 'card' }" @click="choosePay('Оплатой картой')">Оплатой картой</button>
          <button :class="{ selected: payMethod === 'transfer' }" @click="choosePay('Перевод на карту')">Перевод на карту</button>
        </div>
      </section>
      <RouterLink to="/account/orders" class="primary-button full-button success-back">Вернуться к заказам</RouterLink>
    </div>

    <div v-else class="empty-state cart-empty">
      <h2>Заказ не найден</h2>
      <p>Похоже, вы не оформляли заказ в этой сессии.</p>
      <RouterLink to="/catalog" class="primary-button">Перейти в каталог</RouterLink>
    </div>
  </div>
</template>
