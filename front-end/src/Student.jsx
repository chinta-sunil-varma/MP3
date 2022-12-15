import React from 'react'
import {Box, Typography} from '@mui/material'
import axios from 'axios'

export const Student = () => {
    React.useEffect(()=>
    {
        axios.get('http://localhost:2555/views/section')
        .then((result) => {
            console.log(result.data)
        }).catch((err) => {
            console.log(err)
        });
    },[])
  return (
  
    <Box>
       <Typography variant='h2'>Sections here</Typography>
    </Box>
  )
}
