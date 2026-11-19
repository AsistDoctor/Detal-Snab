<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useUiStore } from '../stores/ui'

const props = defineProps({ mode: { type: String, default: 'login' } })
const isRegister = computed(() => props.mode === 'register')
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const ui = useUiStore()

const loginForm = reactive({ login: '', password: '', remember: false, consent: false })
const kind = ref('person')
const reg = reactive({
  email: '', password: '', password2: '',
  lastName: '', firstName: '', middleName: '', phone: '',
  company: '', inn: '', kpp: '', bank: '', bik: '', account: '', corr: '', ogrn: '', okpo: '',
  consentService: true, consentData: false,
})
const canRegister = computed(() => reg.consentService && reg.consentData)

function doLogin() {
  if (!loginForm.login.trim() || !loginForm.password) { ui.notify('Введите логин и пароль'); return }
  if (!loginForm.consent) { ui.notify('Необходимо согласие на обработку персональных данных'); return }
  auth.login({ email: loginForm.login, name: loginForm.login.split('@')[0] })
  ui.notify('Вы вошли в личный кабинет')
  router.push(String(route.query.redirect || '/account'))
}
function restore() { ui.notify('Инструкция по восстановлению отправлена на почту (демо)') }

function doRegister() {
  if (!canRegister.value) return
  if (!reg.email.trim() || reg.password.length < 4 || reg.password !== reg.password2 || !reg.firstName.trim() || !reg.phone.trim()) {
    ui.notify('Заполните обязательные поля, пароли должны совпадать'); return
  }
  auth.login({ email: reg.email, name: reg.firstName })
  ui.notify('Регистрация успешно выполнена')
  router.push('/account')
}
</script>

<template>
  <div class="container content-page auth-page">
    <div class="breadcrumbs"><RouterLink to="/">Главная</RouterLink><span>/</span>{{ isRegister ? 'Регистрация' : 'Вход' }}</div>

    <template v-if="!isRegister">
      <h1>Вход</h1>
      <div class="auth-card form-card">
        <label class="frow">
          <span>Телефон или Email*</span>
          <input v-model="loginForm.login" type="text" autocomplete="username" />
        </label>
        <label class="frow">
          <span>Пароль*</span>
          <input v-model="loginForm.password" type="password" autocomplete="current-password" />
        </label>
        <label class="pf-check" style="margin: 10px 0 16px"><input v-model="loginForm.remember" type="checkbox" /> Запомнить меня</label>
        <div class="login-row">
          <button class="primary-button login-btn" @click="doLogin">Войти</button>
          <div class="login-links">
            <a class="text-link" @click.prevent="restore" href="#">Восстановить пароль</a>
            <RouterLink class="text-link" to="/register">Зарегистрироваться</RouterLink>
          </div>
        </div>
        <label class="pf-check consent-line">
          <input v-model="loginForm.consent" type="checkbox" />
          <span>Согласен на обработку персональных данных и принимаю условия <a class="text-link" href="#" @click.prevent>соглашения</a></span>
        </label>
      </div>
    </template>

    <template v-else>
      <h1>Регистрация</h1>
      <div class="form-section type-section">
        <b>Выберите тип регистрации</b>
        <div class="type-radios">
          <label class="pf-check"><input v-model="kind" type="radio" value="company" name="regtype" /> Юридическое лицо</label>
          <label class="pf-check"><input v-model="kind" type="radio" value="person" name="regtype" /> Физическое лицо</label>
        </div>
      </div>

      <div class="form-section">
        <b class="fs-title">Регистрационные данные</b>
        <label class="frow"><span>Email*</span><input v-model="reg.email" type="email" autocomplete="email" /></label>
        <label class="frow"><span>Пароль*</span><input v-model="reg.password" type="password" autocomplete="new-password" /></label>
        <label class="frow"><span>Подтвердить пароль*</span><input v-model="reg.password2" type="password" autocomplete="new-password" /></label>
      </div>

      <div class="form-section">
        <b class="fs-title">Ваши контактные данные</b>
        <label class="frow"><span>Фамилия</span><input v-model="reg.lastName" type="text" /></label>
        <label class="frow"><span>Имя*</span><input v-model="reg.firstName" type="text" /></label>
        <label class="frow"><span>Отчество</span><input v-model="reg.middleName" type="text" /></label>
        <label class="frow"><span>Контактный номер*</span><input v-model="reg.phone" type="tel" placeholder="+7 (___) ___-__-__" /></label>
      </div>

      <div v-if="kind === 'company'" class="form-section">
        <b class="fs-title">Данные о компании</b>
        <label class="frow"><span>Название компании*</span><input v-model="reg.company" type="text" /></label>
        <label class="frow"><span>ИНН</span><input v-model="reg.inn" type="text" /></label>
        <label class="frow"><span>КПП</span><input v-model="reg.kpp" type="text" /></label>
        <label class="frow"><span>Банк</span><input v-model="reg.bank" type="text" /></label>
        <label class="frow"><span>БИК</span><input v-model="reg.bik" type="text" /></label>
        <label class="frow"><span>Счет</span><input v-model="reg.account" type="text" /></label>
        <label class="frow"><span>Корр. счет</span><input v-model="reg.corr" type="text" /></label>
        <label class="frow"><span>ОГРН</span><input v-model="reg.ogrn" type="text" /></label>
        <label class="frow"><span>ОКПО</span><input v-model="reg.okpo" type="text" /></label>
      </div>

      <div class="form-section">
        <b class="fs-title">{{ kind === 'company' ? 'Юридический адрес' : 'Адрес доставки' }}</b>
        <label class="frow"><span>Индекс</span><input type="text" /></label>
        <label class="frow"><span>Страна</span><input type="text" placeholder="Россия" /></label>
        <label class="frow"><span>Регион</span><input type="text" /></label>
        <label class="frow"><span>Город</span><input type="text" placeholder="Новосибирск" /></label>
        <label class="frow"><span>Улица</span><input type="text" /></label>
        <label class="frow"><span>Номер дома</span><input type="text" /></label>
        <label class="frow"><span>Корпус</span><input type="text" /></label>
        <label class="frow"><span>Квартира / Офис</span><input type="text" /></label>
      </div>

      <div class="consents">
        <label class="pf-check"><input v-model="reg.consentService" type="checkbox" /> С условиями предоставления услуг ознакомлен и согласен</label>
        <label class="pf-check"><input v-model="reg.consentData" type="checkbox" /> С условиями на обработку персональных данных и принимаю условия <a class="text-link" href="#" @click.prevent>соглашения</a></label>
      </div>
      <button class="primary-button full-button" :disabled="!canRegister" @click="doRegister">Зарегистрироваться</button>
    </template>
  </div>
</template>
