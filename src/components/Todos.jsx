import React, { useEffect, useState } from 'react'
import { Todo } from './Todo'
import { useForm } from "react-hook-form"
import "./Todos.css"



export const Todos = () => {

  const [todos,setTodos] = useState([])

  const changeTodo = (id) => {
    todos[id-1].status = !todos[id-1].status
    setTodos([...todos])
  }

  const [popups,setPopUps] = useState([])

  const changePopUpContent = (todo) =>{
    const newPopUpContent = [
        {
            id : todo.id,
            title: todo.title,
            description: todo.description,
            status : todo.status
        }
    ]
    setPopUps(newPopUpContent)
    setPopUpToggle(true)
  }

  const [popupToggle,setPopUpToggle] = useState(false)

  
  const {
    register,
    handleSubmit,
    formState:{errors},
    reset
  } = useForm({
    mode:"onBlur"
  })
  


  const onTodoSubmit = (data) => {
    setTodos([...todos,data])
    reset()
  }

  const isEmpty = value => value.trim() !== ''


  return (
    <div className="todos_container">
        <div className="todo_form">
            <form onSubmit={handleSubmit(onTodoSubmit)} >
                <table className='form_table'>
                    <tbody>
                        <tr>
                            <td><label htmlFor="title">Title :</label></td>
                            <td><label htmlFor="description">Description :</label></td>
                        </tr>
                        <tr>
                            <td><input 
                                    {...register("title",{ 
                                        required:true ,
                                        validate:isEmpty
                                    })} 
                                    type="text" 
                                    name="title"
                                    placeholder='Enter Title'
                                    className={errors?.title ? 'field_invalid' :''}
                                >
                                </input></td>
                            <td>
                                <input 
                                    {...register("description",{
                                        required:true,
                                        validate:isEmpty
                                    })}
                                    type="text" 
                                    name="description"
                                    placeholder='Enter Description'
                                    className={errors?.description ? 'field_invalid' :''}
                                >
                                </input>
                            </td>
                            <td>
                                <button type="submit" name="submit">Create</button>
                            </td>
                        </tr>
                        <tr>
                            <td>{errors?.title && <small style={{color:"red"}}>This field is empty</small>}</td>
                            <td>{errors?.description && <small style={{color:"red"}}>This field is empty</small>}</td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
        <div className="todos_list">
            <div id='resp_table'>
                <div id='resp_table_header'>
                    <div className="resp_header_cell">ID</div>
                    <div className="resp_header_cell">TITLE</div>
                    <div className="resp_header_cell">DESCRIPTION</div>
                    <div className="resp_header_cell">STATUS</div>
                </div>
                <br></br>
                <br></br>
                <div id="resp_table_body">
                    {
                        todos.map((todo,_index) => {
                            return <Todo 
                                key={_index+1}
                                id={_index+1}
                                title={todo.title}
                                description={todo.description}
                                status={false}
                                callback={changeTodo}
                                changePopUpCallback={changePopUpContent}
                            />
                        })
                    }
                </div>
            </div>
        </div>
        {popupToggle&&<div className="popups_container">
            <div className="popups_body">
                <div className="popups_content">
                    {
                        popups.map((popup)=>{
                            return (
                                <div key={Math.random()*10000}>
                                    <h1 align="center">{popup.title}</h1>
                                    <h3>description:</h3>
                                    <p className='popup_description'> {popup.description}</p>
                                    <p>Status: <input type="checkbox" name="popup_status" readOnly  checked={popup.status} id="" /></p>
                                    <div align="center">
                                        <button onClick={() => setPopUpToggle(false)}>Close</button>
                                    </div>
                                </div>
                                
                            )
                        })
                    }
                </div>                
            </div>
        </div>}

    </div>
  )
}
