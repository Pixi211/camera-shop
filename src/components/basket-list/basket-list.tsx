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


  // const basketList: BasketList[] = basketItems.map((item) => ({ ...item, amount: 1 }));
  // console.log(basketList);


  // const correctBasketItems = (basketList: BasketList[]) => {
  //   // const duplicates = basketItems.filter((number, index, numbers) =>
  //   //   numbers.indexOf(number) !== index);
  //   // basketList = duplicates;
  //   // return basketList;
  //   // const id = basketItems.filter((item, index) => item.)
  //   for (let i = 0; i < basketList.length; i++) {
  //     for (let j = 1; j < basketList.length; j++) {

  //       if (basketList[i].id === basketList[j].id) {
  //         basketList[i].amount++;
  //         console.log(basketList[i]);
  //         basketList.splice(j, 1);
  //       }
  //     }
  //   }
  //   return basketList;
  // };
  // const a = correctBasketItems(basketList);
  // console.log(a);

  // console.log(basketItems);
  // console.log('new' + a);
  // console.log(number); // number - элемент массива
  // console.log(index); // index - индекс элемента массива
  // console.log(numbers); // numbers - представление массива values

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
