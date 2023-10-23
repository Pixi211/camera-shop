import { useState, useRef, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../store';
import { UserReview } from '../../types/types';
import { setAddReviewStatus, setSuccessStatus } from '../../store/modal-data/modal-data.slice';
import React from 'react';
import { fetchReviewsAction, sendReviewAction } from '../../store/current-item-data/current-item-data.action';

type ModalAddReviewForm = {
  cameraId: number;
  onCloseButtonClick: () => void;
}

function ModalAddReviewForm({ cameraId, onCloseButtonClick }: ModalAddReviewForm): JSX.Element {

  const dispatch = useAppDispatch();
  //to const
  const RESET_TIMEOUT = 300;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<UserReview>({ mode: 'onSubmit', criteriaMode: 'all' });

  const nameRegExp = new RegExp('[A-Za-zА-Яа-яЁё\\s\'\\-]+'); //
  const [currentRating, setCurrentRating] = useState(0);


  const submit: SubmitHandler<UserReview> = (data) => {

    const reviewData = { ...data, rating: Number(data.rating), cameraId: cameraId };
    dispatch(sendReviewAction(reviewData)).then(() => {
      setCurrentRating(0);
    });
    dispatch(setAddReviewStatus(false));
    dispatch(setSuccessStatus(true));
    dispatch(fetchReviewsAction(cameraId));

    setTimeout(() => reset(), RESET_TIMEOUT);

  };

  //to const
  const STARS_RATING = [1, 2, 3, 4, 5];
  enum RatingName {
    Awful = 'Ужасно',
    Bad = 'Плохо',
    Average = 'Нормально',
    Good = 'Хорошо',
    Perfect = 'Отлично',
  }
  //utils?
  const getCurrentStarTitle = (star: number) => {
    switch (star) {
      case STARS_RATING[0]:
        return RatingName.Awful;
      case STARS_RATING[1]:
        return RatingName.Bad;
      case STARS_RATING[2]:
        return RatingName.Average;
      case STARS_RATING[3]:
        return RatingName.Good;
      case STARS_RATING[4]:
        return RatingName.Perfect;
    }
  };

  const nameInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (nameInput.current) {
      nameInput.current.focus();
    }
  }, []);

  return (
    <div className="modal__wrapper">
      <div className="modal__overlay" onClick={() => onCloseButtonClick()}></div>
      <div className="modal__content">
        <p className="title title--h4">Оставить отзыв</p>
        <div className="form-review">
          <form method="post" onSubmit={(evt) => {
            handleSubmit(submit)(evt);
          }}
          >
            <div className="form-review__rate">
              <fieldset className={`rate form-review__item ${errors.rating ? 'is-invalid' : ''}`}>
                <legend className="rate__caption">
                  Рейтинг
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </legend>

                <div className="rate__bar">
                  <div className="rate__group">
                    {STARS_RATING.map((star) => (
                      <React.Fragment key={`star${star}`}>
                        <input
                          className="visually-hidden"
                          id={`star-${star}`}
                          name="rate"
                          type="radio"
                          value={star}
                          onClick={() => {
                            setCurrentRating(star);
                          }}
                          {...register('rating', {
                            required: true, validate: (value) => {
                              const isRatingValid = value > 0;
                              return isRatingValid;
                            }
                          })}
                          aria-invalid={errors.rating ? 'true' : 'false'}
                        />
                        <label
                          className="rate__label"
                          htmlFor={`star-${star}`}
                          title={getCurrentStarTitle(star)}
                        />
                      </React.Fragment>
                    )).reverse()}
                  </div>
                  <div className="rate__progress">
                    <span className="rate__stars">{currentRating}</span>
                    <span>/</span>
                    {' '}
                    <span className="rate__all-stars">5</span>
                  </div>
                </div>
                <p className="rate__message">Нужно оценить товар</p>
              </fieldset>

              <div className={`custom-input form-review__item ${errors.userName ? 'is-invalid' : ''}`}>
                <label>
                  <span className="custom-input__label">
                    Ваше имя
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </span>
                  <input
                    type="text"
                    // name="user-name"
                    minLength={2}
                    maxLength={160}
                    placeholder="Введите ваше имя"
                    {...register('userName', {
                      required: true, validate: (value) => {
                        const isNameValid = nameRegExp.test(value);
                        return isNameValid;
                      }
                    })}
                    ref={nameInput}
                    aria-invalid={errors.userName ? 'true' : false}
                  />
                </label>
                <p className="custom-input__error">Нужно указать имя</p>
              </div>

              <div className={`custom-input form-review__item ${errors.advantage ? 'is-invalid' : ''}`}>
                <label>
                  <span className="custom-input__label">
                    Достоинства
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="user-plus"
                    minLength={2}
                    maxLength={160}
                    placeholder="Основные преимущества товара"
                    {...register('advantage', { required: true })}
                    aria-invalid={errors.advantage ? 'true' : 'false'}
                  />
                </label>
                <p className="custom-input__error">Нужно указать достоинства</p>
              </div>
              <div className={`custom-input form-review__item ${errors.disadvantage ? 'is-invalid' : ''}`}>
                <label>
                  <span className="custom-input__label">
                    Недостатки
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="user-minus"
                    minLength={2}
                    maxLength={160}
                    placeholder="Главные недостатки товара"
                    {...register('disadvantage', { required: true })}
                    aria-invalid={errors.disadvantage ? 'true' : 'false'}
                  />
                </label>
                <p className="custom-input__error">Нужно указать недостатки</p>
              </div>
              <div className={`custom-textarea form-review__item ${errors.review ? 'is-invalid' : ''}`}>
                <label>
                  <span className="custom-textarea__label">
                    Комментарий
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </span>
                  <textarea
                    name="user-comment"
                    minLength={2}
                    maxLength={160}
                    placeholder="Поделитесь своим опытом покупки"
                    defaultValue={''}
                    {...register('review', { required: true })}
                  >
                  </textarea>
                </label>
                <div className="custom-textarea__error">Нужно добавить комментарий</div>
              </div>
            </div>
            <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
          </form>
        </div>
        <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => onCloseButtonClick()}>
          <svg width={10} height={10} aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ModalAddReviewForm;
