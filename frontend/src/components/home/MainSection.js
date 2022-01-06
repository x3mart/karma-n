import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import InputMask from 'react-input-mask'
import { useForm, Controller } from 'react-hook-form'
import { searchRequestSuccess } from '../../redux/actions/searchActions'
import { connect } from 'react-redux'
import { getReviewsAboutMe } from '../../redux/actions/reviewActions'
import phone from '../../assets/img/phone.svg'
import insta from '../../assets/img/insta.svg'
import vk from '../../assets/img/vk.svg'

const MainSection = ({ getReviewsAboutMe, searchRequestSuccess }) => {

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  })

  const myRef = useRef()

  const handleClickOutside = e => {
    if (!myRef.current.contains(e.target)) {
      setActive('')
    }
  }

  const [number, setNumber] = useState({})

  const [active, setActive] = useState('')

  const { handleSubmit, control } = useForm()

  const history = useHistory()

  const onSubmit = () => {
    getReviewsAboutMe(number)
    searchRequestSuccess(number)
    history.push('/search')
  }

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
            <div className='main-section-search-block' ref={myRef}>
              <div
                className={`search-block phone d-${
                  active === 'phone' ? 'none' : 'flex'
                }`}
                onClick={() => setActive('phone')}
              >
                <img src={phone} alt='phone' />
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={`d-${active === 'phone' ? 'block' : 'none'}`}
              >
                <Controller
                  control={control}
                  name='number'
                  defaultValue={number}
                  render={({ field }) => (
                    <InputMask
                      type='tel'
                      autoFocus
                      className='search-block-input phone'
                      mask='+7 (999) 999-99-99'
                      placeholder='+7 (___) ___-__-__'
                      onChange={e => field.onChange(setNumber(e.target.value))}
                      
                    />
                  )}
                />
              </form>
              <div
                className={`search-block insta d-${
                  active === 'insta' ? 'none' : 'flex'
                }`}
                onClick={() => setActive('insta')}
              >
                <img src={insta} alt='insta' />
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={`d-${active === 'insta' ? 'block' : 'none'}`}
              >
                <input
                  type='text'
                  autoFocus
                  className='search-block-input insta'
                  placeholder='instagram id:'
                  onChange={e => setNumber(e.target.value)}
                />
              </form>
              <div
                className={`search-block vk d-${
                  active === 'vk' ? 'none' : 'flex'
                }`}
                onClick={() => setActive('vk')}
              >
                <img src={vk} alt='vk' />
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={`d-${active === 'vk' ? 'block' : 'none'}`}
              >
                <input
                  type='text'
                  autoFocus
                  className='search-block-input vk'
                  placeholder='vk id:'
                  onChange={e => setNumber(e.target.value)}
                />
              </form>
              <button className='search-block-button' type='submit'>
                найти отзывы
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  
}

export default connect(null, { getReviewsAboutMe, searchRequestSuccess })(
  MainSection
)
