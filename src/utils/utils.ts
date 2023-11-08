import { CameraType, SortType, SortDirection } from '../types/types';


const sortCameras = (cameras: CameraType[], sortType: SortType, sortDirection: SortDirection) => {
  if (sortType === sortDirection) {
    return cameras;
  } else if (sortType === 'Price' && sortDirection !== 'Up') {
    return cameras.sort((firstCamera, secondCamera) => secondCamera.price - firstCamera.price);
  } else if (sortType === 'sortPrice' && sortDirection !== 'Down') {
    return cameras.sort((firstCamera, secondCamera) => firstCamera.price - secondCamera.price);
  } else if (sortType === 'Popular' && sortDirection !== 'Up') {
    return cameras.sort((firstCamera, secondCamera) => secondCamera.rating - firstCamera.rating);
  } else {
    return cameras.sort((firstCamera, secondCamera) => firstCamera.rating - secondCamera.rating);
  }
};

export default sortCameras;
