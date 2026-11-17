<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useUiStore } from '../stores/ui'
const props = defineProps({ mode: { type: String, default: 'login' } })
const isRegister = ref(props.mode === 'register')
const kind = ref('person')
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const ui = useUiStore()
const form = reactive({ name: '', email: '', password: '', company: '', inn: '', agree: true })
function submit() {
  if (!form.email.trim() || form.password.length < 4 || (isRegister.value && !form.name.trim())) {
    ui.notify(isRegister.value ? 'Заполните имя, email и пароль (не менее 4 символов)' : 'Введите email и пароль от 4 символов')
    return
  }
  auth.login({ email: form.email, name: form.name })
  ui.notify(isRegister.value ? 'Демо-аккаунт создан' : 'Вы вошли в демо-аккаунт')
  router.push(String(route.query.redirect || '/account'))
}
</script>

<template>
  <div class="container content-page auth-page">
    <div class="breadcrumbs"><RouterLink to="/">Главная</RouterLink><span>/</span>{{ isRegister ? 'Регистрация' : 'Вход' }}</div>
    <div class="auth-card">
      <div class="auth-tabs"><button :class="{ active: !isRegister }" @click="isRegister = false">Вход</button><button :class="{ active: isRegister }" @click="isRegister = true">Регистрация</button></div>
      <h1>{{ isRegister ? 'Регистрация' : 'Вход в личный кабинет' }}</h1>
      <p class="muted">{{ isRegister ? 'Создайте демо-аккаунт для оформления заказов' : 'Введите данные для входа в личный кабинет' }}</p>
      <form @submit.prevent="submit" class="auth-form">
        <div v-if="isRegister" class="type-switch"><button type="button" :class="{ active: kind === 'person' }" @click="kind = 'person'">Физическое лицо</button><button type="button" :class="{ active: kind === 'company' }" @click="kind = 'company'">Юридическое лицо</button></div>
        <label v-if="isRegister" class="field">{{ kind === 'company' ? 'Контактное лицо' : 'ФИО' }} *<input v-model="form.name" required placeholder="Введите имя"/></label>
        <label v-if="isRegister && kind === 'company'" class="field">Название организации<input v-model="form.company" placeholder="ООО «Компания»"/></label>
        <label v-if="isRegister && kind === 'company'" class="field">ИНН<input v-model="form.inn" placeholder="ИНН"/></label>
        <label class="field">Электронная почта *<input v-model="form.email" type="email" required placeholder="name@example.ru" autocomplete="email"/></label>
        <label class="field">Пароль *<input v-model="form.password" type="password" required minlength="4" placeholder="Не менее 4 символов" autocomplete="current-password"/></label>
        <label v-if="isRegister" class="check-line agree-line"><input v-model="form.agree" type="checkbox"/> Согласен на обработку персональных данных</label>
        <button class="primary-button full-button" type="submit">{{ isRegister ? 'Зарегистрироваться' : 'Войти' }}</button>
        <p class="demo-note">Демо-режим: можно использовать любые тестовые данные. Настоящая авторизация не выполняется.</p>
      </form>
    </div>
  </div>
</template>
