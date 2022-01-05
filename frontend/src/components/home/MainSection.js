import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import InputMask from 'react-input-mask'
import { useForm, Controller } from 'react-hook-form'
import { searchRequestSuccess } from '../../redux/actions/searchActions'
import { connect } from 'react-redux'
import { getReviewsAboutMe } from '../../redux/actions/reviewActions'

const MainSection = ({ getReviewsAboutMe, searchRequestSuccess }) => {
  const [number, setNumber] = useState({})

  const { handleSubmit, control } = useForm()

  const history = useHistory()

  const onSubmit = () => {
    getReviewsAboutMe(number)
    searchRequestSuccess(number)
    history.push('/search')
  }

  return (
    <div className='slider-area pb-100'>
      <div className='slider-active nav-style-1'>
        <div
          className='d-none single-slider-2 slider-height-2 d-lg-flex align-items-center bg-img'
          style={{
            backgroundImage: `url(${
              process.env.PUBLIC_URL + '/assets/img/slider/karman.jpg'
            })`,
          }}
        >
          <div className='container'>
            <div className='row'>
              <div className='col-xl-6 col-lg-7 col-md-8 col-12 mr-auto'>
                <div className='slider-content-3 slider-animated-1 text-center'>
                  {/*<h3 className="animated d-none d-lg-inline-block">{data.title}</h3>*/}
                  <h3 className='animated d-inline-block d-lg-none'>
                    <img
                      src='/assets/img/logo/logo-karman.png'
                      alt=''
                      width='80px'
                    />
                  </h3>
                  <h1 className='animated d-inline-block d-lg-none'>карман</h1>
                  <h2 className='animated d-none d-lg-inline-block'>
                    Поиск отзывов о человеке, или компании по номеру телефона
                    <br />
                    Введите номер и начните поиск прямо сейчас:
                  </h2>
                  <p className='animated d-inline-block d-lg-none'>
                    Поиск отзывов о человеке, или компании по номеру телефона
                    <br />
                    Введите номер и начните поиск прямо сейчас:
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                      control={control}
                      name='number'
                      defaultValue={number}
                      render={({ field }) => (
                        <InputMask
                          type='tel'
                          autoFocus
                          className='phone-input phone-input-big'
                          mask='+7 (999) 999-99-99'
                          placeholder='+7 (999) 999-99-99'
                          onChange={e =>
                            field.onChange(setNumber(e.target.value))
                          }
                          // onChange={(e) => field.onChange(setNumber(e.target.value.replace(/\D/g,'')))}
                          // value={transform.input(field.value)}
                        />
                      )}
                    />
                    <div className='slider-btn btn-hover'>
                      <button className='phone-input-button' type='submit'>
                        ПОИСК
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`d-flex d-lg-none align-items-center bg-img py-5`}
          style={{ backgroundColor: '#d7f7f6' }}
        >
          <div className='container'>
            <div className='row'>
              <div className='col-xl-6 col-lg-7 col-md-8 col-12 mr-auto'>
                <div className='text-center'>
                  <h3 className='animated d-none d-lg-inline-block'>карман</h3>
                  <h3 className='animated d-inline-block d-lg-none'>
                    <img
                      src='/assets/img/logo/logo-karman.png'
                      alt=''
                      width='80px'
                    />
                  </h3>
                  <h1 className='animated'>карман</h1>
                  <h4 className='animated'>
                    Поиск отзывов о человеке, или компании по номеру телефона
                    <br />
                    Введите номер и начните поиск прямо сейчас:
                  </h4>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                      control={control}
                      name='number'
                      defaultValue={number}
                      render={({ field }) => (
                        <InputMask
                          type='tel'
                          autoFocus
                          className='phone-input'
                          mask='+7 (999) 999-99-99'
                          placeholder='+7 (999) 999-99-99'
                          onChange={e =>
                            field.onChange(setNumber(e.target.value))
                          }
                          // value={transform.input(field.value)}
                        />
                      )}
                    />
                    <div className='slider-btn btn-hover'>
                      <button className='phone-input-button' type='submit'>
                        ПОИСК
                      </button>
                    </div>
                  </form>
                </div>
              </div>
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
