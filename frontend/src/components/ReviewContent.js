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
import { get_all_categories } from '../redux/actions/serviceActions'
import { isNotEmptyObject } from '../functions'
import Review from './reviews/Review'
import PhoneInput from './reviews/PhoneInput'
import PanelLayout from '../layouts/PanelLayout'
import SearchBlock from './SearchBlock'

const ReviewContent = ({
  search,
  match,
  isAuthenticated,
  user,
  templates,
  getReviewTemplates,
  setReview,
  set_review_success,
  resetStatus,
  resetReviewError,
  error,
  get_all_categories,
  categories,
}) => {
  const [valid, setValid] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [category, setCategory] = useState('')
  const [service, setService] = useState('')
  const [services, setServices] = useState([])

  const [screenName, setScreenName] = useState('')

  // const [templates, setTemplates] = useState([])
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
    get_all_categories()
    if (search) {
      let num = search.split('=')[1]
      setPhone(num)
    }
  }, [])

  // useEffect(() => {
  //   if (templates) {
  //     setTemplates(templates)
  //   }
  // }, [templates])

  useEffect(() => {
    if(category) {
      let arr = categories
        .filter(item => item.id == category)[0]
        .services.map(service => service)

      setServices(arr)

    }
  }, [category])

  if (!isAuthenticated) {
    return <Redirect to='/login' />
  }

  const clearScreenName = () => {
    setScreenName('')
    setCategory('')
    setService('')
  }

  const handleCategorySelect = e => {
    setCategory(e.target.value)
  }
  
  const handleServiceSelect = e => {
    setService(e.target.value)
  }

  const handleTEmplateRequest = n => {
    setTemplatesRequestSent(true)
    getReviewTemplates(n)
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

  const InitialStatus = () => (
    <div className='reviews-page-buttons-row'>
      <button onClick={() => handleTEmplateRequest(false)}>ИСПОЛНИТЕЛЮ</button>
      <button onClick={() => handleTEmplateRequest(true)}>ЗАКАЗЧИКУ</button>
    </div>
  )

  const SecondaryStatus = () => (
    <>
      <div className='py-5'>
        {screenName ? (
          <div className='d-flex align-items-center'>
            <div style={{ fontSize: 28, lineHeight: '30px' }}>{screenName}</div>
            <div
              style={{
                fontSize: 30,
                lineHeight: '30px',
                color: '#dc3545',
                marginLeft: 20,
                cursor: 'pointer',
              }}
              onClick={clearScreenName}
            >
              <i className='pe-7s-close-circle' aria-hidden='true' />
            </div>
          </div>
        ) : (
          <SearchBlock
            buttontexttrue={<i class='fa fa-check' />}
            buttontextfalse={<i class='fa fa-times' />}
            size='small'
            bg={valid ? 'green' : !valid && clicked ? 'red' : 'grey'}
            action={setScreenName}
          />
        )}
      </div>

      {screenName && (
        <>
          <div className='reviews-services-wrapper'>
            <div className='reviews-services-title'>
              Выберите/добавьте специализацию
            </div>
            <div className='reviews-services-select-wrapper'>
              <div className='reviews-services-select'>
                <select
                  className='form-select'
                  onChange={handleCategorySelect}
                  defaultValue='b1b2'
                  value={category}
                >
                  <option value='b1b2' disabled>
                    Выбор категории
                  </option>
                  {categories &&
                    categories.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                </select>
              </div>
              {category && (
                <div className='reviews-services-select'>
                  <select
                    className='form-select'
                    onChange={handleServiceSelect}
                    value={service}
                  >
                    <option disabled>Выбор специализации</option>
                    {services &&
                      services.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.title}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>
          </div>
          <div className='reviews-services-wrapper'>
            <div className='reviews-services-title'>
              Выберите наиболее подходящий коментарий, либо оставьте свой.
            </div>
            <div className='mt-3 mb-5'>
              <p>
                Стандартные коментарии можно редактировать перед сохранением.
              </p>
            </div>
            
          </div>
          
          <div className='row'>
            <div className='col-md-7'>
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
              className='col-md-5'
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
    </>
  )

  return (
    <Fragment>
      <PanelLayout
        title='Написать отзыв'
        heading={
          templatesRequestSent
            ? 'Введите номер телефона, или ник исполнителя'
            : 'Кому Вы хотите оставить отзыв?'
        }
      >
        {templatesRequestSent ? <SecondaryStatus /> : <InitialStatus />}
      </PanelLayout>
    </Fragment>
  )
}

Review.propTypes = {
  location: PropTypes.object,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  templates: state.review.review_templates,
  reviews_about_me: state.review.reviews_about_me,
  my_reviews: state.review.my_reviews,
  set_review_success: state.review.set_review_success,
  error: state.review.error,
  categories: state.service.categories,
})

export default connect(mapStateToProps, {
  getReviewTemplates,
  setReview,
  getReviewsAboutMe,
  getMyReviews,
  setComment,
  resetStatus,
  resetReviewError,
  get_all_categories,
})(ReviewContent)
