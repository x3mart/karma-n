import React, { useEffect } from 'react'

import { Link, useHistory } from 'react-router-dom'

const RegisterOk = () => {
  const history = useHistory()

  useEffect(() => {
    const timeout = setTimeout(() => {history.push('/login')}, 10000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div class='reg-status'>
      <h4>Вы успешно зарегистрированы!</h4>
      <h5 className='mt-3'>
        <Link to='/login'>Авторизуйтесь</Link>
      </h5>
    </div>
  )
}

export default RegisterOk
