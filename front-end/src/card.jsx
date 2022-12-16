import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import Blocks from './blocks';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard(props) {
    const navigate = useNavigate();
    console.log(props);

    function onOpen(event){
        navigate('/blocks' , {state:props})
        console.log(props)
        //event.preventDefault();

        // return(
        //     <Blocks />
        // )
    }
  return (
    <Card sx={{ minWidth: 100 , width:250 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Dept of {props.dept}
        </Typography>
        <Typography variant="h5" component="div">
          {props.subject}
          
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.sec}
        </Typography>
        <Typography variant="body2">
        Chaitanya Bharathi Institute of Technology
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={onOpen} size="small">Open</Button>
      </CardActions>
    </Card>
    
  );
}