import React, {useState, useEffect} from "react";
import InputMask from "react-input-mask";
import { Link, Redirect } from 'react-router-dom'
import {connect} from "react-redux";
import {useForm, Controller} from "react-hook-form";
import {isNotEmptyObject} from "../functions";
import user_svg from "../assets/user.svg";
import Rating from "./Rating";
import {getReviewsAboutMe} from "../redux/actions/reviewActions";

const SearchContent = ({ getReviewsAboutMe, reviews_about_me, request }) => {
  const [sentRequest, setSentRequest] = useState(false)
  const [number, setNumber] = useState('')
  const [commentsOpened, setCommentsOpened] = useState(false)
  const [properPhone, setProperPhone] = useState(false)

  const regex =
    /^(\+7)?[\s]?\(?[0-9]{3}\)?[\s]?[0-9]{3}[\-]?[0-9]{2}[\-]?[0-9]{2}$/

  useEffect(() => {
    setProperPhone(regex.test(number))
  }, [number])

  useEffect(() => {
    if (request) {
      setNumber(request)
    }
  }, [request])

  const toggleCommentsList = () => {
    setCommentsOpened(!commentsOpened)
  }

  const handleNumberChange = num => {
    setSentRequest(false)
    setNumber(num)
  }

  const { register, handleSubmit, control } = useForm()

  const onSubmit = () => {
    setSentRequest(properPhone)
    properPhone && getReviewsAboutMe(number)
  }

  return (
    <div className='sidebar-widget'>
      <div className='pro-sidebar-search mb-50 mt-10'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='pro-sidebar-search-form'
        >
          <Controller
            control={control}
            name='number'
            defaultValue={number}
            render={({ field }) => (
              <InputMask
                // autoFocus
                type='tel'
                mask='+7 (999) 999-99-99'
                placeholder='Начать поиск'
                onChange={e =>
                  field.onChange(handleNumberChange(e.target.value))
                }
                value={number}
              />
            )}
          />
          <button>
            <i className='pe-7s-search' />
          </button>
        </form>
        {reviews_about_me &&
          reviews_about_me.results &&
          reviews_about_me.results.length === 0 &&
          sentRequest && (
            <div className='review-offer'>
              <div className='mb-4'>
                По данному номеру отзывов пока нет. Хотите быть первым?
              </div>
              <Link to={`/review?phone=${number}`} className='btn btn-review '>
                оставить отзыв
              </Link>
            </div>
          )}
        {isNotEmptyObject(reviews_about_me) &&
          reviews_about_me.results.map(item => (
            <div key={item.id} className='reviews-about-me-wrapper'>
              <div className='reviews-about-me-review'>
                <div className='reviews-about-me-photo'>
                  <div className='d-flex justify-content-center mb-3 '>
                    <img
                      src={item.owner.avatar ? item.owner.avatar : user_svg}
                      alt=''
                    />
                  </div>
                  <div className='reviews-about-me-complain d-flex  justify-content-center'>
                    <button className='btn btn-outline-danger d-block d-xl-none'>
                      <i className='fa fa-frown-o' aria-hidden='true' />
                    </button>
                    <button className='btn btn-outline-danger d-none d-xl-block'>
                      <i className='fa fa-frown-o mr-2' aria-hidden='true' />
                      Пожаловаться
                    </button>
                  </div>
                </div>
                <div className='reviews-about-me-body'>
                  <div className='reviews-about-me-head'>
                    <div className='reviews-about-me-name d-flex flex-column flex-xl-row'>
                      <div className='reviewer-name'>
                        {item.owner.full_name
                          ? item.owner.full_name
                          : item.owner.name}
                      </div>
                      <div className='reviews-about-me-rating'>
                        <div>
                          <Rating ratingValue={item.rating} />
                        </div>
                        <div>{item.rating}</div>
                      </div>
                    </div>
                  </div>
                  <div className='reviews-about-me-text'>{item.body}</div>

                  <div className='reviews-about-me-buttons'>
                    <div className='like-buttons'>
                      <div
                        className={`like-up ${
                          item.count_likes > 0 ? 'text-success' : ''
                        }`}
                      >
                        <i className='fa fa-thumbs-up' aria-hidden='true' />
                      </div>
                      <div
                        className={`like-number ${
                          item.count_likes > 0
                            ? 'text-success'
                            : item.count_likes < 0
                            ? 'text-danger'
                            : ''
                        }`}
                      >
                        {item.count_likes}
                      </div>
                      <div
                        className={`like-down ${
                          item.count_likes < 0 ? 'text-danger' : ''
                        }`}
                      >
                        <i className='fa fa-thumbs-down' aria-hidden='true' />
                      </div>
                    </div>
                    <div
                      style={
                        item.count_comments !== 0 ? { cursor: 'pointer ' } : {}
                      }
                      onClick={toggleCommentsList}
                      className='mr-4'
                    >
                      <div>
                        Всего ответов: {item.count_comments}{' '}
                        {item.count_comments !== 0 && (
                          <i
                            className={`fa fa-chevron-${
                              commentsOpened ? 'up' : 'down'
                            } ml-2`}
                            aria-hidden='true'
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {item.comments.length > 0 &&
                commentsOpened &&
                item.comments.map(comment => (
                  <div key={comment.id} className='reviews-about-me-comments'>
                    <div className='reviews-about-me-photo'>
                      <div className='d-flex justify-content-center mb-3 '>
                        <img
                          src={item.owner.avatar ? item.owner.avatar : user_svg}
                          alt=''
                        />
                      </div>
                      <div className='reviews-about-me-complain d-flex  justify-content-center'>
                        <button className='btn btn-outline-danger d-block d-xl-none'>
                          <i className='fa fa-frown-o' aria-hidden='true' />
                        </button>
                        <button className='btn btn-outline-danger d-none d-xl-block'>
                          <i
                            className='fa fa-frown-o mr-2'
                            aria-hidden='true'
                          />
                          Пожаловаться
                        </button>
                      </div>
                    </div>
                    <div className='reviews-about-me-body'>
                      <div className='reviews-about-me-head'>
                        <div className='reviews-about-me-name'>
                          <div className='reviewer-name'>
                            {comment.owner.full_name
                              ? comment.owner.full_name
                              : comment.owner.name}
                          </div>
                        </div>
                      </div>
                      <div className='reviews-about-me-text'>
                        {comment.body}
                      </div>

                      <div className='reviews-about-me-buttons'>
                        <div className='like-buttons'>
                          <div
                            className={`like-up ${
                              comment.count_likes > 0 ? 'text-success' : ''
                            }`}
                          >
                            <i className='fa fa-thumbs-up' aria-hidden='true' />
                          </div>
                          <div
                            className={`like-number ${
                              comment.count_likes > 0
                                ? 'text-success'
                                : comment.count_likes < 0
                                ? 'text-danger'
                                : ''
                            }`}
                          >
                            {comment.count_likes}
                          </div>
                          <div
                            className={`like-down ${
                              comment.count_likes < 0 ? 'text-danger' : ''
                            }`}
                          >
                            <i
                              className='fa fa-thumbs-down'
                              aria-hidden='true'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  reviews_about_me: state.review.reviews_about_me,
  request: state.searchData.request,
})


export default connect(mapStateToProps, {getReviewsAboutMe})(SearchContent);

