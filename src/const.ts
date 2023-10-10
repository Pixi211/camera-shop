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

export {
  AppRoute, APIRoute, NameSpace,
  BACKEND_URL
};
