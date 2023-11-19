import { store } from '../store';

export type Type = 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная';
export type Category = 'Видеокамера' | 'Фотоаппарат';
export type Level = 'Нулевой' | 'Любительский' | 'Профессиональный';
export type SortType = string | null;
export type SortDirection = string | null;

export type CameraType = {
  id: number;
  name: string;
  vendorCode: string;
  type: Type;
  category: Category;
  description: string;
  level: Level;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

export type PromoCameraType = {
  id: number;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

export type Review = {
  id: string;
  createAt: string;
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

export type UserReview = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}


export type PromoData = {
  promos: PromoCameraType[];
  hasError: boolean;
}

export type CamerasData = {
  cameras: CameraType[];
  minPrice: number | null;
  maxPrice: number | null;
  hasError: boolean;
  isDataLoading: boolean;
  sortType: SortType;
  sortDirection: SortDirection;
}

export type CurrentData = {
  currentItemData: CameraType | null;
  similarCameras: CameraType[];
  reviews: Review[];
  isCurrentDataLoading: boolean;
  isSimilarsLoading: boolean;
  isReviewsLoading: boolean;
  hasError: boolean;
}

export type ModalData = {
  addItemToBasketStatus: boolean;
  successStatus: boolean;
  isActive: boolean;
  modalData: CameraType | null;
  addReviewStatus: boolean;
  successType: SuccessType;
}

export type SuccessType = 'newReview' | 'addToBasket' | 'purchase';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
