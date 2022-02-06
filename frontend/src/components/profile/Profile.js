import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import user_svg from '../../assets/user.svg'
import { update_user } from '../../redux/actions/authActions'

import { useForm } from 'react-hook-form'
import {
  getReviewTemplates,
  setReview,
  getReviewsAboutMe,
  getMyReviews,
  setComment,
  getReviews,
  setLikes,
  setCommentLikes,
} from '../../redux/actions/reviewActions'
import { add_extra_phone } from '../../redux/actions/authActions'
import { isNotEmptyObject } from '../../functions'
import Row from 'react-bootstrap/Row'
import RatingElement from '../RatingElement'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import PersonalInfo from './PersonalInfo'

const Profile = ({
  isAuthenticated,
  user,
  setReview,
  getReviewsAboutMe,
  getMyReviews,
  reviews_about_me,
  my_reviews,
  setComment,
  update_user,
  add_extra_phone,
  userStatus,
  reviews,
  getReviews,
  setLikes,
  results,
  setCommentLikes,
}) => {
  const [activeAccount, setActiveAccount] = useState({})
  const [reviewsStatus, setReviewsStatus] = useState(false)
  const [reviewsResults, setReviewsResults] = useState([])

  useEffect(() => {
    if (results && results.length > 0) {
      setReviewsStatus(true)
      setReviewsResults(results)
    } else {
      setReviewsStatus(false)
      setReviewsResults([])
    }
  }, [results])

  const [modal, setModal] = useState({
    isOpened: false,
    id: null,
  })

  const [updateProfile, setUpdateProfile] = useState({
    name: '',
    full_name: '',
    city: '',
    birthday: null,
    avatar: null,
    about: '',
  })

  const handleClose = () => {
    setModal({ isOpened: false, id: null })
  }

  const [active, setActive] = useState('')
  const [commentsOpened, setCommentsOpened] = useState(null)
  const [edit, setEdit] = useState(false)
  const [commentBody, setCommentBody] = useState('')
  const [phone, setPhone] = useState('')
  const [activeReview, setActiveReview] = useState(null)
  const [rating, setRating] = useState(null)
  const [reviewText, setReviewText] = useState('')
  const [reviewCommentText, setReviewCommentText] = useState('')
  const [reviewFull, setReviewFull] = useState({
    phone_number: '',
    rating: null,
    body: '',
  })

  const [filter, setFilter] = useState({
    owner: '',
    about_customer: userStatus && userStatus === 'customer',
    reviewable: '',
    reviewable__owner: user && user.id,
    reviewable__screen_name: '',
    reviewable__polymorphic_ctype__model: '',
  })

  useEffect(() => {
    setFilter({
      ...filter,
      about_customer: userStatus === 'customer',
    })
  }, [userStatus])

  const toggleCommentsList = id => {
    setCommentsOpened(commentsOpened === id ? null : id)
  }

  const handleComment = id => {
    if (commentBody !== '') {
      setModal({ isOpened: false, id: null })
      let data = {
        commented_review: id,
        body: commentBody,
      }
      setComment(data)
    }
  }

  const handleUpdateProfile = () => {
    update_user(updateProfile)
  }

  useEffect(() => {
    let filter_str = `?owner=${filter.owner}&about_customer=${filter.about_customer}&reviewable=${filter.reviewable}&reviewable__owner=${filter.reviewable__owner}&reviewable__screen_name=${filter.reviewable__screen_name}&reviewable__polymorphic_ctype__model=${filter.reviewable__polymorphic_ctype__model}`
    getReviews(filter_str)
  }, [filter])

  useEffect(() => {
    if (isNotEmptyObject(user)) {
      // setactiveAccount(user.phones[0])
      getReviewsAboutMe(user.phone)
      getMyReviews(user.id)
      setUpdateProfile({
        name: user.name,
        full_name: user.full_name,
        city: user.city,
        birthday: user.birthday,
        avatar: user.avatar,
        about: user.about,
      })
    }
  }, [user])

  const handleLike = (id, dislike) => {
    const dislike_value = dislike ? { dislike: true } : false
    let data = { id: id, dislike: dislike_value }
    setLikes(data)
  }

  const handleCommentLike = (review_id, id, dislike) => {
    const dislike_value = dislike ? { dislike: true } : false
    let data = { id: id, dislike: dislike_value, review_id: review_id }
    setCommentLikes(data)
  }

  const { control } = useForm()

  const handleReviewComment = id => {
    setComment(id, reviewText)
  }

  if (!isAuthenticated) {
    return <Redirect to='/login' />
  }

  const handleQuickReview = (id, text) => {
    setActiveReview(id === activeReview ? null : id)
    setReviewText(text)
    setReviewFull({
      ...reviewFull,
      body: text,
    })
  }

  const handlePhone = phone => {
    setPhone(phone)
    setReviewFull({
      ...reviewFull,
      phone_number: phone,
    })
  }

  const handleRating = value => {
    setReviewFull({
      ...reviewFull,
      rating: value,
    })
  }

  const handleCustomReview = value => {
    setActiveReview(null)
    setReviewFull({
      ...reviewFull,
      body: value,
    })
  }

  const handleReview = () => {
    setReviewFull({
      ...reviewFull,
      phone_number: phone,
      rating: rating,
      body: reviewText,
    })
    setReview(reviewFull)
  }

  const handleAccountOption = e => {
    if (e.target.value === 'all') {
      setFilter({
        ...filter,
        owner: '',
        reviewable: '',
        reviewable__screen_name: '',
        reviewable__polymorphic_ctype__model: '',
      })
    } else if (e.target.value === 'my') {
      setFilter({
        ...filter,
        owner: user.id,
        reviewable: '',
        reviewable__screen_name: '',
        reviewable__polymorphic_ctype__model: '',
      })
    } else {
      let data = e.target.value.split(',')
      setFilter({
        ...filter,
        owner: '',
        reviewable: data[0],
        reviewable__screen_name: data[1],
        reviewable__polymorphic_ctype__model: data[2],
      })
    }
  }

  return (
    <>
      <Modal show={modal.isOpened} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Написать ответ к отзыву</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className='input-control'>
              <form onSubmit={() => handleComment(modal.id)}>
                <textarea
                  placeholder='Ваш ответ...'
                  rows='2'
                  className='input-control-input input-phone'
                  onChange={e => setCommentBody(e.target.value)}
                />
              </form>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <button
            className='input-control-button'
            onClick={() => handleComment(modal.id)}
          >
            Отправить
          </button>
        </Modal.Footer>
      </Modal>

      <div className='panel mb-4'>
        <div className='bio-graph-heading'>Моя страница</div>
        <div className='panel-body bio-graph-info'>
          <PersonalInfo user={user} />
        </div>
      </div>

      {/* {user && user.phones.length > 1 && (
        <Fragment>
          <label htmlFor='state' className='form-label'>
            Номер телефона
          </label>
          <select className='form-select' id='user-phone-number' required=''>
            {user &&
              user.phones.map(item => (
                <option
                  key={item.id}
                  value={item.phone_number}
                  onChange={e => {
                    handlePhoneOption(e)
                  }}
                >
                  {item.phone_number}
                </option>
              ))}
          </select>
        </Fragment>
      )} */}

      {user && user.reviewables && user.reviewables.length > 1 && (
        <div className='select-phone-options'>
          <label htmlFor='state' className='form-label'>
            Фильтровать отзывы:
          </label>
          <select
            className='form-select'
            id='user-phone-number'
            required=''
            onChange={handleAccountOption}
          >
            <option value='all'>Все отзывы</option>
            <option value='my'>Мои отзывы</option>
            {user &&
              user.reviewables &&
              user.reviewables.map(item => (
                <option
                  key={item.id}
                  value={
                    item.id +
                    ',' +
                    item.screen_name +
                    ',' +
                    item.resourcetype.toLowerCase()
                  }
                >
                  {item.screen_name}
                </option>
              ))}
          </select>
        </div>
      )}

      {user && (
        <Fragment>
          <div>
            <div className='row'>
              <div className='col-xl-4'>
                <div className='panel mb-4'>
                  <div className='panel-body bio-graph-info'>
                    <h1 className='red'>Отзывов обо мне</h1>
                    <h2>
                      {userStatus === 'executor'
                        ? user.reviews_customers_about_me_count
                        : user.reviews_executors_about_me_count}
                    </h2>
                  </div>
                </div>
              </div>
              <div className='col-xl-4'>
                <div className='panel mb-4'>
                  <div className='panel-body bio-graph-info'>
                    <h1 className='red'>Моих отзывов</h1>
                    <h2>
                      {userStatus === 'executor'
                        ? user.my_reviews_about_customers_count
                        : user.my_reviews_about_executors_count}
                    </h2>
                  </div>
                </div>
              </div>
              <div className='col-xl-4'>
                <div className='panel mb-4'>
                  <div className='panel-body bio-graph-info'>
                    <h1 className='red'>Мой рейтинг</h1>
                    <div className='my-rating'>
                      <RatingElement
                        rating={{
                          value:
                            userStatus === 'executor'
                              ? user.executor_rating
                              : user.customer_rating,
                          arr:
                            userStatus === 'executor'
                              ? user.users_executor_attributes_avg
                              : user.users_customer_attributes_avg,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
      <div className='panel mb-4'>
        <div className='panel-body bio-graph-info'>
          {filter.owner ? <h1>Мои отзывы</h1> : <h1>Отзывы обо мне</h1>}
          {reviewsStatus &&
            reviewsResults.map(item => (
              <div key={item.id} className='reviews-about-me-wrapper'>
                <div className='reviews-about-me-review'>
                  <div className='reviews-about-me-photo'>
                    <div className='d-flex justify-content-center mb-3 '>
                      <img
                        src={item.owner.avatar ? item.owner.avatar : user_svg}
                        alt=''
                      />
                    </div>
                  </div>
                  <div className='reviews-about-me-body'>
                    <div className='reviews-about-me-head'>
                      <div className='name-and-service-wrapper'>
                        <div className='reviewer-name'>
                          {item.owner.full_name
                            ? item.owner.full_name
                            : item.owner.name}
                        </div>
                        <div className='reviewer-service'>
                          {item.service && item.service.title}
                        </div>
                      </div>
                      <div className='reviews-about-me-rating'>
                        <RatingElement
                          rating={{
                            value: item.rating,
                            arr: item.attributes,
                          }}
                        />
                      </div>
                    </div>
                    <div className='body-likes-wrapper'>
                      <div className='reviews-about-me-text'>{item.body}</div>
                      <div className='like-buttons'>
                        <div
                          className={`like-up ${
                            item.count_likes > 0 ? 'text-success' : ''
                          }`}
                          onClick={() => handleLike(item.id, false)}
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
                          onClick={() => handleLike(item.id, true)}
                        >
                          <i className='fa fa-thumbs-down' aria-hidden='true' />
                        </div>
                      </div>
                    </div>

                    <div className='reviews-about-me-buttons'>
                      <div className='response-buttons'>
                        <div className='comment-button'>
                          <button
                            onClick={() =>
                              setModal({
                                isOpened: true,
                                id: item.id,
                              })
                            }
                            className='button-response'
                          >
                            Написать ответ
                          </button>
                        </div>

                        <div
                          style={
                            item.count_comments !== 0
                              ? { cursor: 'pointer ' }
                              : {}
                          }
                          onClick={() => toggleCommentsList(item.id)}
                          className='mr-4'
                        >
                          <div>
                            Всего ответов: {item.count_comments}{' '}
                            {item.count_comments !== 0 && (
                              <i
                                className={`fa fa-chevron-${
                                  commentsOpened === item.id ? 'up' : 'down'
                                } ml-2`}
                                aria-hidden='true'
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className='reviews-about-me-complain d-flex  justify-content-center'>
                        <button className='btn btn-outline-danger d-block d-xl-none'>
                          <i className='fa fa-frown-o' aria-hidden='true' />
                        </button>
                        <button className='button-complain'>
                          <i
                            className='fa fa-frown-o mr-2'
                            aria-hidden='true'
                          />
                          Пожаловаться
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {item.comments &&
                  item.comments.length > 0 &&
                  commentsOpened === item.id &&
                  item.comments.map(comment => (
                    <div key={comment.id} className='reviews-about-me-comments'>
                      <div className='reviews-about-me-photo'>
                        <div className='d-flex justify-content-center mb-3 '>
                          <img
                            src={
                              comment.owner.avatar
                                ? comment.owner.avatar
                                : user_svg
                            }
                            alt=''
                          />
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
                        <div className='body-likes-wrapper'>
                          <div className='reviews-about-me-text'>
                            {comment.body}
                          </div>
                          <div className='like-buttons'>
                            <div
                              className={`like-up ${
                                comment.count_likes > 0 ? 'text-success' : ''
                              }`}
                              onClick={() =>
                                handleCommentLike(item.id, comment.id, false)
                              }
                            >
                              <i
                                className='fa fa-thumbs-up'
                                aria-hidden='true'
                              />
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
                              onClick={() =>
                                handleCommentLike(item.id, comment.id, true)
                              }
                            >
                              <i
                                className='fa fa-thumbs-down'
                                aria-hidden='true'
                              />
                            </div>
                          </div>
                        </div>
                        <div className='reviews-about-me-comment-buttons'>
                          <div className='reviews-about-me-complain d-flex  justify-content-center'>
                            <button className='btn btn-outline-danger d-block d-xl-none'>
                              <i className='fa fa-frown-o' aria-hidden='true' />
                            </button>
                            <button className='button-complain'>
                              <i
                                className='fa fa-frown-o mr-2'
                                aria-hidden='true'
                              />
                              Пожаловаться
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

Profile.propTypes = {
  location: PropTypes.object,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  userStatus: state.auth.user_status,
  review_templates: state.review.review_templates,
  reviews_about_me: state.review.reviews_about_me,
  my_reviews: state.review.my_reviews,
  reviews: state.review.reviews,
  results: state.review.results,
})

export default connect(mapStateToProps, {
  getReviewTemplates,
  setReview,
  getReviewsAboutMe,
  getMyReviews,
  setComment,
  update_user,
  add_extra_phone,
  getReviews,
  setLikes,
  setCommentLikes,
})(Profile)
