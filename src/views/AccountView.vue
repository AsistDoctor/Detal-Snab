<script setup>
import { computed, reactive, ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useUiStore } from '../stores/ui'

const props = defineProps({ section: { type: String, default: 'dashboard' } })
const auth = useAuthStore()
const ui = useUiStore()

const profile = reactive({
  email: auth.user?.email || '', password: '', password2: '',
  lastName: '', firstName: auth.user?.name || '', middleName: '', phone: '',
  addrIndex: '', addrCountry: '', addrRegion: '', addrCity: '', addrStreet: '', addrHouse: '', addrBuilding: '', addrFlat: '',
})
function saveProfile() {
  if (!profile.email.trim() || !profile.firstName.trim()) { ui.notify('Заполните Email и Имя'); return }
  auth.user = { ...auth.user, email: profile.email, name: profile.firstName }
  localStorage.setItem('ds-user', JSON.stringify(auth.user))
  ui.notify('Изменения сохранены')
}

const invoices = [
  { id: 1, date: '10.10.2023 19:00', order: 'Заказ № 333', sum: '2200.00 ₽', status: 'wait' },
  { id: 2, date: '03.11.2026 14:20', order: 'Заказ № 318', sum: '8 490.00 ₽', status: 'paid' },
  { id: 3, date: '18.11.2026 09:35', order: 'Заказ № 341', sum: '12 340.00 ₽', status: 'work' },
]
const statusLabels = { wait: 'Ждет оплаты', paid: 'Оплачен', work: 'В работе' }
const invSearch = ref('')
const invStatus = ref('')
const invPeriod = ref('все')
const filteredInvoices = computed(() =>
  invoices.filter((inv) => {
    if (invSearch.value && !inv.order.toLowerCase().includes(invSearch.value.toLowerCase())) return false
    if (invStatus.value && inv.status !== invStatus.value) return false
    return true
  }),
)
function resetInvFilters() {
  invSearch.value = ''
  invStatus.value = ''
  invPeriod.value = 'all'
  ui.notify('Фильтры очищены')
}

const orders = [
  { id: 'DS-102481', date: '12.11.2026', sum: '12 340 ₽', status: 'done' },
  { id: 'DS-102316', date: '03.11.2026', sum: '8 490 ₽', status: 'progress' },
]
const statusText = { done: 'Выполнен', progress: 'Обрабатывается' }

function stub(name) { ui.notify(`Раздел «${name}» в разработке`) }
</script>

<template>
  <div class="container content-page">
    <div class="breadcrumbs"><RouterLink to="/">Главная</RouterLink><span>/</span> Личный кабинет</div>

    <!-- Дашборд -->
    <template v-if="section === 'dashboard'">
      <div class="acc-head">
        <h1>Личный кабинет</h1>
        <div class="acc-code-wrap"><span class="acc-code">000-000-00</span><span class="acc-code-hint">Ваш код для получения заказа</span></div>
      </div>

      <div class="acc-cards">
        <div class="acc-card">
          <div class="acc-card-head"><h3>Профиль</h3><RouterLink class="text-link" to="/account/profile">Редактировать</RouterLink></div>
          <div class="acc-row"><span>Имя</span><b>{{ auth.user?.name || '—' }}</b></div>
          <div class="acc-row"><span>Телефон</span><b>+7 (777) 000-00-00</b></div>
          <div class="acc-row"><span>Email</span><b>{{ auth.user?.email || '—' }}</b></div>
          <div class="acc-row"><span>Уровень цен</span><b>Розница</b></div>
          <div class="acc-row"><span>Дисконтная карта</span><input class="acc-input" type="text" placeholder="Введите номер карты" /></div>
        </div>
        <div class="acc-card">
          <div class="acc-card-head"><h3>Баланс</h3><a class="text-link" href="#" @click.prevent="stub('История баланса')">История</a></div>
          <div class="acc-row"><span>Состояние счета</span><b>0.00₽</b></div>
          <div class="acc-row"><span>Всего в работе</span><b>0.00₽</b></div>
          <div class="acc-row"><span>Не обработан</span><b>0.00₽</b></div>
          <div class="acc-row"><span>Неоплаченные счета</span><b>0.00₽</b></div>
        </div>
        <div class="acc-card">
          <div class="acc-card-head"><h3>Ваш менеджер</h3></div>
          <div class="acc-row"><span>Имя</span><b>Петр Петрович</b></div>
          <div class="acc-row"><span>Телефон</span><b>+7 (777) 000-00-00</b></div>
          <div class="acc-row"><span>Email</span><b>petr@gmail.com</b></div>
        </div>
      </div>

      <div class="acc-tiles">
        <RouterLink class="acc-tile" to="/account/orders"><b>Заказы</b><small>Состояние и история Ваших заказов</small></RouterLink>
        <RouterLink class="acc-tile" to="/cart"><b>Корзина</b><small>Содержимое Вашей корзины</small></RouterLink>
        <RouterLink class="acc-tile" to="/account/invoices"><b>Счета</b><small>Счета выставленные Вам для оплаты</small></RouterLink>
        <a class="acc-tile" href="#" @click.prevent="stub('Накладные')"><b>Накладные</b><small>Накладные оформляемые для выдачи товара</small></a>
        <a class="acc-tile" href="#" @click.prevent="stub('Отправки')"><b>Отправки</b><small>Учет отправок транспортными компаниями</small></a>
      </div>
    </template>

    <!-- Настройка профиля -->
    <template v-else-if="section === 'profile'">
      <h1>Настройка профиля</h1>
      <div class="form-section">
        <b class="fs-title">Регистрационные данные</b>
        <label class="frow"><span>Email*</span><input v-model="profile.email" type="email" /></label>
        <label class="frow"><span>Пароль*</span><input v-model="profile.password" type="password" /></label>
        <label class="frow"><span>Подтвердить пароль*</span><input v-model="profile.password2" type="password" /></label>
      </div>
      <div class="form-section">
        <b class="fs-title">Ваши контактные данные</b>
        <label class="frow"><span>Фамилия</span><input v-model="profile.lastName" type="text" /></label>
        <label class="frow"><span>Имя*</span><input v-model="profile.firstName" type="text" /></label>
        <label class="frow"><span>Отчество</span><input v-model="profile.middleName" type="text" /></label>
        <label class="frow"><span>Контактный номер*</span><input v-model="profile.phone" type="tel" /></label>
      </div>
      <div class="form-section">
        <b class="fs-title">Адрес доставки</b>
        <label class="frow"><span>Индекс</span><input v-model="profile.addrIndex" type="text" /></label>
        <label class="frow"><span>Страна</span><input v-model="profile.addrCountry" type="text" /></label>
        <label class="frow"><span>Регион</span><input v-model="profile.addrRegion" type="text" /></label>
        <label class="frow"><span>Город</span><input v-model="profile.addrCity" type="text" /></label>
        <label class="frow"><span>Улица</span><input v-model="profile.addrStreet" type="text" /></label>
        <label class="frow"><span>Номер дома</span><input v-model="profile.addrHouse" type="text" /></label>
        <label class="frow"><span>Корпус</span><input v-model="profile.addrBuilding" type="text" /></label>
        <label class="frow"><span>Квартира / Офис</span><input v-model="profile.addrFlat" type="text" /></label>
      </div>
      <button class="primary-button full-button" @click="saveProfile">Сохранить изменения</button>
    </template>

    <!-- Заказы -->
    <template v-else-if="section === 'orders'">
      <h1>Заказы</h1>
      <div class="table-scroll">
        <table class="data-table">
          <thead><tr><th>Номер заказа</th><th>Дата</th><th>Сумма</th><th>Статус</th></tr></thead>
          <tbody>
            <tr v-for="o in orders" :key="o.id">
              <td>{{ o.id }}</td><td>{{ o.date }}</td><td>{{ o.sum }}</td>
              <td><span :class="['status', o.status === 'done' ? 'status-done' : 'status-progress']">{{ statusText[o.status] }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="muted small-note">Данные заказов демонстрационные.</p>
    </template>

    <!-- Счета -->
    <template v-else-if="section === 'invoices'">
      <h1>Счета</h1>
      <div class="inv-filters">
        <div class="inv-filters-row">
          <input v-model="invSearch" type="search" placeholder="Поиск" aria-label="Поиск по счетам" />
          <input type="date" placeholder="с" aria-label="Дата с" />
          <input type="date" placeholder="по" aria-label="Дата по" />
          <select v-model="invStatus" aria-label="Статус счета">
            <option value="">Выберите статус</option>
            <option value="wait">Ждет оплаты</option>
            <option value="paid">Оплачен</option>
            <option value="work">В работе</option>
          </select>
        </div>
        <div class="inv-periods">
          <span>Счета за:</span>
          <a v-for="p in ['3 дня', 'неделю', 'месяц', 'год', 'все']" :key="p" :class="{ active: invPeriod === p }" @click="invPeriod = p">{{ p }}</a>
        </div>
        <div class="inv-filter-actions">
          <button class="secondary-button" @click="resetInvFilters">Очистить</button>
          <button class="primary-button" @click="ui.notify('Фильтры применены')">Применить</button>
        </div>
      </div>

      <div class="table-scroll">
        <table class="data-table inv-table">
          <thead><tr><th>Дата и время</th><th>Заказ</th><th>Сумма</th><th>Статус</th><th></th></tr></thead>
          <tbody>
            <tr v-for="inv in filteredInvoices" :key="inv.id">
              <td>{{ inv.date }}</td>
              <td>{{ inv.order }}</td>
              <td>{{ inv.sum }}</td>
              <td>
                <span v-if="inv.status === 'wait'" class="pstatus pstatus-wait"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v6" /><path d="M12 16h.01" /></svg>{{ statusLabels[inv.status] }}</span>
                <span v-else-if="inv.status === 'work'" class="pstatus pstatus-work">{{ statusLabels[inv.status] }}</span>
                <span v-else class="pstatus pstatus-ok">{{ statusLabels[inv.status] }}</span>
              </td>
              <td>
                <div class="inv-actions">
                  <button class="secondary-button inv-btn" @click="ui.notify('Счет скачивается (демо)')">Скачать <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></button>
                  <button class="secondary-button inv-btn inv-btn-outline" @click="ui.notify('Прикрепите файл чека (демо)')"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></svg> Приложить чек</button>
                  <button v-if="inv.status === 'wait'" class="secondary-button inv-btn inv-btn-muted" @click="ui.notify('Оплата по счету — по согласованию с менеджером (демо)')">Оплатить</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="!filteredInvoices.length" class="pempty">Счетов по заданным условиям нет.</p>
      </div>
    </template>
  </div>
</template>
