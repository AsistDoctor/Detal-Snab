// Демонстрационный набор для страницы «Поиск деталей».
// Все коды, бренды и цены — вымышленные, в стиле заглушек из макета.
import brakeImage from './assets/hero-brakes.png'

export const partInfo = {
  code: '00 00 00 000',
  name: 'Тормозной барабан задний',
  manufacturer: 'RENAULT',
  photo: brakeImage,
  extra: { 'Вес, кг': '5.4', 'Гарантия': '12 мес.', 'ОЕ-номер': '7701205339' },
}

const mk = (id, kind, brand, code, name, term, days, qty, price, suppliers, maker) =>
  ({ id, kind, brand, code, name, term, days, qty, price, suppliers, maker })

export const offers = [
  // Есть в магазине
  mk('o1', 'store', 'PHILIPS', '12345556NAB5', 'Лампа головного света H4 12V 60/55W', 'Наличие Склад', 0, 14, 1200, ['trusted'], 'PHILIPS'),
  mk('o2', 'store', 'BOSCH', '0986AB1234', 'Диск тормозной передний вентилируемый', 'Наличие Склад', 0, 8, 5400, ['dealer', 'trusted'], 'BOSCH'),
  mk('o3', 'store', 'BIG FILTER', 'GB-9977', 'Фильтр воздушный VW/SKODA/SEAT 1.4i 16V', 'Наличие Склад', 0, 21, 448, ['trusted'], 'BIG FILTER'),
  mk('o4', 'store', 'Lukoil', 'LCL-ARM-4L', 'Масло моторное Genesis Armortech 0W-20, 4 л', 'Наличие Склад', 0, 16, 2334, ['dealer'], 'Lukoil'),
  // Запрашиваемый код
  mk('r1', 'code', 'RENAULT', '7701205339', 'Барабан тормозной задний оригинал', '3–5 дн.', 4, 6, 8900, ['dealer'], 'RENAULT'),
  mk('r2', 'code', 'TRW', 'DB4320', 'Барабан тормозной задний', '4–6 дн.', 5, 4, 7350, ['trusted'], 'TRW'),
  mk('r3', 'code', 'BOSCH', '0986480123', 'Цилиндр рабочий тормозной', '5–7 дн.', 6, 3, 3120, [], 'BOSCH'),
  mk('r4', 'code', 'SCT', 'SB-114', 'Комплект колодок барабанных', '6–8 дн.', 7, 10, 1890, ['trusted'], 'SCT'),
  mk('r5', 'code', 'GIRLING', 'GS8642', 'Барабан тормозной усиленный', '7–9 дн.', 8, 2, 9450, [], 'GIRLING'),
  // Оригинальные аналоги
  mk('a1', 'analog', 'RENAULT', '7701205340', 'Барабан тормозной (ОАО «Автозавод»)', '2–3 дн.', 2, 5, 8100, ['dealer'], 'RENAULT'),
  mk('a2', 'analog', 'TRW', 'DB4321', 'Барабан тормозной задний (ориг. качество)', '1–2 дн.', 1, 9, 6900, ['dealer', 'trusted'], 'TRW'),
  mk('a3', 'analog', 'FERODO', 'FDB1123', 'Колодки тормозные барабанные (ориг. аналог)', '1–2 дн.', 1, 12, 2450, ['trusted'], 'FERODO'),
  mk('a4', 'analog', 'ATE', '030712', 'Цилиндр тормозной рабочий (ориг. аналог)', '3–4 дн.', 3, 4, 2870, [], 'ATE'),
  // Неоригинальные аналоги
  mk('n1', 'nonanalog', 'BIG FILTER', 'GB-9978', 'Фильтр топливный (замена оригинала)', '1–2 дн.', 1, 30, 390, ['trusted'], 'BIG FILTER'),
  mk('n2', 'nonanalog', 'SCT', 'SM-142', 'Фильтр салона угольный (замена оригинала)', '1–3 дн.', 2, 25, 520, [], 'SCT'),
]

export const partMakers = [...new Set(offers.map((o) => o.maker))].sort()
export const PART_KINDS = [
  { key: 'store', label: 'Есть в магазине', title: 'Есть в магазине' },
  { key: 'code', label: 'Запрашиваемый код', title: 'Запрашиваемый код' },
  { key: 'analog', label: 'Оригинальные аналоги', title: 'Оригинальные аналоги' },
  { key: 'nonanalog', label: 'Неоригинальные аналоги', title: 'Неоригинальные аналоги' },
]

export const formatPriceRaw = (value) => new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2 }).format(value) + ' ₽'
