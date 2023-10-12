
// GET / cameras / { cameraId }

export type CameraType = {
  id: number;
  name: string;
  vendorCode: string;
  type: 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная';
  category: 'Видеокамера' | 'Фотоаппарат';
  description: string;
  level: 'Нулевой' | 'Любительский' | 'Профессиональный';
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

// GET / cameras

export type CamerasListType = CameraType[]

// GET / cameras / { cameraId } / similar

export type SimilarCamerasListType = CameraType[]

// GET /promo

export type PromoCameraType = {
  id: number;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}


//state.ts
import { store } from '../store';

export type PromoData = {
  promos: PromoCameraType[];
  hasError: boolean;
}

export type CamerasData = {
  cameras: CamerasListType;
  hasError: boolean;
  isDataLoading: boolean;
}

export type CurrentData = {
  currentItemData: CameraType | null;
}

export type ModalData = {
  addItemToBasketStatus: boolean;
  successStatus: boolean;
  isActive: boolean;
  modalData: CameraType | null;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
