import { CamerasListType } from '../../types/types';
import ProductCard from '../product-card/product-card';

type CatalogCardsProps = {
  cameras: CamerasListType;
};


function CatalogCards({ cameras }: CatalogCardsProps): JSX.Element {


  return (
    <div className="cards catalog__cards">
      {cameras.map((camera) => (
        <ProductCard
          key={camera.id} {...camera}
        />
      ))}
    </div>
  );
}

export default CatalogCards;
