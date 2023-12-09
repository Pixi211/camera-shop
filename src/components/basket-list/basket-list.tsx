import { BasketItemType, Category, Level, Type } from '../../types/types';
import BasketItem from '../basket-item/basket-item';
type BasketList = {
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
  amount: number;
}

type BasketListProps = {
  basketItems: BasketItemType[];
}

function BasketList({ basketItems }: BasketListProps): JSX.Element {

  return (
    <ul className="basket__list" data-testid="basketList-test">

      {
        basketItems && basketItems.map((item) => (
          <BasketItem
            key={item.id} basketItem={item}
          />
        ))
      }

    </ul>
  );
}

export default BasketList;
