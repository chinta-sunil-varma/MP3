import { Typography,Card,
    CardMedia,CardContent,CardActions,Button } from '@mui/material'
import React from 'react'
import file from './media/file.jpg'
import axios from 'axios'
axios.defaults.withCredentials=true

export const Certificate = () => {
    function handleClick()
    {
       const tag= document.createElement('a')
       tag.href='http://localhost:2555/certificate/bonafide'
       tag.target='_blank'
       tag.click()
        //   axios.get('http://localhost:2555/certificate/bonafide')
        //   .then((result) => {
        //     console.log(result.data)
        //   }).catch((err) => {
        //     console.log(err)
        //   });
    }
  return (
    <>
    <Typography variant='h4'>Your Certificates </Typography>
     <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={file}
        alt="bonafied"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Bonafied Certificate
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Download your Bonafied Certificate
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClick}>Download</Button>
    
      </CardActions>
    </Card>
    </>
  )
}
