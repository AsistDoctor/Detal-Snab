<script setup>
import { computed } from 'vue'
import { formatPrice } from '../data'
const order = computed(() => {
  try { return JSON.parse(sessionStorage.getItem('ds-last-order') || 'null') } catch { return null }
})
</script>

<template>
  <div class="container content-page success-page"><div class="success-card"><div class="success-check">✓</div><h1>Заказ оформлен!</h1><p>Спасибо. Ваша демо-заявка успешно создана.</p><div v-if="order" class="success-order"><span>Номер заказа</span><b>{{ order.number }}</b><span>Дата оформления</span><b>{{ order.date }}</b><span>Сумма заказа</span><b>{{ formatPrice(order.total) }}</b></div><p class="muted">Это тестовый сценарий: заявка не отправляется в магазин, менеджер не получает уведомление и оплата не производится.</p><RouterLink to="/catalog" class="primary-button">Продолжить покупки</RouterLink></div></div>
</template>
