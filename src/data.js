import brandKomatsu from './assets/brand-komatsu.png'
import brandCaterpillar from './assets/brand-caterpillar.png'
import brandCummins from './assets/brand-cummins.png'
import brandJcb from './assets/brand-jcb.png'
import brandItr from './assets/brand-itr.png'
import brandGaricambi from './assets/brand-ga-ricambi.png'
import brandOfm from './assets/brand-ofm.png'
import brandCgr from './assets/brand-cgr.png'
import brakeImage from './assets/hero-brakes.png'
import tireImage from './assets/hero-tire.png'
import partsImage from './assets/hero-top.jpg'
import lukoilImage from './assets/product-lukoil.png'

export const categories = [
  'Общий каталог',
  'Моторные масла',
  'Шины и диски',
  'Оригинальные запчасти',
  'Автомобильные жидкости',
  'Запчасти для ТО',
  'Автохимия',
  'Аксессуары',
  'Аккумуляторы',
]

export const featuredCategory = 'Аккумуляторы'

export const brands = [
  { name: 'KOMATSU', image: brandKomatsu },
  { name: 'CATERPILLAR', image: brandCaterpillar },
  { name: 'Cummins', image: brandCummins },
  { name: 'JCB', image: brandJcb },
  { name: 'ITR', image: brandItr },
  { name: 'G.A. Ricambi', image: brandGaricambi },
  { name: 'OFM Top Line', image: brandOfm },
  { name: 'CGR Ghinassi', image: brandCgr },
]

export const news = [
  {
    id: 1,
    date: '04.01.26',
    title: 'Новое поступление',
    text: 'Вновь поступили на наш склад: фильтры, свечи накала, форсунки DEUTZ, BOSCH и другие детали для специальной техники.',
  },
  {
    id: 2,
    date: '18.12.25',
    title: 'Расширение ассортимента',
    text: 'Добавлены позиции по ходовой части и тормозным системам для погрузчиков JCB и Амкодор.',
  },
]

// Демонстрационный каталог: цены и наличие вымышлены, фото частично из макета.
export const products = [
  { id: 1, article: '153789', name: 'Масло моторное Lukoil Genesis Armortech 0W-20, 4 л', manufacturer: 'Lukoil', category: 'Моторные масла', price: 2334, oldPrice: 2864, stock: 24, delivery: '1–3 дня', image: lukoilImage, badge: 'Хит продаж' },
  { id: 2, article: 'A000154', name: 'Тормозные колодки усиленные', manufacturer: 'JCB', category: 'Оригинальные запчасти', price: 4180, oldPrice: 4690, stock: 8, delivery: '3–5 дней', image: brakeImage, badge: '−10%' },
  { id: 3, article: '205/55R16', name: 'Шина универсальная 205/55 R16', manufacturer: 'Michelin', category: 'Шины и диски', price: 6890, stock: 16, delivery: '1–3 дня', image: tireImage },
  { id: 4, article: 'LF17356', name: 'Комплект фильтров двигателя', manufacturer: 'Caterpillar', category: 'Запчасти для ТО', price: 1240, oldPrice: 1490, stock: 42, delivery: 'В наличии', image: partsImage },
  { id: 5, article: 'CAT-01-244', name: 'Комплект фильтров спецтехники', manufacturer: 'Caterpillar', category: 'Запчасти для ТО', price: 5720, stock: 7, delivery: '3–5 дней', image: partsImage },
  { id: 6, article: '15W40-20L', name: 'Масло моторное универсальное 20 л', manufacturer: 'Mobil', category: 'Моторные масла', price: 8490, stock: 19, delivery: '1–3 дня', image: lukoilImage },
  { id: 7, article: 'JCB-AX14', name: 'Комплект тормозной системы', manufacturer: 'JCB', category: 'Оригинальные запчасти', price: 9380, stock: 5, delivery: 'Под заказ', image: brakeImage },
  { id: 8, article: 'BAT-120', name: 'Аккумулятор 120 А·ч', manufacturer: 'Тюмень', category: 'Аккумуляторы', price: 11990, oldPrice: 12990, stock: 12, delivery: 'В наличии', image: partsImage },
]

export const formatPrice = (value) => new Intl.NumberFormat('ru-RU').format(value) + ' ₽'
