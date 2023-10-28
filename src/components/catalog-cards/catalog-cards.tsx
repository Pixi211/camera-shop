import React from 'react';
import { CameraType } from '../../types/types';
import MemoizedProductCard from '../product-card/product-card';

type CatalogCardsProps = {
  cameras: CameraType[];
};

function CatalogCards({ cameras }: CatalogCardsProps): JSX.Element {


  return (
    <div className="cards catalog__cards" data-testid="catalogCards-test">
      {cameras.map((camera) => (
        <MemoizedProductCard
          key={camera.id} camera={camera} isActive=''
        />
      ))}
    </div>
  );
}

const MemoizedCatalogCards = React.memo(CatalogCards);

export default MemoizedCatalogCards;
