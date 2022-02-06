import PropTypes from "prop-types";
import React, {Fragment, useEffect, useState} from "react";
import MetaTags from "react-meta-tags";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import MainLayout from "../../layouts/MainLayout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import user_svg from "../../assets/user.svg"

import InputMask from "react-input-mask";
import {useForm, Controller} from "react-hook-form";
import {
  getReviewTemplates,
  setReview,
  getReviewsAboutMe,
  getMyReviews,
  setComment
} from "../../redux/actions/reviewActions";
import {isNotEmptyObject} from "../../functions";
import Row from "react-bootstrap/Row";
import Rating from "../../components/Rating";

const MyAccount = ({
                     location,
                     match,
                     isAuthenticated,
                     user,
                     review_templates,
                     getReviewTemplates,
                     setReview,
                     getReviewsAboutMe,
                     getMyReviews,
                     reviews_about_me,
                     my_reviews,
                     setComment
                   }) => {

  const {pathname} = location;

  const cat = match.params.cat;

  const [activePhone, setActivePhone] = useState({})

  const [modal, setModal] = useState(false);
  const handleToggleModal = () => setModal(!modal)


  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);


  const [active, setActive] = useState('')
  const [phone, setPhone] = useState('')
  const [activeReview, setActiveReview] = useState(null)
  const [rating, setRating] = useState(null)
  const [reviewText, setReviewText] = useState('')
  const [reviewCommentText, setReviewCommentText] = useState('')
  const [reviewFull, setReviewFull] = useState({
    phone_number: '',
    rating: null,
    body: ''
  })

  const {control} = useForm();

  const handleReviewComment = (id) => {
    setComment(id, reviewText)
  }

  useEffect(() => {
    setActive(cat)
    if (cat === 'profile') {
      if (isNotEmptyObject(user)) {
        setActivePhone(user.phones[0])
        getReviewsAboutMe(user.phone)
        getMyReviews(user.id)
      }
    }
    if (cat === 'review') {
      getReviewTemplates()
    }
  }, [cat, user])


  if (!isAuthenticated) {
    return <Redirect to='/login'/>
  }

  const handleQuickReview = (id, text) => {
    setActiveReview(id === activeReview ? null : id)
    setReviewText(text)
    setReviewFull({
      ...reviewFull,
      body: text
    })
  }

  const handlePhone = phone => {
    setPhone(phone)
    setReviewFull({
      ...reviewFull,
      phone_number: phone
    })
  }

  const handleRating = value => {
    setReviewFull({
      ...reviewFull,
      rating: value
    })
  }

  const handleCustomReview = value => {
    setActiveReview(null)
    setReviewFull({
      ...reviewFull,
      body: value
    })
  }

  const handleReview = () => {
    setReviewFull({
      ...reviewFull,
      phone_number: phone,
      rating: rating,
      body: reviewText
    })
    setReview(reviewFull)
  }

  const handlePhoneOption = (str) => {
    setActivePhone(user.phones.map((item) => {
      if (item.phone_number === str) {
        return item
      }
    }))
  }

  // const handleMyRating = (num) => {
  //   if (num >= 1 && num < 1.5) {
  //     return (
  //       <div className="stars">
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star-o" aria-hidden="true"/>
  //         <i className="fa fa-star-o" aria-hidden="true"/>
  //         <i className="fa fa-star-o" aria-hidden="true"/>
  //         <i className="fa fa-star-o" aria-hidden="true"/>
  //       </div>
  //     )
  //   } else if (num >= 1.5 && num < 2) {
  //     return (
  //       <div className="stars">
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star-half-o" aria-hidden="true"/>
  //         <i className="fa fa-star-o" aria-hidden="true"/>
  //         <i className="fa fa-star-o" aria-hidden="true"/>
  //         <i className="fa fa-star-o" aria-hidden="true"/>
  //       </div>
  //     )
  //   } else if (num >= 2 && num < 2.5) {
  //     return (
  //       <div className="stars">
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star-o" aria-hidden="true"/>
  //         <i className="fa fa-star-o" aria-hidden="true"/>
  //         <i className="fa fa-star-o" aria-hidden="true"/>
  //       </div>
  //     )
  //   } else if (num >= 2.5 && num < 3) {
  //     return (
  //       <div className="stars">
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star-half-o" aria-hidden="true"/>
  //         <i className="fa fa-star-o" aria-hidden="true"/>
  //         <i className="fa fa-star-o" aria-hidden="true"/>
  //       </div>
  //     )
  //   } else if (num >= 3 && num < 3.5) {
  //     return (
  //       <div className="stars">
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star-o" aria-hidden="true"/>
  //         <i className="fa fa-star-o" aria-hidden="true"/>
  //       </div>
  //     )
  //   } else if (num >= 3.5 && num < 4) {
  //     return (
  //       <div className="stars">
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star-half-o" aria-hidden="true"/>
  //         <i className="fa fa-star-o" aria-hidden="true"/>
  //       </div>
  //     )
  //   } else if (num >= 4 && num < 4.5) {
  //     return (
  //       <div className="stars">
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star-o" aria-hidden="true"/>
  //       </div>
  //     )
  //   } else if (num >= 4.5 && num < 5) {
  //     return (
  //       <div className="stars">
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star-half-o" aria-hidden="true"/>
  //       </div>
  //     )
  //   } else if (num == 5) {
  //     return (
  //       <div className="stars">
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star" aria-hidden="true"/>
  //         <i className="fa fa-star" aria-hidden="true"/>
  //       </div>
  //     )
  //   } else {
  //     return (
  //       <div className="stars">
  //         <i className="fa fa-star-o" aria-hidden="true"/>
  //         <i className="fa fa-star-o" aria-hidden="true"/>
  //         <i className="fa fa-star-o" aria-hidden="true"/>
  //         <i className="fa fa-star-o" aria-hidden="true"/>
  //         <i className="fa fa-star-o" aria-hidden="true"/>
  //       </div>
  //     )
  //   }
  // }

  return (
    <Fragment>
      <MetaTags>
        {/*<link href="https://netdna.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet"/>*/}
        {/*<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>*/}
        <title>КармаН | Моя страница</title>
        <meta name='description' content='Моя страница' />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>
        Главная
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Моя страница
      </BreadcrumbsItem>
      <MainLayout headerTop='visible'>
        {/* breadcrumb */}
        <Breadcrumb />

        <Modal show={modal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {user && (
          <div className='container bootstrap snippets bootdey'>
            <div className='row'>
              <div className='profile-nav col-md-3'>
                <div className='panel'>
                  <div className='user-heading round'>
                    <a href='' style={{ pointerEvents: 'none' }}>
                      {user.avatar ? (
                        user.avatar
                      ) : (
                        <img src={user_svg} alt='user' />
                      )}
                    </a>
                    <h1>{user.name ? user.name : user.user_name}</h1>
                    <p className='text-white'>{user.email}</p>
                  </div>

                  <ul className='nav nav-pills nav-stacked'>
                    <li className={active === 'profile' ? 'active' : ''}>
                      <Link to='/my-account/profile'>
                        {' '}
                        <i className='fa fa-user' /> Профиль
                      </Link>
                    </li>
                    <li className={active === 'edit' ? 'active' : ''}>
                      <Link to='/my-account/edit'>
                        {' '}
                        <i className='fa fa-edit' /> Редактировать профиль
                      </Link>
                    </li>
                    <li className={active === 'review' ? 'active' : ''}>
                      <Link to='/my-account/review'>
                        {' '}
                        <i className='fa fa-comment' /> Добавить отзыв
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='profile-info col-md-9'>
                {cat === 'profile' && (
                  <Fragment>
                    <div className='panel'>
                      <div className='bio-graph-heading'>Моя страница</div>
                      <div className='panel-body bio-graph-info'>
                        <h1>Личная информация</h1>
                        <Row>
                          <div className='bio-row'>
                            {user.full_name && (
                              <div className='bio'>
                                <p>
                                  <span>Имя </span>: {user.full_name}
                                </p>
                              </div>
                            )}
                            <div className='bio'>
                              <p>
                                <span>Имя пользователя </span>: {user.name}
                              </p>
                            </div>
                            <div className='bio'>
                              <p>
                                <span>Город </span>: {user.city}
                              </p>
                            </div>
                            <div className='bio'>
                              <p>
                                <span>Дата рождения</span>: {user.birthday}
                              </p>
                            </div>
                            <div className='bio'>
                              <p>
                                <span>Email </span>: {user.email}
                              </p>
                            </div>
                            <div className='bio'>
                              <p>
                                <span>Основной телефон </span>: {user.phone}
                              </p>
                            </div>
                          </div>
                          <div className='bio-row'>
                            <p>
                              <span>Дополнительные телефоны </span>:
                            </p>
                            {user.phones &&
                              user.phones.map((item, id) => (
                                <p key={id}>
                                  <span> </span>: {item.phone}
                                </p>
                              ))}
                          </div>
                        </Row>
                      </div>
                    </div>

                    {user.phones.length > 1 && (
                      <Fragment>
                        <label htmlFor='state' className='form-label'>
                          Номер телефона
                        </label>
                        <select
                          className='form-select'
                          id='user-phone-number'
                          required=''
                        >
                          {user.phones.map(item => (
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
                    )}
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
                        {user.phones.map(item => (
                          <option key={item.id} value={item.phone_number}>
                            {item.phone_number}
                          </option>
                        ))}
                        <option value='+79670200050'>+79670200050</option>
                      </select>
                    </div>

                    {isNotEmptyObject(activePhone) && (
                      <Fragment>
                        <div>
                          <div className='row'>
                            <div className='col-md-4'>
                              <div className='panel mb-4'>
                                <div className='panel-body bio-graph-info'>
                                  <h1 className='red'>Отзывов обо мне</h1>
                                  <h2>{activePhone.count_reviews}</h2>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-4'>
                              <div className='panel mb-4'>
                                <div className='panel-body bio-graph-info'>
                                  <h1 className='red'>Моих отзывов</h1>
                                  {isNotEmptyObject(my_reviews) && (
                                    <h2>{my_reviews.count}</h2>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className='col-md-4'>
                              <div className='panel mb-4'>
                                <div className='panel-body bio-graph-info'>
                                  <h1 className='red'>Мой рейтинг</h1>
                                  <div className='my-rating'>
                                    <Rating
                                      ratingValue={activePhone.rating_avg.toFixed(
                                        1
                                      )}
                                    />
                                    <h2>{activePhone.rating_avg.toFixed(1)}</h2>
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
                          reviews_about_me.results.map(item => {
                            if (
                              item.phone_number === activePhone.phone_number
                            ) {
                              return (
                                <div className='reviews-about-me-wrapper'>
                                  <div className='reviews-about-me-photo'>
                                    <img
                                      src={
                                        item.owner.avatar
                                          ? item.owner.avatar
                                          : user_svg
                                      }
                                      alt=''
                                    />
                                  </div>
                                  <div className='reviews-about-me-body'>
                                    <div className='reviews-about-me-head'>
                                      <div className='reviews-about-me-name'>
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
                                      <div className='reviews-about-me-complain'>
                                        <button className='btn btn-outline-danger'>
                                          Пожаловаться
                                        </button>
                                      </div>
                                    </div>
                                    <div className='reviews-about-me-text'>
                                      {item.body}
                                    </div>

                                    <div className='reviews-about-me-buttons'>
                                      <div className='like-buttons'>
                                        <div
                                          className={`like-up ${
                                            item.count_likes > 0
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
                                            item.count_likes < 0
                                              ? 'text-danger'
                                              : ''
                                          }`}
                                        >
                                          <i
                                            className='fa fa-thumbs-down'
                                            aria-hidden='true'
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <form>
                                        <textarea
                                          placeholder='Напишите свой ответ'
                                          rows='2'
                                          className='form-control input-lg text-left'
                                          onFocus={() => setActiveReview(null)}
                                          onChange={e =>
                                            setReviewCommentText(e.target.value)
                                          }
                                        />
                                      </form>
                                      <div className='comment-button mt-4'>
                                        <button
                                          onClick={() => handleReviewComment()}
                                          className='btn btn-outline-secondary'
                                        >
                                          Опубликовать
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                  {item.comments.length > 0 &&
                                    item.comments.map(comment => (
                                      <div className='reviews-about-me-comments'>
                                        <div className='reviews-about-me-photo'></div>
                                        <div className='reviews-about-me-body'>
                                          <div className='reviews-about-me-name'></div>
                                          <div className='reviews-about-me-body'></div>
                                          <div className='reviews-about-me-rating'></div>
                                          <div className='reviews-about-me-buttons'></div>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              )
                            }
                          })}
                      </div>
                    </div>
                  </Fragment>
                )}
                {cat === 'edit' && (
                  <Fragment>
                    <div className='panel'>
                      <div className='bio-graph-heading'>
                        Редактирование моей страницы
                      </div>
                    </div>
                  </Fragment>
                )}
                {cat === 'review' && (
                  <Fragment>
                    <div className='panel'>
                      <div className='bio-graph-heading'>Написать отзыв</div>
                      <div className='panel-body bio-graph-info'>
                        {/*<h1>Введите номер телефона и оставьте отзыв</h1>*/}

                        <Controller
                          control={control}
                          name='phone'
                          defaultValue={phone}
                          render={({ field }) => (
                            <InputMask
                              type='tel'
                              className='phone-input phone-input-small'
                              mask='+7 (999) 999-99-99'
                              placeholder='Введите номер телефона: +7 (901) 234-56-78'
                              value={phone}
                              onChange={e =>
                                field.onChange(handlePhone(e.target.value))
                              }
                            />
                          )}
                        />

                        {isNotEmptyObject(review_templates) &&
                          review_templates.templates.results.map(item => (
                            <div
                              key={item.id}
                              className={`quick-review-wrap ${
                                activeReview === item.id
                                  ? 'quick-review-border-active'
                                  : 'quick-review-border'
                              }`}
                              onClick={() =>
                                handleQuickReview(item.id, item.body)
                              }
                            >
                              <div className='quick-review'>{item.body}</div>
                            </div>
                          ))}
                        <form>
                          <textarea
                            placeholder='Напишите свой комментарий'
                            rows='2'
                            className='form-control input-lg'
                            onFocus={() => setActiveReview(null)}
                            onChange={e => handleCustomReview(e.target.value)}
                          />
                        </form>

                        <div className='d-flex justify-content-between mt-30'>
                          <div className='star-rating'>
                            <div className='star-rating__wrap'>
                              <input
                                className='star-rating__input'
                                id='star-rating-5'
                                type='radio'
                                name='rating'
                                value='5'
                                onChange={e => handleRating(e.target.value)}
                              />
                              <label
                                className='star-rating__ico fa fa-star-o fa-lg'
                                htmlFor='star-rating-5'
                                title='5 out of 5 stars'
                              />
                              <input
                                className='star-rating__input'
                                id='star-rating-4'
                                type='radio'
                                name='rating'
                                value='4'
                                onChange={e => handleRating(e.target.value)}
                              />
                              <label
                                className='star-rating__ico fa fa-star-o fa-lg'
                                htmlFor='star-rating-4'
                                title='4 out of 5 stars'
                              />
                              <input
                                className='star-rating__input'
                                id='star-rating-3'
                                type='radio'
                                name='rating'
                                value='3'
                                onChange={e => handleRating(e.target.value)}
                              />
                              <label
                                className='star-rating__ico fa fa-star-o fa-lg'
                                htmlFor='star-rating-3'
                                title='3 out of 5 stars'
                              />
                              <input
                                className='star-rating__input'
                                id='star-rating-2'
                                type='radio'
                                name='rating'
                                value='2'
                                onChange={e => handleRating(e.target.value)}
                              />
                              <label
                                className='star-rating__ico fa fa-star-o fa-lg'
                                htmlFor='star-rating-2'
                                title='2 out of 5 stars'
                              />
                              <input
                                className='star-rating__input'
                                id='star-rating-1'
                                type='radio'
                                name='rating'
                                value='1'
                                onChange={e => handleRating(e.target.value)}
                              />
                              <label
                                className='star-rating__ico fa fa-star-o fa-lg'
                                htmlFor='star-rating-1'
                                title='1 out of 5 stars'
                              />
                            </div>
                          </div>
                          <div>
                            <button
                              className='btn btn-review pull-right'
                              onClick={() => handleReview()}
                            >
                              Отправить
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        )}
      </MainLayout>
    </Fragment>
  )
};

MyAccount.propTypes = {
  location: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  review_templates: state.review.review_templates,
  reviews_about_me: state.review.reviews_about_me,
  my_reviews: state.review.my_reviews
})

export default connect(mapStateToProps, {
  getReviewTemplates,
  setReview,
  getReviewsAboutMe,
  getMyReviews,
  setComment
})(MyAccount);
