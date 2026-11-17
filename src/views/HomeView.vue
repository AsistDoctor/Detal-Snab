<script setup>
import { ref } from 'vue'
import { products, categories, featuredCategory, brands, news } from '../data'
import ProductCard from '../components/ProductCard.vue'

// Карусели: на десктопе грид без переполнения (стрелки ничего не ломают),
// на узких экранах трек становится слайдером со скролл-снапом
const heroTrack = ref(null)
const heroIndex = ref(0)
const popularTrack = ref(null)
const popularIndex = ref(0)
const heroCount = 4

function slideStep(track) {
  if (!track || !track.firstElementChild) return 1
  const gap = parseFloat(getComputedStyle(track).columnGap) || 0
  return track.firstElementChild.offsetWidth + gap
}
function maxIndex(track) {
  if (!track) return 0
  return Math.max(0, Math.ceil(track.scrollWidth / slideStep(track)) - Math.round(track.clientWidth / slideStep(track)))
}
function goTo(track, index) {
  if (!track) return
  const target = Math.max(0, Math.min(maxIndex(track), index))
  track.scrollTo({ left: target * slideStep(track), behavior: 'smooth' })
}
function onHeroScroll() {
  const track = heroTrack.value
  if (track) heroIndex.value = Math.round(track.scrollLeft / slideStep(track))
}
function onPopularScroll() {
  const track = popularTrack.value
  if (track) popularIndex.value = Math.round(track.scrollLeft / slideStep(track))
}
const heroPrev = () => goTo(heroTrack.value, heroIndex.value - 1)
const heroNext = () => goTo(heroTrack.value, heroIndex.value + 1)
const popularPrev = () => goTo(popularTrack.value, popularIndex.value - 1)
const popularNext = () => goTo(popularTrack.value, popularIndex.value + 1)
</script>

<template>
  <div class="home-page">
    <div class="container">
      <p class="mobile-intro">Запчасти и комплектующие для&nbsp;специальной и&nbsp;грузовой техники</p>

      <section class="hero" aria-label="Главные предложения">
        <button class="hero-arrow hero-arrow-prev" @click="heroPrev" aria-label="Предыдущий слайд">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <div class="hero-track" ref="heroTrack" @scroll.passive="onHeroScroll">
          <RouterLink to="/catalog?q=тормозные колодки" class="hero-tile hero-brakes">
            <div class="hero-copy">
              <span class="sale-pill">−30%</span>
              <h1>Тормозные<br />колодки</h1>
              <strong>от 2 334 ₽</strong>
            </div>
            <img src="../assets/hero-brakes.png" alt="Тормозной диск и колодки" />
          </RouterLink>
          <RouterLink to="/catalog" class="hero-tile hero-top">
            <div class="hero-top-copy"><span>ТОП</span><strong>Продаж 2026</strong></div>
            <img src="../assets/hero-top.jpg" alt="Запчасти и комплектующие" />
          </RouterLink>
          <RouterLink to="/catalog?category=Моторные масла" class="hero-tile hero-oil">
            <div class="hero-copy"><b>Моторное<br />масло</b><span>от 2 334 ₽</span></div>
            <img src="../assets/hero-oil.png" alt="Канистры моторного масла" />
          </RouterLink>
          <RouterLink to="/catalog?category=Шины и диски" class="hero-tile hero-tires">
            <div class="hero-copy"><b>Шины<br />и диски</b><span>от 2 334 ₽</span></div>
            <img src="../assets/hero-tire.png" alt="Автомобильная шина" />
          </RouterLink>
        </div>
        <button class="hero-arrow hero-arrow-next" @click="heroNext" aria-label="Следующий слайд">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        </button>
        <div class="hero-dots">
          <button v-for="i in heroCount" :key="i" :class="{ active: heroIndex === i - 1 }" @click="goTo(heroTrack, i - 1)" :aria-label="`Слайд ${i}`"></button>
        </div>
      </section>
    </div>

    <section class="band band-gray">
      <div class="container">
        <div class="section-heading"><h2>Бренды</h2><RouterLink class="outline-button" to="/catalog">Все бренды</RouterLink></div>
        <div class="brand-grid">
          <div v-for="brand in brands" :key="brand.name" class="brand-card">
            <img :src="brand.image" :alt="brand.name" :title="brand.name" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <div class="container">
      <section class="section-block">
        <div class="section-heading"><h2>Подбор по категориям</h2><RouterLink class="outline-button" to="/catalog">Все категории</RouterLink></div>
        <div class="category-grid">
          <RouterLink v-for="category in categories" :key="category" :to="{ path: '/catalog', query: { category } }" class="category-tile" :class="{ featured: category === featuredCategory }">{{ category }}</RouterLink>
        </div>
      </section>

      <section class="section-block" aria-label="Популярные товары">
        <div class="section-heading">
          <h2>Популярные товары</h2>
          <div class="slider-arrows">
            <button class="slider-arrow slider-arrow-prev" aria-label="Назад" @click="popularPrev">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button class="slider-arrow slider-arrow-next" aria-label="Вперёд" @click="popularNext">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </div>
        <div class="products-track" ref="popularTrack" @scroll.passive="onPopularScroll">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
      </section>

      <section class="home-bottom section-block" id="news">
        <div class="about-preview">
          <h2>О нашем магазине</h2>
          <p class="about-lead">Компания «Деталь Снаб» — это надежный поставщик запасных частей и комплектующих для специальной и грузовой техники.</p>
          <p>Мы предлагаем широкий ассортимент деталей для различных марок: JCB, SDLG, Амкодор, УАЗ, ГАЗ, МАЗ, КАМАЗ, ЗИЛ и других.</p>
          <p>Наша специализация — обеспечение бесперебойной работы вашей техники. Мы предлагаем не только продажу запчастей, но и комплексное обслуживание, включая диагностику и технический ремонт, в том числе гидромеханических коробок передач (ГМКП).</p>
          <RouterLink to="/about" class="text-link">Подробнее о компании</RouterLink>
        </div>
        <div class="news-preview">
          <div class="section-heading"><h2>Новости</h2><a href="#news" class="outline-button">Все новости</a></div>
          <div class="news-grid">
            <article v-for="item in news" :key="item.id" class="news-card">
              <div class="news-image" aria-hidden="true"></div>
              <span class="news-date">{{ item.date }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
              <a href="#news" class="text-link">Подробнее</a>
            </article>
          </div>
        </div>
      </section>

      <section class="mobile-contacts" aria-label="Контакты">
        <div class="section-heading"><h2>Контакты</h2></div>
        <p class="mobile-contacts-line">Новосибирск, ул. Аникина, д. 31, оф. 107</p>
        <a class="mobile-contacts-line mobile-contacts-phone" href="tel:+79137032658">+7 913 703-26-58</a>
      </section>
    </div>
  </div>
</template>
