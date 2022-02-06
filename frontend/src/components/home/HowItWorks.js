import React, { Fragment } from 'react'

const HowItWorks = () => {
  return (
    <Fragment>
      <div className='container pb-60'>
        <div className='row'>
          <div className='col-lg-6'>
            <iframe
              width='100%'
              height='100%'
              src='https://www.youtube.com/embed/lL_hQbGOzJg'
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
          <div className='col-lg-6'>
            <h3>
              Вы уверены, что знаете все о людях, которые есть у Вас в
              контактах?
            </h3>
            <p>
              Karma-N - приложение, благодаря которому Вы сможете посмотреть
              отзывы о человеке или компании от реальных людей по номеру
              телефона, выбрать надежного исполнителя услуг. Также Вы сможете
              сами оставить отзыв всем, кто имеет номер телефона, предупредить о
              мошеннике, помочь другим людям определиться и оценить качество
              услуг.
            </p>
            <p>Для этого Вам нужно:</p>
            <ol>
              <li>Быть пользователем приложения Karma-N</li>
              <li>Номер телефона человека или компании.</li>
            </ol>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default HowItWorks
