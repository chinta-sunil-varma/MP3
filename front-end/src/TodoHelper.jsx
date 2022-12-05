import React from 'react'

export const TodoHelper = (props) => {
  return (
    <>
      <p style={{color:props.checked?'red':'white'}}>
      {props.value}
      </p>
      <button onClick={()=>{props.dispatcher({type:'toggle',id:props.id})}}>Toggle</button>
    </>
  )
}
