import React from 'react'
import  {TodoHelper}  from './TodoHelper'
function reducing(state,action)
{
    switch(action.type)
    {
        case 'todo-add':
            return [...state,createTodo(action.payload.value)]

        case 'toggle':
            return state.map((item)=>
            {
                if(item.id===action.id)
                {
                    return {...item,checked:!item.checked}
                }
                return item
            })    
    }

}
function createTodo(value)
{
    return {id:Date.now(),value:value,checked:false}
}
export const Todo = () => {
    const [states,dispatcher]=React.useReducer(reducing,[])
    const [value,setValue]=React.useState('')
    function handleSubmit(e)
    {
        e.preventDefault()
        dispatcher({type:'todo-add',payload:{value:value,checked:false}})
        setValue('')

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type='text' name='text' value={value} onChange={(e)=>{setValue(e.target.value)}} />
            </form>
            {states.map((item)=>
            {
                 
                 

               
             return <TodoHelper value={item.value} 
             id={item.id}
             key={item.id} dispatcher={dispatcher}  checked={item.checked}/>
               
                
            })}
        </>
    )
}
