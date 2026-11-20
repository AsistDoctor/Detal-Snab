<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products, categories, formatPrice } from '../data'
import ProductCard from '../components/ProductCard.vue'

const route = useRoute()
const router = useRouter()
const query = ref(String(route.query.q || ''))
const category = ref(String(route.query.category || ''))
const manufacturer = ref('')
const sort = ref('popular')
const minPrice = ref('')
const maxPrice = ref('')
const makers = [...new Set(products.map((p) => p.manufacturer))]
const filtered = computed(() => {
  let result = products.filter((p) => {
    const term = query.value.trim().toLowerCase()
    const matchQuery = !term || `${p.name} ${p.article} ${p.manufacturer} ${p.category}`.toLowerCase().includes(term)
    const matchCategory = !category.value || category.value === 'Общий каталог' || p.category === category.value
    const matchMaker = !manufacturer.value || p.manufacturer === manufacturer.value
    const matchMin = !minPrice.value || p.price >= Number(minPrice.value)
    const matchMax = !maxPrice.value || p.price <= Number(maxPrice.value)
    return matchQuery && matchCategory && matchMaker && matchMin && matchMax
  })
  if (sort.value === 'price-asc') result = [...result].sort((a,b) => a.price-b.price)
  if (sort.value === 'price-desc') result = [...result].sort((a,b) => b.price-a.price)
  if (sort.value === 'name') result = [...result].sort((a,b) => a.name.localeCompare(b.name, 'ru'))
  return result
})
function applySearch() {
  const nextQuery = {}
  if (query.value.trim()) nextQuery.q = query.value.trim()
  if (category.value) nextQuery.category = category.value
  router.replace({ path: '/catalog', query: nextQuery })
}
function reset() { query.value = ''; category.value = ''; manufacturer.value = ''; minPrice.value = ''; maxPrice.value = ''; sort.value = 'popular'; router.replace('/catalog') }
</script>

<template>
  <div class="container content-page">
    <div class="breadcrumbs"><RouterLink to="/">Главная</RouterLink><span>/</span> Каталог</div>
    <div class="page-title-row"><div><h1>{{ query ? 'Результаты поиска' : category || 'Каталог товаров' }}</h1><p class="muted">Найдите необходимые запчасти и комплектующие для вашей техники</p></div><span class="result-count">Найдено: {{ filtered.length }}</span></div>
    <div class="catalog-layout">
      <aside class="filters-panel">
        <div class="filter-head"><b>Фильтры</b><button class="reset-link" @click="reset">Сбросить</button></div>
        <form @submit.prevent="applySearch" class="filter-group"><label for="catalog-search">Поиск</label><div class="filter-search"><input id="catalog-search" v-model="query" placeholder="Название или артикул" /><button type="submit">⌕</button></div></form>
        <div class="filter-group"><label>Цена, ₽</label><div class="range-inputs"><input v-model="minPrice" type="number" min="0" placeholder="От"/><span>—</span><input v-model="maxPrice" type="number" min="0" placeholder="До"/></div></div>
        <div class="filter-group"><label>Категории</label><label v-for="item in categories" :key="item" class="check-line"><input v-model="category" type="radio" :value="item"/> {{ item }}</label></div>
        <div class="filter-group"><label>Производители</label><label v-for="maker in makers" :key="maker" class="check-line"><input v-model="manufacturer" type="radio" :value="maker"/> {{ maker }}</label></div>
        <button class="primary-button full-button" @click="applySearch">Применить</button>
        <button class="secondary-button full-button" @click="reset">Сбросить</button>
      </aside>
      <section class="catalog-results">
        <div class="catalog-toolbar"><span>Товары для вашей техники</span><label>Сортировка <select v-model="sort"><option value="popular">По популярности</option><option value="price-asc">Сначала дешевле</option><option value="price-desc">Сначала дороже</option><option value="name">По названию</option></select></label></div>
        <div v-if="filtered.length" class="product-grid catalog-grid"><ProductCard v-for="product in filtered" :key="product.id" :product="product" /></div>
        <div v-else class="empty-state"><span class="empty-icon"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg></span><h2>Ничего не найдено</h2><p>Попробуйте изменить поисковый запрос или сбросить фильтры.</p><button class="primary-button" @click="reset">Показать все товары</button></div>
      </section>
    </div>
  </div>
</template>
