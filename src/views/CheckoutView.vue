<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import { useUiStore } from '../stores/ui'
import { formatPrice } from '../data'
const router = useRouter()
const cart = useCartStore()
const auth = useAuthStore()
const ui = useUiStore()
const form = reactive({ type: 'person', name: auth.user?.name || '', phone: '', email: auth.user?.email || '', company: '', inn: '', city: 'Новосибирск', address: '', comment: '', delivery: 'transport', payment: 'invoice' })
function submit() {
  if (!cart.items.length) { router.push('/cart'); return }
  if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.city.trim() || !form.address.trim()) {
    ui.notify('Заполните обязательные поля'); return
  }
  const order = { number: `DS-${Math.floor(100000 + Math.random() * 900000)}`, date: new Date().toLocaleDateString('ru-RU'), total: cart.total }
  sessionStorage.setItem('ds-last-order', JSON.stringify(order))
  cart.clear()
  router.push('/order-success')
}
</script>

<template>
  <div class="container content-page">
    <div class="breadcrumbs"><RouterLink to="/">Главная</RouterLink><span>/</span><RouterLink to="/cart">Корзина</RouterLink><span>/</span> Оформление заказа</div>
    <div class="page-title-row"><div><h1>Оформление заказа</h1><p class="muted">Укажите контактные данные и способ получения заказа</p></div></div>
    <div v-if="cart.items.length" class="checkout-layout">
      <form class="checkout-form" @submit.prevent="submit">
        <section class="form-section"><h2>Покупатель</h2><div class="type-switch"><button type="button" :class="{ active: form.type === 'person' }" @click="form.type = 'person'">Физическое лицо</button><button type="button" :class="{ active: form.type === 'company' }" @click="form.type = 'company'">Юридическое лицо</button></div>
          <div class="form-grid"><label class="field full-field">{{ form.type === 'company' ? 'Контактное лицо' : 'ФИО' }} *<input v-model="form.name" required placeholder="Введите имя"/></label><label v-if="form.type === 'company'" class="field">Название компании *<input v-model="form.company" required placeholder="ООО «Компания»"/></label><label v-if="form.type === 'company'" class="field">ИНН<input v-model="form.inn" placeholder="ИНН организации"/></label><label class="field">Телефон *<input v-model="form.phone" required placeholder="+7 (___) ___-__-__"/></label><label class="field">Электронная почта *<input v-model="form.email" type="email" required placeholder="name@example.ru"/></label></div>
        </section>
        <section class="form-section"><h2>Доставка</h2><div class="choice-card"><label><input v-model="form.delivery" value="transport" type="radio"/><span><b>Транспортной компанией</b><small>Стоимость и срок доставки уточнит менеджер</small></span></label><label><input v-model="form.delivery" value="pickup" type="radio"/><span><b>Самовывоз со склада</b><small>Новосибирск, адрес согласуем после заказа</small></span></label></div><div class="form-grid"><label class="field">Город *<input v-model="form.city" required /></label><label class="field">Адрес доставки *<input v-model="form.address" required placeholder="Улица, дом, индекс"/></label></div></section>
        <section class="form-section"><h2>Оплата</h2><div class="choice-card"><label><input v-model="form.payment" type="radio" value="invoice"/><span><b>Счёт на оплату</b><small>Менеджер подготовит счёт после обработки заказа</small></span></label><label><input v-model="form.payment" type="radio" value="card"/><span><b>Оплата при получении</b><small>Возможность зависит от способа доставки</small></span></label></div><label class="field">Комментарий к заказу<textarea v-model="form.comment" rows="3" placeholder="Дополнительная информация"></textarea></label></section>
        <button class="primary-button full-button submit-order">Подтвердить заказ</button><p class="form-disclaimer">Нажимая кнопку, вы отправляете тестовую заявку. Реальная оплата и отправка данных не выполняются.</p>
      </form>
      <aside class="order-summary"><h2>Ваш заказ</h2><div v-for="item in cart.items" :key="item.id" class="checkout-item"><span>{{ item.name }} <small>× {{ item.qty }}</small></span><b>{{ formatPrice(item.price * item.qty) }}</b></div><div class="summary-row"><span>Товары</span><b>{{ formatPrice(cart.total) }}</b></div><div class="summary-row"><span>Доставка</span><b>Уточняется</b></div><div class="summary-total"><span>Итого</span><strong>{{ formatPrice(cart.total) }}</strong></div></aside>
    </div>
    <div v-else class="empty-state"><h2>Корзина пуста</h2><p>Сначала добавьте товары в корзину.</p><RouterLink to="/catalog" class="primary-button">Перейти в каталог</RouterLink></div>
  </div>
</template>
