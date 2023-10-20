
import { CamerasListType, Review, State } from '../../types/types';
import { NameSpace } from '../../const';
import { CameraType } from '../../types/types';


export const getCurentItemData = (state: State): CameraType | null => state[NameSpace.Current].currentItemData;
export const getSimilarCameras = (state: State): CamerasListType => state[NameSpace.Current].similarCameras;
export const getReviews = (state: State): Review[] => state[NameSpace.Current].reviews;
