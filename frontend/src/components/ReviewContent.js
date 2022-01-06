import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import InputMask from 'react-input-mask'
import { useForm, Controller } from 'react-hook-form'
import {
  getReviewTemplates,
  setReview,
  getReviewsAboutMe,
  getMyReviews,
  setComment,
  resetStatus,
  resetReviewError,
} from '../redux/actions/reviewActions'
import { isNotEmptyObject } from '../functions'
import Review from './reviews/Review'
import PhoneInput from './reviews/PhoneInput'

const ReviewContent = ({
  search,
  match,
  isAuthenticated,
  user,
  review_templates,
  getReviewTemplates,
  setReview,
  set_review_success,
  resetStatus,
  resetReviewError,
  error,
}) => {
  const [templates, setTemplates] = useState([])
  const [active, setActive] = useState('')
  const [activeReview, setActiveReview] = useState(null)
  const [rating, setRating] = useState(null)
  const [reviewText, setReviewText] = useState('')
  const [reviewCommentText, setReviewCommentText] = useState('')
  const [reviewFull, setReviewFull] = useState({
    phone_number: '',
    attributes: [],
    body: '',
  })

  const [reviewClicked, setReviewClicked] = useState(false)
  const [properPhone, setProperPhone] = useState(false)
  const [phone, setPhone] = useState('')

  const [templatesRequestSent, setTemplatesRequestSent] = useState(false)

  useEffect(() => {
    if (search) {
      let num = search.split('=')[1]
      setPhone(num)
    }
  }, [])

  useEffect(() => {
    if (review_templates) {
      setTemplates(review_templates)
    }
  }, [review_templates])

  if (!isAuthenticated) {
    return <Redirect to='/login' />
  }

  // const handleQuickReview = (id, text) => {
  //   setActiveReview(id === activeReview ? null : id)
  //   setReviewText(text)
  //   setReviewFull({
  //     ...reviewFull,
  //     body: text,
  //   })
  // }


  const handleTEmplateRequest = n => {
    getReviewTemplates(n)
    setTemplatesRequestSent(true)
  }

  const handleTEmplateReset = () => {
    setTemplatesRequestSent(false)
  }

  const handlePhone = phone => {
    setReviewFull({
      ...reviewFull,
      phone_number: phone,
    })
  }

  const handleReviewText = text => {
    setReviewFull({
      ...reviewFull,
      body: text,
    })
  }

  const handleAttributes = arr => {
    setReviewFull({
      ...reviewFull,
      attributes: arr,
    })
  }

  const handleReview = () => {
    setReview(reviewFull)
  }

  const handleReviewClick = bool => {
    resetStatus()
    resetReviewError()
    setReviewClicked(bool)
  }

  return (
    <Fragment>
      <div className='panel'>
        <div className='bio-graph-heading'>Написать отзыв</div>
        <div className='panel-body bio-graph-info mb-4'>
          {!templatesRequestSent && (
            <div
              className='w-100 d-flex flex-column justify-content-center align-items-center'
              style={{ minHeight: 300 }}
            >
              <div className='mb-4' style={{ fontSize: 24 }}>
                {' '}
                Кому Вы хотите оставить отзыв?
              </div>
              <div className='d-flex justify-items-around mt-5'>
                <button
                  className='btn btn-outline-secondary mr-5'
                  onClick={() => handleTEmplateRequest(0)}
                >
                  ИСПОЛНИТЕЛЮ
                </button>
                <button
                  className='btn btn-outline-secondary ml-5'
                  onClick={() => handleTEmplateRequest(1)}
                >
                  ЗАКАЗЧИКУ
                </button>
              </div>
            </div>
          )}
          {templatesRequestSent && (
            <>
              <PhoneInput
                phone_number={phone}
                review_clicked={reviewClicked}
                proper_phone={setProperPhone}
                phoneAction={handlePhone}
              />

              <div className='mb-4'>
                Выберите наиболее подходящий коментарий, либо оставьте свой.
                Стандартные коментарии можно редактировать перед сохранением.
              </div>
              <div className='row'>
                <div className='col-md-8'>
                  {templates &&
                    templates.map(item => (
                      <Review
                        template={true}
                        data={item}
                        key={item.id}
                        action={handleReviewClick}
                        text_action={handleReviewText}
                        attributes_action={handleAttributes}
                        review_action={handleReview}
                        proper_phone={properPhone}
                        success={set_review_success}
                        error={error}
                        template_reset={handleTEmplateReset}
                        />
                        ))}
                </div>
                <div
                  className='col-md-4 d-flex align-items-center justify-content-center'
                  style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.08)' }}
                  >
                  <Review
                    template={false}
                    data={templates[0]}
                    action={handleReviewClick}
                    text_action={handleReviewText}
                    attributes_action={handleAttributes}
                    review_action={handleReview}
                    proper_phone={properPhone}
                    success={set_review_success}
                    error={error}
                    template_reset={handleTEmplateReset}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Fragment>
  )
}

Review.propTypes = {
  location: PropTypes.object,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  review_templates: state.review.review_templates,
  reviews_about_me: state.review.reviews_about_me,
  my_reviews: state.review.my_reviews,
  set_review_success: state.review.set_review_success,
  error: state.review.error,
})

export default connect(mapStateToProps, {
  getReviewTemplates,
  setReview,
  getReviewsAboutMe,
  getMyReviews,
  setComment,
  resetStatus,
  resetReviewError,
})(ReviewContent)
