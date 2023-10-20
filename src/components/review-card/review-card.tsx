import { Review } from '../../types/types';


function ReviewCard(props: Review): JSX.Element {
  const { id, userName, createAt, rating, advantage, disadvantage, review } = props;
  const date = new Date(createAt);

  //to const
  const stars = [1, 2, 3, 4, 5];
  const ratingForm = (
    <>
      {stars.map((star, index) => (
        <svg width={17} height={16} aria-hidden="true" key={star}>
          <use xlinkHref={`${index < rating ? '#icon-full-star' : '#icon-star'}`}></use>
        </svg>
      ))}
    </>
  );

  return (
    <li className="review-card" key={id}>
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime="2022-04-13">
          {date.toLocaleDateString('ru', {
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </div>
      <div className="rate review-card__rate">
        {ratingForm}
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewCard;
