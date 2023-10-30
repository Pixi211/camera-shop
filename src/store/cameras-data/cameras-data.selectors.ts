
import { State } from '../../types/types';
import { NameSpace } from '../../const';
import { CameraType } from '../../types/types';


export const getCameras = (state: State): CameraType[] => state[NameSpace.Cameras].cameras;
