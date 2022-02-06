import React, { useState } from 'react'
import Rating from './Rating'

const RatingElement = ({rating} ) => {

    
  const [isOpened, setIsOpened] = useState(false)

  const toggleOpened = () => {
    setIsOpened(!isOpened)
  }
console.log(rating)

  return (
    <div className='rating-wrapper'>
      <div className='rating-overall' onClick={toggleOpened}>
        <Rating ratingValue={rating.value} />
        <div className='rating-value'>{rating.value}</div>
        <i
          className={`fa fa-chevron-${isOpened ? 'up' : 'down'} ml-2`}
          aria-hidden='true'
        />
      </div>
      <div
        className={`rating-specifications-wrapper ${
          isOpened ? 'wrapper-visible' : 'wrapper-hidden'
        }`}
      >
        {rating.arr &&
          rating.arr.map(item => (
            <div className='rating-specifications-row'>
              <div className='rating-specifications-name'>{item.title}</div>
              <div className='rating-specifications-value-wrapper'>
                <div className='rating-specifications-rating'>
                  <Rating ratingValue={item.value} />
                </div>
                <div className='rating-specifications-value'>{item.value}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default RatingElement
