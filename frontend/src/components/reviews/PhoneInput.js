import React, { Fragment, useEffect, useState } from 'react'

import InputMask from 'react-input-mask'
import { useForm, Controller } from 'react-hook-form'

const PhoneInput = ({
  review_clicked,
  proper_phone,
  phoneAction,
  phone_number,
}) => {
  const regex =
    /^(\+7)?[\s]?\(?[0-9]{3}\)?[\s]?[0-9]{3}[\-]?[0-9]{2}[\-]?[0-9]{2}$/

  const [phone, setPhone] = useState('')
  const [properPhone, setProperPhone] = useState(false)

  const [inputClass, setInputClass] = useState('')

  const { control } = useForm()

  const handlePhone = n => {
    setPhone(n)
  }

  useEffect(() => {
    if(phone_number) {
      setPhone(phone_number)
    }
  }, [phone_number])

  useEffect(() => {
    setProperPhone(regex.test(phone))
    proper_phone(regex.test(phone))
  }, [phone])

  useEffect(() => {
    if (properPhone) {
      phoneAction(phone)
      setInputClass('input-success')
    } else {
      review_clicked && setInputClass('input-danger')
    }
  }, [properPhone, review_clicked])

  return (
    <Fragment>
      <Controller
        control={control}
        name='phone'
        defaultValue={phone}
        render={({ field }) => (
          <InputMask
            type='tel'
            className={`phone-input phone-input-small ${inputClass}`}
            mask='+7 (999) 999-99-99'
            placeholder='Введите номер телефона: +7 (901) 234-56-78'
            value={phone}
            onChange={e => field.onChange(handlePhone(e.target.value))}
          />
        )}
      />
    </Fragment>
  )
}

export default PhoneInput
