import React from 'react';

const MainFeatures = () => {
    return (
      <div className='support-area pt-60 pb-60'>
        <div className='container'>
          <div className='row feature-icon-two-wrap'>
            <div className='col-md-4'>
              <div className='support-wrap-2 support-shape mb-30 text-center'>
                <div className='support-content-2'>
                  <i className='fa fa-star-o fa-3x'></i>
                  <h5>Управляйте своим рейтингом</h5>
                  <p>
                    В приложении действует рейтинговая система, благодаря
                    которой вы сможете увидеть свой рейтинг и рейтинг других
                    людей.
                  </p>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className={`support-wrap-2 support-shape mb-30 text-center`}>
                <div className='support-content-2'>
                  <i className='fa fa-commenting-o fa-3x'></i>
                  <h5>Оставляйте отзывы</h5>
                  <p>
                    Вы сможете отблагодарить друга за помощь или человека, к
                    которому Вы обращаетесь за услугами, оставив соответствующий
                    отзыв и оценку.
                  </p>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className={`support-wrap-2 support-shape mb-30 text-center`}>
                <div className='support-content-2'>
                  <i className='fa fa-reply fa-3x'></i>
                  <h5>Отвечайте на отзывы</h5>
                  <p>
                    В приложении вы можете не только получать или оставлять
                    отзывы, но и отвечать на них!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default MainFeatures
