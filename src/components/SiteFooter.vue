<template>
  <footer id="footer" class="site-footer">
    <div class="footer-stripe" aria-hidden="true"></div>
    <div class="container footer-grid">
      <div class="footer-brand-block">
        <RouterLink to="/" class="footer-brand" aria-label="Деталь Снаб — на главную">
          <img src="../assets/logo-ds.png" alt="Деталь Снаб" width="120" height="84" />
        </RouterLink>
        <p>Надёжный поставщик запасных частей и комплектующих для специальной и грузовой техники. Запчасти для движения вперёд.</p>
      </div>
      <div class="footer-col">
        <h4>Покупателям</h4>
        <RouterLink to="/catalog">Каталог</RouterLink>
        <RouterLink to="/how-to-order">Как сделать заказ</RouterLink>
        <RouterLink to="/delivery">Доставка</RouterLink>
        <RouterLink to="/payment">Оплата</RouterLink>
      </div>
      <div class="footer-col">
        <h4>Компания</h4>
        <RouterLink to="/about">О компании</RouterLink>
        <RouterLink to="/contacts">Контакты</RouterLink>
        <RouterLink to="/account">Личный кабинет</RouterLink>
        <RouterLink to="/account/invoices">Счета</RouterLink>
      </div>
      <div class="footer-col footer-contacts">
        <h4>Связаться с нами</h4>
        <a href="tel:+79137032658" class="footer-phone">+7 913 703-26-58</a>
        <span>Новосибирск, ул. Аникина, д. 31, оф. 107</span>
        <span>Пн–Пт, 09:00–18:00</span>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">© 2026 «Деталь Снаб». Демонстрационная версия сайта.</div>
    </div>
  </footer>
</template>
