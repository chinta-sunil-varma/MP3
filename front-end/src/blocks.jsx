import React from 'react'
import { useState , useEffect  } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'

function Blocks() {
    const [blocks , setBlocks] = new useState([]);
    const location = useLocation();
    console.log(location.state);
    const sec = location.state.sec;
    const subject = location.state.subject;
    useEffect(()=>
    {
        axios.get("http://localhost:2555/sections/blocks",{sec:sec , course:subject}
        ,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    .then((res)=>{
            console.log(res.data);
            setBlocks(res.data)
        })
    .catch((err)=>{console.log("error:" , err); })
       
    },[])
    console.log(blocks);

  return (
    <div>blocks</div>
  )
}

export default Blocks