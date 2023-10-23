import { useAppDispatch } from '../../store';
import { setActiveStatus, setAddReviewStatus, setSuccessType } from '../../store/modal-data/modal-data.slice';
import { Review } from '../../types/types';
import ReviewList from '../review-list/review-list';

type ReviewBlockProps = {
  reviews: Review[];
  visibleReviews: Review[];
  onMoreButtonClick: (arg0: Review[]) => void;
  isDisabled: boolean;
}


function ReviewBlock({ reviews, visibleReviews, onMoreButtonClick, isDisabled }: ReviewBlockProps): JSX.Element {

  window.addEventListener('scroll', () => {
    const documentRect = document.documentElement.getBoundingClientRect();
    if (documentRect.bottom < document.documentElement.clientHeight + 1) {
      onMoreButtonClick(reviews);
    }
  });

  const dispatch = useAppDispatch();

  const onAddReviewClick = () => {
    dispatch(setActiveStatus(true));
    dispatch(setAddReviewStatus(true));
    dispatch(setSuccessType('newReview'));

    document.body.style.overflow = 'hidden';
  };

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button" onClick={onAddReviewClick}>
              Оставить свой отзыв
            </button>
          </div>
          <ReviewList reviews={visibleReviews} />
          <div className="review-block__buttons">
            <button className={`btn btn--purple ${isDisabled ? 'visually-hidden' : ''}`} type="button" onClick={() => onMoreButtonClick(reviews)}>
              Показать больше отзывов
            </button>
          </div>
        </div>
      </section >
    </div >
  );
}

export default ReviewBlock;
