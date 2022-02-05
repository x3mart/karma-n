import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Rate from 'rc-rate'
import 'rc-rate/assets/index.css'

import ReviewAttribute from './ReviewAttribute'

let appElement = document.getElementById('root')

Modal.setAppElement(appElement)

const Review = ({
  template,
  data,
  action,
  proper_phone,
  text_action,
  attributes_action,
  review_action,
  success,
  error,
  template_reset,
}) => {
  const [active, setActive] = useState(false)
  const [attributes, setAttributes] = useState([])
  const [attributesList, setAttributesList] = useState([])
  const [modalIsOpen, setIsOpen] = useState(false)
  const [background, setBackground] = useState('rgba(0, 0, 0, 0.05)')
  const [title, setTitle] = useState('')

  const [reviewText, setReviewText] = useState('')

  useEffect(() => {
    if (template) {
      if (data && data.rating) {
        if (data && data.rating <= 2) {
          setBackground('rgba(205, 5, 5, 0.3)')
        } else if (data && data.rating > 2 && data.rating < 4) {
          setBackground('rgba(238, 221, 68, 0.4)')
        } else if (data && data.rating >= 4) {
          setBackground('rgba(68, 238, 149, 0.4)')
        }
      } else {
        setBackground('#cfe2ff')
      }
      if (data && data.body) {
        setTitle(data.body)
        setReviewText(data.body)
      }
      if (data && data.attributes) {
        setAttributes(data.attributes)
        active &&
          setAttributesList(
            data.attributes.map(item => ({
              title: item.title.id,
              value: item.value,
            }))
          )
      }
    } else {
      setTitle('Оставьте свой комментарий')
      if (data && data.attributes) {
        setAttributes(
          data.attributes.map(item => ({
            title: { id: item.title.id, title: item.title.title },
            value: 0,
          }))
        )
        active &&
          setAttributesList(
            data.attributes.map(item => ({
              title: item.title.id,
              value: 0,
            }))
          )
      }
    }
  }, [data, active])

  const openModal = () => {
    text_action(reviewText)
    setActive(true)
    setIsOpen(true)
  }

  const closeModal = () => {
    setActive(false)
    setIsOpen(false)
  }

  const handleReviewText = e => {
    setReviewText(e.target.value)
    text_action(e.target.value)
  }

  const handleSuccessClose = () => {
    closeModal()
    template_reset()
  }

  const handleModalOpenButton = () => {
    action(true)
    proper_phone && openModal()
  }

  const handleAttributeUpdate = obj => {
    if (attributesList.length > 0) {
      let arr = attributesList.filter(item => item.title !== obj.title)
      arr.push(obj)
      setAttributesList(arr)
    } else {
      setAttributesList([obj])
    }
  }

  useEffect(() => {
    if (attributesList.length > 0) {
      attributes_action(attributesList)
    }
  }, [attributesList])

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        contentLabel='onRequestClose Example'
        onRequestClose={closeModal}
        className='Modal'
        overlayClassName='Overlay'
      >
        {success === 201 ? (
          <div
            className='w-100 d-flex align-items-center justify-content-center text-success flex-column'
            style={{ minHeight: 200 }}
          >
            <h2 className='mb-5'>Ваш отзыв успешно добавлен!</h2>
            <button
              className='btn btn-review mt-5'
              onClick={handleSuccessClose}
            >
              Закрыть
            </button>
          </div>
        ) : error ? (
          <div
            className='w-100 d-flex align-items-center justify-content-center text-success flex-column'
            style={{ minHeight: 200 }}
          >
            <h2 className='mb-5'>{error}</h2>
            <button className='btn btn-review mt-5' onClick={closeModal}>
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <form>
              <input
                placeholder='Напишите свой комментарий'
                rows='2'
                className='form-control phone-input phone-input-small'
                // onFocus={() => setActiveReview(null)}
                onChange={handleReviewText}
                value={reviewText}
              />
            </form>
            <table>
              <tbody>
                {attributes.map(item => (
                  <ReviewAttribute
                    key={item.title.id}
                    data={item}
                    action={handleAttributeUpdate}
                  />
                ))}
              </tbody>
            </table>

            <div className='d-flex justify-content-between mt-30'>
              <div>
                <button
                  className='btn btn-review pull-right'
                  onClick={review_action}
                >
                  Отправить
                </button>
              </div>
            </div>
          </>
        )}
      </Modal>

      <div
        className={`quick-review-wrap w-100 ${
          active ? 'quick-review-border-active' : 'quick-review-border'
        }`}
        style={{
          backgroundColor: background,
          border: `2px solid ${background}`,
        }}
        onClick={handleModalOpenButton}
      >
        <div className='quick-review'>{title}</div>
      </div>
    </>
  )
}

export default Review
