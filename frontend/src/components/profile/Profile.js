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
} from '../../redux/actions/reviewActions'
import { add_extra_phone } from '../../redux/actions/authActions'
import { isNotEmptyObject } from '../../functions'
import Row from 'react-bootstrap/Row'
import Rating from '../Rating'
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
}) => {
  const [activePhone, setActivePhone] = useState({})

  const [modal, setModal] = useState({
    isOpened: false,
    id: null,
    owner_id: null,
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
    setModal({ isOpened: false, id: null, owner_id: null })
  }

  const [active, setActive] = useState('')
  const [commentsOpened, setCommentsOpened] = useState(false)
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

  const toggleCommentsList = () => {
    setCommentsOpened(!commentsOpened)
  }

  const handleComment = (id, owner_id) => {
    if (commentBody !== '') {
      setModal({ isOpened: false, id: null, owner_id: null })
      setComment(id, commentBody, owner_id)
    }
  }

  const handleUpdateProfile = () => {
    update_user(updateProfile)
  }

  useEffect(() => {
    if (isNotEmptyObject(user)) {
      // setActivePhone(user.phones[0])
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

  const handlePhoneOption = str => {
    setActivePhone(user.phones.filter(item => item.phone_number === str)[0])
  }

  return (
    <Fragment>
      <Modal show={modal.isOpened} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Написать ответ к отзыву</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <textarea
              placeholder='Ваш ответ...'
              rows='2'
              className='form-control input-lg p-text-area text-left'
              onChange={e => setCommentBody(e.target.value)}
            />
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => handleComment(modal.id, modal.owner_id)}>
            Отправить
          </Button>
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

      {user && user.phones && user.phones.length > 1 && (
        <div className='select-phone-options'>
          <label htmlFor='state' className='form-label'>
            Номер телефона
          </label>
          <select
            className='form-select'
            id='user-phone-number'
            required=''
            onChange={e => {
              handlePhoneOption(e.target.value)
            }}
          >
            {user &&
              user.phones.map(item => (
                <option key={item.id} value={item.phone_number}>
                  {item.phone_number}
                </option>
              ))}
          </select>
        </div>
      )}

      {isNotEmptyObject(activePhone) && (
        <Fragment>
          <div>
            <div className='row'>
              <div className='col-xl-4'>
                <div className='panel mb-4'>
                  <div className='panel-body bio-graph-info'>
                    <h1 className='red'>Отзывов обо мне</h1>
                    <h2>{activePhone.count_reviews}</h2>
                  </div>
                </div>
              </div>
              <div className='col-xl-4'>
                <div className='panel mb-4'>
                  <div className='panel-body bio-graph-info'>
                    <h1 className='red'>Моих отзывов</h1>
                    {isNotEmptyObject(my_reviews) && (
                      <h2>{my_reviews.count}</h2>
                    )}
                  </div>
                </div>
              </div>
              <div className='col-xl-4'>
                <div className='panel mb-4'>
                  <div className='panel-body bio-graph-info'>
                    <h1 className='red'>Мой рейтинг</h1>
                    <div className='my-rating'>
                      <Rating
                        ratingValue={
                          activePhone &&
                          activePhone.rating_avg &&
                          activePhone.rating_avg.toFixed(1)
                        }
                      />
                      <h2>
                        {activePhone &&
                          activePhone.rating_avg &&
                          activePhone.rating_avg.toFixed(1)}
                      </h2>
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
          <h1>Отзывы обо мне</h1>
          {isNotEmptyObject(reviews_about_me) &&
            reviews_about_me.results.map(
              item =>
                item.phone == activePhone.phone_number && (
                  <div key={item.id} className='reviews-about-me-wrapper'>
                    <div className='reviews-about-me-review'>
                      <div className='reviews-about-me-photo'>
                        <div className='d-flex justify-content-center mb-3 '>
                          <img
                            src={
                              item.owner.avatar ? item.owner.avatar : user_svg
                            }
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
                              <i
                                className='fa fa-thumbs-up'
                                aria-hidden='true'
                              />
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
                              <i
                                className='fa fa-thumbs-down'
                                aria-hidden='true'
                              />
                            </div>
                          </div>
                          <div
                            style={
                              item.count_comments !== 0
                                ? { cursor: 'pointer ' }
                                : {}
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
                          <div className='comment-button'>
                            <button
                              onClick={() =>
                                setModal({
                                  isOpened: true,
                                  id: item.id,
                                  owner_id: item.owner.id,
                                })
                              }
                              className='btn btn-outline-secondary d-block d-xl-none'
                            >
                              <i className='fa fa-reply' aria-hidden='true' />
                            </button>
                            <button
                              onClick={() =>
                                setModal({
                                  isOpened: true,
                                  id: item.id,
                                  owner_id: item.owner.id,
                                })
                              }
                              className='btn btn-outline-secondary d-none d-xl-block'
                            >
                              <i
                                className='fa fa-reply mr-2'
                                aria-hidden='true'
                              />
                              Написать ответ
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {item.comments.length > 0 &&
                      commentsOpened &&
                      item.comments.map(comment => (
                        <div
                          key={comment.id}
                          className='reviews-about-me-comments'
                        >
                          <div className='reviews-about-me-photo'>
                            <div className='d-flex justify-content-center mb-3 '>
                              <img
                                src={
                                  item.owner.avatar
                                    ? item.owner.avatar
                                    : user_svg
                                }
                                alt=''
                              />
                            </div>
                            <div className='reviews-about-me-complain d-flex  justify-content-center'>
                              <button className='btn btn-outline-danger d-block d-xl-none'>
                                <i
                                  className='fa fa-frown-o'
                                  aria-hidden='true'
                                />
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
                                    comment.count_likes > 0
                                      ? 'text-success'
                                      : ''
                                  }`}
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
                )
            )}
        </div>
      </div>
    </Fragment>
  )
}

Profile.propTypes = {
  location: PropTypes.object,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  review_templates: state.review.review_templates,
  reviews_about_me: state.review.reviews_about_me,
  my_reviews: state.review.my_reviews,
})

export default connect(mapStateToProps, {
  getReviewTemplates,
  setReview,
  getReviewsAboutMe,
  getMyReviews,
  setComment,
  update_user,
  add_extra_phone,
})(Profile)
