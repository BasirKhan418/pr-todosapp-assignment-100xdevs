/* eslint-disable react/prop-types */
import React, { useEffect,useState } from 'react'

const RenderTodo = ({clicked}) => {
    const todostyle = {
        tododiv:{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'wheat',
            height: '200px',
            width: '200px',
            fontFamily: 'Arial',
            borderRadius: '10px',
            margin: '10px',
        },
        todoheading:{
            color: 'blue',
        },
        todop:{
            color: 'green',
            backgroundColor: 'lightgreen',
            padding: '5px',
            borderRadius: '5px'
        },
        todocp:{
            color: 'white',
            textDecoration: 'line-through',
            backgroundColor: 'green',
            padding: '5px',
            borderRadius: '5px',
        },
        btn:{
            padding: '10px',
            margin: '10px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: 'blue',
            color: 'white',
            cursor: 'pointer',
        },
        div:{
            display: 'flex',
            flexDirection:"row",
            margin: '10px',
        },
        btnd:{
            padding: '10px',
            margin: '10px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: 'red',
            color: 'white',
            cursor: 'pointer',
        },
        }
    
    const [todos, setTodos] = useState([])
    const renderTodos = async()=>{  
        const res = await fetch('http://localhost:3000/todo',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json();
       setTodos(data.data)
    }
    useEffect(()=>{
renderTodos()
    },[clicked])
   
    const markAsDone = async(id)=>{ 
        const res = await fetch('http://localhost:3000/todo',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:id,status:true})
        })
        const data = await res.json();
        renderTodos()
        if(data.success){
            alert(data.message)
            
        }
        else{
            alert(data.message)
        }
    }
    const deleteTodo = async(id)=>{
        const res = await fetch('http://localhost:3000/todo',{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:id})
        })
        const data = await res.json();
        renderTodos()
        if(data.success){
            alert(data.message)
           
        }
        else{
            alert(data.message)
        }
    }
    
  return (
    <div>
        <h1>Todo List</h1>
        <div style={todostyle.div}>
            {todos.map((todo,index)=>(
                <div key={index} style={todostyle.tododiv}>
                    <h3 style={todostyle.todoheading}>{todo.title}</h3>
                    <p >{todo.description}</p>
                    <p style={!todo.status?todostyle.todop:todostyle.todocp}>{todo.status ? "Completed" : "Pending"}</p>
                   {!todo.status &&<button style={todostyle.btn} onClick={()=>markAsDone(todo._id)}>Mark as done </button>}
                   {todo.status &&<button style={todostyle.btnd} onClick={()=>deleteTodo(todo._id)}>Delete </button>}
                </div>
            ))}
        </div>
    </div>
  )
}

export default RenderTodo
