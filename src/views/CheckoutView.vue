<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useUiStore } from '../stores/ui'
import { formatPrice } from '../data'

const router = useRouter()
const cart = useCartStore()
const ui = useUiStore()
const delivery = ref('Самовывоз')
const car = ref('Не выбран')
const comment = ref('')

const totals = computed(() => ({
  count: cart.items.reduce((sum, i) => sum + i.qty, 0),
  sum: cart.total,
}))

function submit() {
  const order = {
    number: `DS-${Math.floor(100000 + Math.random() * 900000)}`,
    date: new Date().toLocaleDateString('ru-RU'),
    total: cart.total,
    delivery: delivery.value,
    items: totals.value.count,
  }
  sessionStorage.setItem('ds-last-order', JSON.stringify(order))
  cart.clear()
  ui.notify('Заказ отправлен менеджеру')
  router.push('/order-success')
}
</script>

<template>
  <div class="container content-page">
    <div class="breadcrumbs">
      <RouterLink to="/account">Личный кабинет</RouterLink><span>/</span>
      <RouterLink to="/cart">Корзина</RouterLink><span>/</span>
      Оформление заказа
    </div>
    <h1>Оформление заказа</h1>

    <div class="checkout-mock">
      <section class="form-section checkout-delivery">
        <h2>Вид доставки</h2>
        <label class="frow">
          <span>Способ получения</span>
          <select v-model="delivery">
            <option>Самовывоз</option>
            <option>Доставка ТК СДЭК</option>
            <option>Курьер EMS, Почта России</option>
          </select>
        </label>
        <label class="pf-check"><input type="checkbox" /> Сохранить настройки доставки</label>
        <label class="frow frow-top">
          <span>Комментарии к заказу</span>
          <textarea v-model="comment" rows="6" placeholder="Дополнительная информация для менеджера"></textarea>
        </label>
      </section>

      <aside class="order-summary checkout-cart">
        <h2>Ваша корзина</h2>
        <div class="summary-row"><span>Товары</span><b>{{ totals.count }} шт.</b></div>
        <div class="summary-row"><span>Сумма заказа</span><b>{{ formatPrice(totals.sum) }}</b></div>
        <label class="frow frow-car">
          <span>Привязать автомобиль</span>
          <select v-model="car">
            <option>Не выбран</option>
            <option>КАМАЗ 65117</option>
            <option>УАЗ Профи</option>
          </select>
        </label>
        <div class="checkout-total"><span>Итог к оплате:</span><strong>{{ formatPrice(totals.sum) }}</strong></div>
        <div class="checkout-btn-row">
          <button class="primary-button full-button" @click="submit">Оформить заказ</button>
          <RouterLink class="secondary-button full-button" to="/cart">Отмена</RouterLink>
        </div>
      </aside>
    </div>
  </div>
</template>
