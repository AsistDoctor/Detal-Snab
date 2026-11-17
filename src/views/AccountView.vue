<script setup>
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useUiStore } from '../stores/ui'
const route = useRoute()
const auth = useAuthStore()
const ui = useUiStore()
const section = computed(() => route.params.section || 'profile')
const profile = reactive({ name: auth.user?.name || '', email: auth.user?.email || '', phone: '', company: auth.user?.company || 'ООО «Демо-компания»', inn: '' })
function save() { auth.login({ email: profile.email, name: profile.name }); ui.notify('Данные демо-профиля сохранены') }
function logout() { auth.logout(); ui.notify('Вы вышли из аккаунта') }
</script>

<template>
  <div class="container content-page">
    <div class="breadcrumbs"><RouterLink to="/">Главная</RouterLink><span>/</span> Личный кабинет</div>
    <div class="page-title-row"><div><h1>Личный кабинет</h1><p class="muted">Управление вашими данными и заказами</p></div><button class="text-button" @click="logout">Выйти из аккаунта ↗</button></div>
    <div class="account-layout">
      <aside class="account-sidebar"><div class="user-mini"><span class="user-avatar">{{ (auth.user?.name || 'П')[0].toUpperCase() }}</span><div><b>{{ auth.user?.name }}</b><small>{{ auth.user?.email }}</small></div></div><RouterLink to="/account" :class="{ active: section === 'profile' }">Личные данные</RouterLink><RouterLink to="/account/orders" :class="{ active: section === 'orders' }">История заказов</RouterLink><RouterLink to="/account/invoices" :class="{ active: section === 'invoices' }">Счета</RouterLink></aside>
      <section class="account-content">
        <template v-if="section === 'profile'"><h2>Личные данные</h2><p class="muted">Информация хранится только в этом браузере и используется для демонстрации.</p><form class="profile-form" @submit.prevent="save"><label class="field">ФИО / контактное лицо<input v-model="profile.name" required/></label><label class="field">Электронная почта<input v-model="profile.email" type="email" required/></label><label class="field">Телефон<input v-model="profile.phone" placeholder="+7 ___ ___-__-__"/></label><label class="field">Организация<input v-model="profile.company"/></label><label class="field">ИНН<input v-model="profile.inn" placeholder="ИНН"/></label><button class="primary-button">Сохранить изменения</button></form></template>
        <template v-else-if="section === 'orders'"><h2>История заказов</h2><div class="table-scroll"><table class="data-table"><thead><tr><th>Номер заказа</th><th>Дата</th><th>Сумма</th><th>Статус</th></tr></thead><tbody><tr><td>DS-102481</td><td>12.11.2026</td><td>12 340 ₽</td><td><span class="status status-done">Выполнен</span></td></tr><tr><td>DS-102316</td><td>03.11.2026</td><td>8 490 ₽</td><td><span class="status status-progress">Обрабатывается</span></td></tr></tbody></table></div><p class="muted small-note">Данные заказов демонстрационные.</p></template>
        <template v-else><h2>Счета</h2><div class="table-scroll"><table class="data-table"><thead><tr><th>Номер</th><th>Дата</th><th>Сумма</th><th>Статус</th><th></th></tr></thead><tbody><tr><td>СЧ-000124</td><td>12.11.2026</td><td>12 340 ₽</td><td><span class="status status-progress">Ожидает оплаты</span></td><td><button class="download-link" @click="ui.notify('В демо-версии файлы счетов не формируются')">Скачать PDF</button></td></tr><tr><td>СЧ-000098</td><td>03.11.2026</td><td>8 490 ₽</td><td><span class="status status-done">Оплачен</span></td><td><button class="download-link" @click="ui.notify('В демо-версии файлы счетов не формируются')">Скачать PDF</button></td></tr></tbody></table></div><p class="muted small-note">Счета показаны для примера. Реальные документы не создаются.</p></template>
      </section>
    </div>
  </div>
</template>
