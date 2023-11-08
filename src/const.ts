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
  Current = 'CURRENT'
}

enum RatingName {
  Awful = 'Ужасно',
  Bad = 'Плохо',
  Average = 'Нормально',
  Good = 'Хорошо',
  Perfect = 'Отлично',
}

enum QueryString {
  Page = 'page',
  Type = 'type',
  Category = 'category',
  Level = 'level',
  Sort = 'sort',
  Direction = 'direction',
}

enum DirectionValue {
  Up = 'Up',
  Down = 'Down'
}

enum SortValue {
  Price = 'Price',
  Popular = 'Popular',
}

enum DirectionPagination {
  Next = 1,
  Prev = -1,
}
const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy/';
const MAX_PRODUCTS_ON_PAGE = 9;
const FOCUS_TIMEOUT = 500;
const RESET_TIMEOUT = 300;
const stars = [1, 2, 3, 4, 5];

export {
  AppRoute, APIRoute, NameSpace, RatingName, QueryString, DirectionValue, SortValue, DirectionPagination,
  BACKEND_URL, MAX_PRODUCTS_ON_PAGE, FOCUS_TIMEOUT, RESET_TIMEOUT, stars
};
