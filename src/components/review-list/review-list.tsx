import { Review } from '../../types/types';
import ReviewCard from '../review-card/review-card';

type ReviewListProps = {
  reviews: Review[];
}
function ReviewList({ reviews }: ReviewListProps): JSX.Element {

  return (

    <ul className="review-block__list">
      {reviews.map((review) => <ReviewCard key={review.id} {...review} />)}
    </ul>

  );
}

export default ReviewList;
