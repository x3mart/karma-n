import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import InputMask from 'react-input-mask'
import { useForm, Controller } from 'react-hook-form'
import { searchRequestSuccess } from '../../redux/actions/searchActions'
import { getReviewsAboutMe } from '../../redux/actions/reviewActions'
import phone from '../../assets/img/phone.svg'
import insta from '../../assets/img/insta.svg'
import vk from '../../assets/img/vk.svg'
import SearchBlock from '../SearchBlock'

const MainSection = () => {

  
  return (
    <div className='main-section'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='animated main-section-main-text'>
              Поиск отзвывов о физических и юридических лицах по номеру телефона
            </div>
            <div className='animated main-section-sub-text'>
              Начните поиск прямо сейчас:
            </div>
            <SearchBlock buttontexttrue='найти отзывы' size='big' bg='green' />
          </div>
        </div>
      </div>
    </div>
  )

  
}

export default MainSection
