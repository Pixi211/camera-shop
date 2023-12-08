enum AppRoute {
  CatalogPage = '/',
  ItemPage = '/:id',
  BasketPage = '/basket',
  NotFoundPage = '*',
}

enum APIRoute {
  Camera = '/cameras',
  Similar = 'similar',
  Promo = '/promo',
  Review = 'reviews',
  Coupon = '/coupons',
  Order = '/orders',
}

enum NameSpace {
  Cameras = 'CAMERAS',
  Promo = 'PROMO',
  Modal = 'MODAL',
  Current = 'CURRENT',
  Basket = 'BASKET',
}

enum RatingName {
  Awful = 'Ужасно',
  Bad = 'Плохо',
  Average = 'Нормально',
  Good = 'Хорошо',
  Perfect = 'Отлично',
}

enum CameraCharacteristic {
  Photocamera = 'Фотоаппарат',
  Videocamera = 'Видеокамера',
  Collection = 'Коллекционная',
  Digital = 'Цифровая',
  Film = 'Плёночная',
  Snapshot = 'Моментальная',
  Zero = 'Нулевой',
  NonProfessional = 'Любительский',
  Professional = 'Профессиональный',
}

enum KeyCode {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  Esc = 'Escape',
  Enter = 'Enter',
}

enum QueryString {
  Page = 'page',
  Category = 'category',
  TypeCamera = 'type',
  Level = 'level',
  Sort = 'sort',
  Direction = 'direction',
  Start = '_start',
  End = '_end',
}

enum DirectionValue {
  Up = 'Up',
  Down = 'Down'
}

enum SortValue {
  Price = 'Price',
  Popular = 'Popular',
}

enum CategoryValue {
  Photocamera = 'photocamera',
  Videocamera = 'videocamera',
}

enum TypeCameraValue {
  Digital = 'digital',
  Film = 'film',
  Snapshot = 'snapshot',
  Collection = 'collection',
}

enum LevelValue {
  Zero = 'zero',
  NonProfessional = 'non-professional',
  Professional = 'professional',
}

enum DirectionPagination {
  Next = 1,
  Prev = -1,
}

enum PromoCode {
  None = 'None',
  Camera333 = 'camera-333',
  Camera444 = 'camera-444',
  Camera555 = 'camera-555',
}

enum Discount {
  None = 0,
  Camera333 = 333,
  Camera444 = 444,
  Camera555 = 555,
}

const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy/';
const MAX_PRODUCTS_ON_PAGE = 9;
const FOCUS_TIMEOUT = 500;
const RESET_TIMEOUT = 300;
const DEBOUNCED_VALUE = 1000;
const SEARCH_SYMBOLS_MINIMUM = 3;
const stars = [1, 2, 3, 4, 5];

export {
  AppRoute, APIRoute, NameSpace, RatingName, QueryString, DirectionValue, SortValue, DirectionPagination,
  CategoryValue, TypeCameraValue, LevelValue, KeyCode, CameraCharacteristic, PromoCode, Discount,
  BACKEND_URL, MAX_PRODUCTS_ON_PAGE, FOCUS_TIMEOUT, RESET_TIMEOUT, DEBOUNCED_VALUE,
  SEARCH_SYMBOLS_MINIMUM, stars,
};
