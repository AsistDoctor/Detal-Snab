<script setup>
import { computed } from 'vue'
import { news } from '../data'
import { nkDelivery, nkPayment, nkHowToOrder, nkHowToFind } from '../contentBlocks'

const props = defineProps({ page: { type: String, required: true } })

const NK_PAGES = { delivery: nkDelivery, payment: nkPayment, 'how-to-order': nkHowToOrder, 'how-to-find': nkHowToFind }

const content = {
  about: { title: 'О компании', intro: '«Деталь Снаб» — поставщик запасных частей и комплектующих для специальной и грузовой техники.', paragraphs: ['Мы предлагаем широкий ассортимент деталей для различных марок: JCB, SDLG, Амкодор, УАЗ, ГАЗ, МАЗ, КАМАЗ, ЗИЛ и других.', 'Наша задача — помогать клиентам поддерживать технику в рабочем состоянии. В каталоге представлены запасные части, расходные материалы, масла и комплектующие.', 'В демонстрационной версии сайта представлены примеры каталога и пользовательских сценариев.'] },
  contacts: { title: 'Контакты' },
}
const pageContent = computed(() => NK_PAGES[props.page] || content[props.page] || content.about)
const isNk = computed(() => Boolean(NK_PAGES[props.page]))
</script>

<template>
  <div class="container content-page" :class="isNk ? 'nk-page' : 'info-page'">
    <div class="breadcrumbs"><RouterLink to="/">Главная</RouterLink><span>/</span> {{ pageContent.title }}</div>

    <div v-if="page === 'news'" class="news-page">
      <h1>Новости</h1>
      <div class="news-grid news-grid-wide">
        <article v-for="item in news" :key="item.id" class="news-card">
          <div class="news-image" aria-hidden="true"></div>
          <span class="news-date">{{ item.date }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
          <a href="#news" class="text-link">Подробнее</a>
        </article>
      </div>
    </div>

    <div v-else-if="page === 'contacts'" class="contacts-page">
      <h1>Контакты</h1>
      <div class="map-stub" role="img" aria-label="Карта: Новосибирск, ул. Аникина, д. 31">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
        <b>г. Новосибирск, ул. Аникина, д. 31</b>
        <small>Интерактивная карта подключается при интеграции с картографическим сервисом</small>
      </div>
      <div class="contact-cols">
        <div><h3>Адрес</h3><p>г. Новосибирск, ул. Аникина,<br />д. 31, оф. 107</p></div>
        <div><h3>Телефон</h3><p><a href="tel:+79137032658">+7 (913) 703-26-58</a><br /><a href="tel:+70000000000">+7 (000) 00-00-00</a></p></div>
        <div><h3>Режим работы</h3><p>пн–пт: 09:00–19:00<br />сб–вс: выходной</p></div>
      </div>
      <div class="contact-actions" style="margin-top: 26px"><a href="mailto:info@detal-snab.example" class="outline-button">Написать нам</a><a href="tel:+79137032658" class="primary-button">Позвонить</a></div>
    </div>

    <template v-else-if="isNk">
      <div class="nk-hero">
        <img class="nk-logo" src="../assets/logo-ds.png" alt="Деталь Снаб" />
      </div>
      <div class="breadcrumbs"><RouterLink to="/">Главная</RouterLink><span>/</span><span>Новым клиентам</span><span>/</span> {{ pageContent.title }}</div>
      <h1>{{ pageContent.title }}</h1>
      <p class="info-intro">{{ pageContent.intro }}</p>
      <div v-if="pageContent.paragraphs" class="info-copy">
        <p v-for="paragraph in pageContent.paragraphs" :key="paragraph" :class="{ 'info-steps': /^\d\./.test(paragraph) }">{{ paragraph }}</p>
      </div>
      <div v-if="pageContent.blocks" class="nk-blocks">
        <section v-for="b in pageContent.blocks" :key="b.h" class="nk-block">
          <img v-if="b.tile" class="nk-tile" :src="b.tile" alt="" />
          <div class="nk-block-body">
            <h3>{{ b.h }}</h3>
            <p v-for="t in b.text || []" :key="t">{{ t }}</p>
            <ul v-if="b.bullets"><li v-for="li in b.bullets" :key="li">{{ li }}</li></ul>
          </div>
        </section>
      </div>
      <RouterLink class="primary-button nk-cta" to="/catalog">Перейти в каталог</RouterLink>
    </template>

    <div v-else class="info-card">
      <span class="eyebrow">ДЕТАЛЬ СНАБ</span>
      <h1>{{ pageContent.title }}</h1>
      <p class="info-intro">{{ pageContent.intro }}</p>
      <div class="info-copy"><p v-for="paragraph in pageContent.paragraphs" :key="paragraph">{{ paragraph }}</p></div>
      <RouterLink class="primary-button" to="/catalog">Перейти в каталог</RouterLink>
    </div>
  </div>
</template>
