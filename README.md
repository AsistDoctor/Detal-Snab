# Деталь Снаб — демо-магазин на Vue 3

Frontend-прототип интернет-магазина по предоставленным макетам. Данные каталога и сценарии авторизации/заказа демонстрационные: backend и реальная оплата не подключены.

## Стек

- Vue 3 + Vite
- Vue Router
- Pinia
- CSS (адаптивная вёрстка без UI-фреймворка)

## Запуск

Требуется Node.js 20.19+ или 22.12+.

```bash
npm install
npm run dev
```

Для production-сборки:

```bash
npm run build
npm run preview
```

## Демо-сценарии

- Поиск по названию, артикулу и производителю.
- Каталог с фильтрами и сортировкой.
- Добавление товаров в корзину, изменение количества и удаление позиций.
- Оформление тестового заказа без платежей.
- Имитация входа и регистрации (любые непустые данные).
- Личный кабинет, история заказов и счетов.
- Корзина и демо-сессия сохраняются в `localStorage`.

Для входа можно использовать любой email и пароль от 4 символов. Это не настоящая авторизация.

## Публикация в GitHub

После создания пустого репозитория на GitHub выполните в папке проекта:

```bash
git init -b main
git add .
git commit -m "Initial Vue storefront demo"
git remote add origin https://github.com/YOUR-USERNAME/REPOSITORY.git
git push -u origin main
```

## Публикация в GitHub

После создания пустого репозитория на GitHub выполните в папке проекта:

```bash
git init -b main
git add .
git commit -m "Initial Vue storefront demo"
git remote add origin https://github.com/YOUR-USERNAME/REPOSITORY.git
git push -u origin main
```
