import React, { useState, useEffect } from 'react'
import Rate from 'rc-rate'
import 'rc-rate/assets/index.css'

const ReviewAttribute = ({ data, action }) => {


  const [title, setTitle] = useState('')
  const [titleName, setTitleName] = useState('')
  
  const [value, setValue] = useState('')

  useEffect(() => {
    if (data) {
      setTitle(data.title.id)
      setTitleName(data.title.title)
      
      setValue(data.value)
    }
  }, [data])

  const handleAttributeChange = val => {
      setValue(val)
      const obj = {
        
        title: title,
        value: val,
      }
    action(obj)
  }

  
  return (
    <tr>
      <td
        style={{
          fontSize: 22,
          height: '60px',
          verticalAlign: 'middle',
          paddingRight: '40px',
        }}
      >
        {titleName}
      </td>
      <td style={{ verticalAlign: 'middle', paddingRight: '40px' }}>
        <Rate
          defaultValue={0}
          value={value}
          onChange={handleAttributeChange}
          style={{ fontSize: 30 }}
          //   allowHalf
          character={<i className='fa fa-star'></i>}
        />
      </td>
    </tr>
  )
}

export default ReviewAttribute
