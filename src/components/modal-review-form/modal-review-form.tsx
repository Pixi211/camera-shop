import { useState, useRef, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../store';
import { CameraType, UserReview } from '../../types/types';
import { setAddReviewStatus, setSuccessStatus } from '../../store/modal-data/modal-data.slice';
import React from 'react';
import { fetchReviewsAction, sendReviewAction } from '../../store/current-item-data/current-item-data.action';
import ReactFocusLock from 'react-focus-lock';
import { RESET_TIMEOUT, RatingName, stars } from '../../const';
import { setReviewCount } from '../../store/current-item-data/current-item-data.slice';


type ModalAddReviewForm = {
  camera: CameraType;
  onCloseButtonClick: () => void;
}

function ModalAddReviewForm({ camera, onCloseButtonClick }: ModalAddReviewForm): JSX.Element {

  const dispatch = useAppDispatch();

  const [currentRating, setCurrentRating] = useState(0);
  const [name, setName] = useState('');
  const [advantage, setAdvantage] = useState('');
  const [disadvantage, setDisadvantage] = useState('');
  const [comment, setComment] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<UserReview>({ mode: 'onSubmit', criteriaMode: 'all' });


  const submit: SubmitHandler<UserReview> = (data) => {

    const reviewData = { ...data, rating: Number(data.rating), cameraId: camera.id };
    dispatch(sendReviewAction(reviewData)).then(() => {
      setCurrentRating(0);
    });
    dispatch(setAddReviewStatus(false));
    dispatch(setSuccessStatus(true));
    dispatch(fetchReviewsAction(camera.id));
    dispatch(setReviewCount(camera.reviewCount + 1));

    setTimeout(() => reset(), RESET_TIMEOUT);
  };

  const nameInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (nameInput.current) {
      nameInput.current.focus();
    }
  }, []);

  const getCurrentStarTitle = (star: number) => {
    switch (star) {
      case stars[0]:
        return RatingName.Awful;
      case stars[1]:
        return RatingName.Bad;
      case stars[2]:
        return RatingName.Average;
      case stars[3]:
        return RatingName.Good;
      case stars[4]:
        return RatingName.Perfect;
    }
  };

  const handleNameElementInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setName(value);
  };

  const handleAdvantageElementInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setAdvantage(value);
  };

  const handleDisadvantageElementInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setDisadvantage(value);
  };

  const handleCommentElementInput = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = evt.target;
    setComment(value);
  };

  const resetForm = () => {
    setCurrentRating(0);
    setName('');
    setAdvantage('');
    setDisadvantage('');
    setComment('');
    onCloseButtonClick();
  };

  return (
    <div className="modal__wrapper" data-testid="modalAddReviewForm-test">
      <ReactFocusLock group='group-3' returnFocus ref={nameInput} >
        <div className="modal__overlay" onClick={() => resetForm()}></div>
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
                      {stars.map((star) => (
                        <React.Fragment key={`star${star}`}>
                          <input
                            className="visually-hidden"
                            id={`star-${star}`}
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
                      id='name__input'
                      minLength={2}
                      maxLength={160}
                      placeholder="Введите ваше имя"
                      value={name}
                      onInput={handleNameElementInput}
                      {...register('userName', {
                        required: true
                      })}
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
                      minLength={2}
                      maxLength={160}
                      placeholder="Основные преимущества товара"
                      value={advantage}
                      onInput={handleAdvantageElementInput}
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
                      minLength={2}
                      maxLength={160}
                      placeholder="Главные недостатки товара"
                      value={disadvantage}
                      onInput={handleDisadvantageElementInput}
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
                      minLength={2}
                      maxLength={160}
                      placeholder="Поделитесь своим опытом покупки"
                      defaultValue={''}
                      value={comment}
                      onInput={handleCommentElementInput}
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
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => resetForm()}>
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </ReactFocusLock>
    </div >

  );
}

export default ModalAddReviewForm;
