import { BasketItemType } from '../../types/types';
import BasketItem from '../basket-item/basket-item';

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
