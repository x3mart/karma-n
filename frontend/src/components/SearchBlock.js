import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import InputMask from 'react-input-mask'
import { useForm, Controller } from 'react-hook-form'
import { searchRequestSuccess } from '../redux/actions/searchActions'
import { getReviewsAboutMe } from '../redux/actions/reviewActions'
import phone from '../assets/img/phone.svg'
import insta from '../assets/img/insta.svg'
import vk from '../assets/img/vk.svg'
import { connect } from 'react-redux'

const SearchBlock = ({ action, buttontexttrue, buttontextfalse, size }) => {
  const regex =
    /^(\+7)?[\s]?\(?[0-9]{3}\)?[\s]?[0-9]{3}[\-]?[0-9]{2}[\-]?[0-9]{2}$/

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  })

  const myRef = useRef()

  const handleClickOutside = e => {
    if (!myRef.current.contains(e.target)) {
      setActive('')
      setData('')
      setValid(false)
    }
  }

  const [data, setData] = useState('')

  const [active, setActive] = useState('')

  const [valid, setValid] = useState(false)

  const { handleSubmit, control } = useForm()

  const history = useHistory()

  const onSubmit = () => {
    action(data)
  }

  const handleClick = value => {
    setValid(false)
    setData('')
    setActive(value)
  }

  useEffect(() => {
    if (active === 'phone') {
      setValid(regex.test(data))
    } else if (active === 'insta') {
      setValid(data.length > 1)
    } else if (active === 'vk') {
      setValid(data.length > 1)
    }
  }, [data])

  //   const onSubmit = () => {
  //     getReviewsAboutMe(number)
  //     searchRequestSuccess(number)
  //     history.push('/search')
  //   }

  return (
    <div className={`main-section-search-block ${size}`} ref={myRef}>
      <div
        className={`search-block phone d-${
          active === 'phone' ? 'none' : 'flex'
        }`}
        onClick={() => handleClick('phone')}
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
          defaultValue={data}
          render={({ field }) => (
            <InputMask
              value={data}
              type='tel'
              autoFocus
              className='search-block-input phone'
              mask='+7 (999) 999-99-99'
              placeholder='+7 (___) ___-__-__'
              onChange={e => field.onChange(setData(e.target.value))}
            />
          )}
        />
      </form>
      <div
        className={`search-block insta d-${
          active === 'insta' ? 'none' : 'flex'
        }`}
        onClick={() => handleClick('insta')}
      >
        <img src={insta} alt='insta' />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`d-${active === 'insta' ? 'block' : 'none'}`}
      >
        <input
          value={data}
          type='text'
          autoFocus
          className='search-block-input insta'
          placeholder='instagram id:'
          onChange={e => setData(e.target.value)}
        />
      </form>
      <div
        className={`search-block vk d-${active === 'vk' ? 'none' : 'flex'}`}
        onClick={() => handleClick('vk')}
      >
        <img src={vk} alt='vk' />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`d-${active === 'vk' ? 'block' : 'none'}`}
      >
        <input
          value={data}
          type='text'
          autoFocus
          className='search-block-input vk'
          placeholder='vk id:'
          onChange={e => setData(e.target.value)}
        />
      </form>
      <button
        disabled={!valid}
        className={`search-block-button`}
        type='submit'
        onClick={onSubmit}
      >
        {valid
          ? buttontexttrue
          : buttontextfalse
          ? buttontextfalse
          : buttontexttrue}
      </button>
    </div>
  )
}

export default connect(null, { getReviewsAboutMe, searchRequestSuccess })(
  SearchBlock
)
