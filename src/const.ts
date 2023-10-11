enum AppRoute {
  CatalogPage = '/',
  ItemPage = '/product',
  BasketPage = '/basket',
  NotFoundPage = '*',
}

enum APIRoute {
  Camera = '/cameras',
  Similar = '/similar',
  Promo = '/promo',
  Review = '/reviews',
  Coupon = '/coupons',
  Order = '/orders',
}

enum NameSpace {
  Cameras = 'CAMERAS',
  Promo = 'PROMO',
}

const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy/';
const MAX_PRODUCTS_ON_PAGE = 9;

export {
  AppRoute, APIRoute, NameSpace,
  BACKEND_URL, MAX_PRODUCTS_ON_PAGE
};
