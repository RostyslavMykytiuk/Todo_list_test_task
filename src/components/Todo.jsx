import React, { useEffect, useState } from 'react'


export const Todo = (props) => {
  const [status,setStatus] = useState(props.status)
  

  const toggleStatus = (e) => {
    e.nativeEvent.stopImmediatePropagation()
    e.preventDefault()
    setStatus(!status)
    props.callback(props.id)
    const newPopUpContent = {
      id:props.id,
      title:props.title,
      description:props.description,
      status:status
    }
    setPopUpContent()
  }

  const setPopUpContent = () => {
    const popUpContent = {
      id:props.id,
      title:props.title,
      description:props.description,
      status:status
    }
    props.changePopUpCallback(popUpContent)
  }

  return (
    <>
        <div className='resp_table_row' onClick={()=> setPopUpContent(props)}>
            <div className='resp_body_cell'>{props.id}</div>
            <div className='resp_body_cell'>{props.title}</div>
            <div className='resp_body_cell'>{props.description}</div>
            <div className='resp_body_cell'><input type="checkbox" value={status} name="todo_checkbox"  onChange={(e) => toggleStatus(e)} /></div>           
        </div>
        <br />
    </>
  )
}
