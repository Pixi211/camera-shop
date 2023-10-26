import { stars } from '../../const';

type RatingFormProps ={
  rating: number;
}

function RatingForm({rating}: RatingFormProps): JSX.Element {

  return (
    <>
      {stars.map((star, index) => (
        <svg width={17} height={16} aria-hidden="true" key={star}>
          <use xlinkHref={`${index < rating ? '#icon-full-star' : '#icon-star'}`}></use>
        </svg>
      ))}
    </>
  );
}

export default RatingForm;
