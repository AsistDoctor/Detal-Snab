<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { offers, partInfo, partMakers, PART_KINDS, formatPriceRaw } from '../partsData'
import { useCartStore } from '../stores/cart'
import { useUiStore } from '../stores/ui'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()
const ui = useUiStore()

const query = String(route.query.q || '').trim()

const filters = reactive({
  minPrice: '',
  maxPrice: '',
  suppliers: [],
  daysMax: '',
  qtyFrom: '',
  makerQuery: '',
  makers: [],
  kinds: [],
})
const showAllParams = ref(false)
const selected = ref(null)

const makerChoices = computed(() => {
  const q = filters.makerQuery.trim().toLowerCase()
  return q ? partMakers.filter((m) => m.toLowerCase().includes(q)) : partMakers
})

const filtered = computed(() =>
  offers.filter((o) => {
    if (filters.minPrice && o.price < Number(filters.minPrice)) return false
    if (filters.maxPrice && o.price > Number(filters.maxPrice)) return false
    if (filters.suppliers.length && !filters.suppliers.some((s) => o.suppliers.includes(s))) return false
    if (filters.daysMax !== '' && o.days > Number(filters.daysMax)) return false
    if (filters.qtyFrom !== '' && o.qty < Number(filters.qtyFrom)) return false
    if (filters.makers.length && !filters.makers.includes(o.maker)) return false
    if (filters.kinds.length && !filters.kinds.includes(o.kind)) return false
    return true
  }),
)

const groups = computed(() =>
  PART_KINDS.map((kind) => ({ ...kind, rows: filtered.value.filter((o) => o.kind === kind.key) })),
)

const bestMinPrice = computed(() => [...filtered.value].sort((a, b) => a.price - b.price)[0] || null)
const bestInStock = computed(() =>
  [...filtered.value].filter((o) => o.days === 0).sort((a, b) => b.qty - a.qty)[0] || null,
)
const bestFastest = computed(() => [...filtered.value].filter((o) => o.days > 0).sort((a, b) => a.days - b.days)[0] || null)

function reset() {
  filters.minPrice = ''
  filters.maxPrice = ''
  filters.suppliers = []
  filters.daysMax = ''
  filters.qtyFrom = ''
  filters.makers = []
  filters.kinds = []
  ui.notify('Фильтры сброшены')
}

function add(row) {
  cart.add({ id: 'part-' + row.id, name: `${row.brand} — ${row.name}`, article: row.code, price: row.price, image: partInfo.photo })
  ui.notify('Деталь добавлена в корзину')
}

function findInCatalog() {
  router.push({ path: '/catalog', query: { q: query || partInfo.code } })
}

function qtyFrom(delta) {
  const current = Number(filters.qtyFrom)
  filters.qtyFrom = Math.max(0, Math.min(99, (Number.isFinite(current) ? current : 0) + delta))
}
</script>

<template>
  <div class="container content-page parts-page">
    <div class="breadcrumbs"><RouterLink to="/">Главная</RouterLink><span>/</span>Поиск детали по коду</div>

    <h1 class="part-title">{{ query ? `Запрос: «${query}»` : partInfo.name }}</h1>

    <section class="part-card">
      <div class="part-photo"><img :src="partInfo.photo" alt="Фото детали" /></div>
      <dl class="part-params">
        <div class="part-param"><dt>Артикул</dt><dd>{{ partInfo.code }}</dd></div>
        <div class="part-param"><dt>Производитель</dt><dd>{{ partInfo.manufacturer }}</dd></div>
        <div class="part-param"><dt>Наименование</dt><dd>{{ partInfo.name }}</dd></div>
        <template v-if="showAllParams">
          <div v-for="(value, key) in partInfo.extra" :key="key" class="part-param"><dt>{{ key }}</dt><dd>{{ value }}</dd></div>
        </template>
        <button class="part-params-toggle text-link" @click="showAllParams = !showAllParams">
          {{ showAllParams ? 'Скрыть параметры' : 'Все параметры' }}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
        </button>
      </dl>
      <div class="part-side">
        <a href="#footer" class="text-link">О производителе</a>
        <button class="primary-button part-find" @click="findInCatalog">
          Найти в каталоге
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        </button>
      </div>
    </section>

    <div class="parts-layout">
      <aside class="parts-filters">
        <div class="pf-group">
          <div class="pf-title">Цена, р.</div>
          <div class="pf-range">
            <input v-model="filters.minPrice" type="number" min="0" placeholder="1234556789" aria-label="Цена от" />
            <span>—</span>
            <input v-model="filters.maxPrice" type="number" min="0" placeholder="1234567899" aria-label="Цена до" />
          </div>
          <div class="pf-track" aria-hidden="true"></div>
        </div>

        <div class="pf-group">
          <div class="pf-title">Поставщик</div>
          <label class="pf-check"><input v-model="filters.suppliers" type="checkbox" value="dealer" /> Официальный дилер</label>
          <label class="pf-check"><input v-model="filters.suppliers" type="checkbox" value="trusted" /> Надежный поставщик</label>
        </div>

        <div class="pf-group">
          <div class="pf-title">Минимальный срок, дней</div>
          <div class="pf-range">
            <input v-model="filters.daysMax" type="number" min="0" placeholder="60" aria-label="Срок до, дней" />
          </div>
          <div class="pf-track" aria-hidden="true"></div>
        </div>

        <div class="pf-group">
          <div class="pf-title">В наличии от, шт.</div>
          <div class="pf-counter">
            <button type="button" aria-label="Уменьшить" @click="qtyFrom(-1)">−</button>
            <input v-model="filters.qtyFrom" type="number" min="0" max="99" aria-label="В наличии от" />
            <button type="button" aria-label="Увеличить" @click="qtyFrom(1)">+</button>
          </div>
        </div>

        <div class="pf-group">
          <div class="pf-title">Производители</div>
          <div class="pf-range pf-maker-search">
            <input v-model="filters.makerQuery" type="search" placeholder="Поиск" aria-label="Поиск производителя" />
          </div>
          <label v-for="maker in makerChoices" :key="maker" class="pf-check"><input v-model="filters.makers" type="checkbox" :value="maker" /> {{ maker }}</label>
          <p v-if="!makerChoices.length" class="pf-note">Не найдено</p>
        </div>

        <div class="pf-group">
          <div class="pf-title">Тип предложения</div>
          <label v-for="kind in PART_KINDS" :key="kind.key" class="pf-check"><input v-model="filters.kinds" type="checkbox" :value="kind.key" /> {{ kind.label }}</label>
        </div>

        <div class="pf-actions">
          <button class="primary-button" type="button" @click="ui.notify('Фильтры применены')">Применить</button>
          <button class="secondary-button" type="button" @click="reset">Сбросить</button>
        </div>
      </aside>

      <section class="parts-results">
        <div class="parts-meta">
          <span>Результаты по магазину: <b>ДЕТАЛЬ СНАБ (Центральный склад)</b>, Новосибирск, ул. Аникина, д.31, оф.107</span>
          <RouterLink class="text-link" to="/payment">Информация об оплате и доставке</RouterLink>
        </div>

        <div class="offer-cards">
          <article v-for="card in [
            { label: 'Минимальная цена', row: bestMinPrice, fallback: '60–90 дн.' },
            { label: 'В наличии', row: bestInStock, fallback: 'Склад' },
            { label: 'Быстрая доставка', row: bestFastest, fallback: '1–3 дн.' },
          ]" :key="card.label" class="offer-card">
            <span class="offer-label">{{ card.label }}</span>
            <span class="offer-ph"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h3l2-2h6l2 2h3v12H4z" /><circle cx="12" cy="13" r="3.4" /></svg></span>
            <div class="offer-body">
              <span class="offer-name">{{ card.row ? card.row.name : 'Предложений нет' }} <button v-if="card.row" class="pinfo-btn" aria-label="Подробнее о детали" @click="selected = card.row"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><path d="M12 8h.01" /></svg></button></span>
              <span class="offer-meta">{{ card.row ? `${card.row.term} · ${card.row.maker}` : card.fallback }}</span>
              <span class="offer-foot">
                <b class="offer-price">{{ card.row ? formatPriceRaw(card.row.price) : '—' }}</b>
                <button v-if="card.row" class="icon-cart-sq" aria-label="Добавить в корзину" @click="add(card.row)"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2l2.5 12.5a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L21 8H6" /><circle cx="9.5" cy="21" r="1" /><circle cx="17.5" cy="21" r="1" /></svg></button>
              </span>
            </div>
          </article>
        </div>

        <template v-for="group in groups" :key="group.key">
          <section v-if="filters.kinds.length === 0 || filters.kinds.includes(group.key)">
            <h2 class="pgroup-title">{{ group.title }}</h2>
            <div class="ptable-head"><span>Деталь</span><span>Срок</span><span>Доступно</span><span>Цена</span><span></span></div>
            <div v-if="!group.rows.length" class="pempty">Подходящих предложений нет — измените фильтры.</div>
            <div v-for="row in group.rows" :key="row.id" class="ptable-row">
              <div class="pdetail">
                <span class="pdetail-ph"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h3l2-2h6l2 2h3v12H4z" /><circle cx="12" cy="13" r="3.4" /></svg></span>
                <div>
                  <span class="pdetail-name">{{ row.brand }} {{ row.code }}</span>
                  <button class="pinfo-btn" aria-label="Подробнее о детали" @click="selected = row"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><path d="M12 8h.01" /></svg></button>
                  <div class="pdetail-code">{{ row.code }}</div>
                </div>
              </div>
              <span class="pterm"><b>{{ row.term }}</b><small>Срок</small></span>
              <span class="pterm"><b>{{ row.qty }} шт.</b><small>Доступно</small></span>
              <b class="pprice">{{ formatPriceRaw(row.price) }}</b>
              <button class="icon-cart-sq" aria-label="Добавить в корзину" @click="add(row)"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2l2.5 12.5a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L21 8H6" /><circle cx="9.5" cy="21" r="1" /><circle cx="17.5" cy="21" r="1" /></svg></button>
            </div>
          </section>
        </template>
      </section>
    </div>

    <Transition name="toast">
      <div v-if="selected" class="pmodal-overlay" @click.self="selected = null">
        <div class="pmodal" role="dialog" aria-label="Параметры детали">
          <button class="pmodal-close" aria-label="Закрыть" @click="selected = null"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" /></svg></button>
          <div class="pmodal-top">
            <div class="part-photo"><img :src="partInfo.photo" alt="Фото детали" /></div>
            <div>
              <h2>{{ selected.brand }} {{ selected.name }} <span class="pmodal-code">{{ selected.code }}</span></h2>
              <p class="pmodal-desc">Оригинальная деталь высокого качества. Перед заказом проверьте совместимость по артикулу.</p>
            </div>
          </div>
          <h3 class="pmodal-sub">Параметры</h3>
          <div class="pparam-row"><span>Артикул</span><b>{{ selected.code }}</b></div>
          <div class="pparam-row"><span>Производитель</span><b>{{ selected.maker }}</b></div>
          <div class="pparam-row"><span>Наименование</span><b>{{ selected.name }}</b></div>
          <div class="pparam-row"><span>Срок</span><b>{{ selected.term }}</b></div>
          <div class="pparam-row"><span>Доступно</span><b>{{ selected.qty }} шт.</b></div>
          <div class="pparam-row"><span>Цена</span><b>{{ formatPriceRaw(selected.price) }}</b></div>
        </div>
      </div>
    </Transition>
  </div>
</template>
