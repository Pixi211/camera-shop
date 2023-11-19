import { memo, useEffect, useRef } from 'react';
import { KeyCode } from '../../const';
import { CameraType } from '../../types/types';


type SearchItemProps = {
  camera: CameraType;
  isCurrent: boolean;
  onItemClick: (cameraId: number) => void;
};

function SearchItem({ camera, isCurrent, onItemClick }: SearchItemProps): JSX.Element {
  const cameraItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isCurrent) {
      cameraItemRef.current?.focus();
    }
  }, [isCurrent]);

  const handleKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === KeyCode.Enter) {
      evt.preventDefault();
      onItemClick(camera.id);
    }
  };

  return (
    <li
      data-testid="search-item-test"
      className="form-search__select-item"
      tabIndex={isCurrent ? -1 : 0}
      key={camera.id}
      ref={cameraItemRef}
      onClick={() => onItemClick(camera.id)}
      onKeyDown={handleKeyDown}
    >
      {camera.name}
    </li>
  );
}

const MemoSearchItem = memo(SearchItem);
export default MemoSearchItem;
