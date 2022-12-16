import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import BasicCard from './card';
import { useState } from 'react';
import { useEffect } from 'react';
export const Student = () => {
    const navigate =useNavigate();
    //hard coded the section here you change it according to the loggin in student...
    const sec = "IT2";
    const [courses , setCourses] = new useState([])
    useEffect(()=>
    {
        axios.get(`http://localhost:2555/sections/courses/${sec}`)
        .then((result) => {
            console.log(result.data)
           setCourses(result.data); 
        }).catch((err) => {
            console.log(err)
        });
       
    },[])
    // console.log(courses)
    function openChat(){
        navigate('/chat')
    }
    return (
      <Box>
        <Box sx={{ flexGrow: 1 }}>  
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1}}
            >
            <Button color="inherit" onClick={openChat}> <ChatBubbleIcon/> </Button>
            </IconButton>
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box style={{marginTop:'5%',
                  display:'flex',
                  flexWrap:'wrap' , 
                  justifyContent:'space-around'
         }}>
      {courses.map((course)=>{
            //console.log(course.Name);
            return(
            <BasicCard subject={course.Name} sec={course.section} dept={course.dept} />
            )
        })}
      
      </Box>
      </Box>  
    );  
}
