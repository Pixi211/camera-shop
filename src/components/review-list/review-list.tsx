import ReviewCard from '../review-card/review-card';

function ReviewList(): JSX.Element {

  return (
    <ul className="review-block__list">
      <ReviewCard />
    </ul>
  );
}

export default ReviewList;
