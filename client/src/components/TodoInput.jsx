import React, { useState } from 'react'
import RenderTodo from './RenderTodo'
const TodoInput = () => {
    const [clicked,setClicked] = useState(false)
    const [form,setform] = useState({
        title: '',
        description: '',
        status: false
    })
    const handleChange = (e) => {   
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const style = {
        div:{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'lightblue',
        },
        input:{
            padding: '10px',
            margin: '10px',
            borderRadius: '5px',
            border: 'none',
        },
        button:{
            padding: '10px',
            margin: '10px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: 'blue',
            color: 'white',
            cursor: 'pointer',
        }
    }
    const handleSubmit = async()=>{
        setClicked(!clicked)
        if(!form.title || !form.description){
            alert("Please fill all the fields")
            return;
        }
        const res = await fetch('http://localhost:3000/todo',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        const data = await res.json();
        if(data.success){
            
            alert(data.message)
            setform({
                title: '',
                description: '',
            })
        }
        else{
            alert(data.message)
        }
    }
    
  return (
    <>
    <div style={style.div}>
      <input type="text" placeholder="Enter a todo" value={form.title} onChange={handleChange} style={style.input} name='title'/>
      <input type='text' placeholder="Enter a description" value={form.description} onChange={handleChange} style={style.input} name='description'/>
        <button style={style.button} onClick={handleSubmit}>Submit</button>
    </div>
    <RenderTodo clicked={clicked}/>
    </>
  )
}

export default TodoInput
