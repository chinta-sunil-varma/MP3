import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import { Select, FormControl, InputLabel, MenuItem, Alert, Input, Stack } from '@mui/material';
axios.defaults.withCredentials=true;


export const TeacherMain = () => {
  const fileRef = React.useRef()

  const [course, SetCourse] = React.useState()
  const [attendance, SetAttendance] = React.useState()
  const [date, setDate] = React.useState()
  const [secList, setSecLIst] = React.useState([])
  const [alert, SetAlert] = React.useState({ status: false, message: "", severity: 'error' })
  console.log(course)
  React.useEffect( ()=>
  {
     axios.get('http://localhost:2555/teacher/sections')
     .then((result) => {
         console.log(result.data)
         setSecLIst(result.data)
     }).catch((err) => {
         console.log(err)
     });
  },[])
  function handleSubmit(e) {
    e.preventDefault();
    const file = fileRef.current.files[0]
    console.log(file);
    const formData = new FormData()
    formData.append('course', course)
    formData.append('fileName', file)
    console.log(course);
    document.getElementById('fileupload').value = null
    axios.post('http://localhost:2555/teacher/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',

      }
    })
      .then((result) => {
        if (result.data.status === 'success') {
          SetAlert({ status: true, message: result.data.message, severity: 'success' })

        }
        else {
          SetAlert({ status: true, message: result.data.message, severity: 'error' })
        }

      }).catch((err) => {
        console.log(err);
      });
  }

  function handleChange(e) {
    SetCourse(e.target.value)
  }
  function handleChangeAttendance(e) {
    SetAttendance(e.target.value)
  }
  function handleDate(e) {
    setDate(e.target.value)
  }

  function attend(e)
  {

  }


  return (
    <>
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
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        {alert.status ? <Alert severity={alert.severity} onClose={() => { SetAlert(false) }}>{alert.message}</Alert> : null}
        <Typography variant='h4' margin={3}>Upload the files </Typography>

        <form onSubmit={handleSubmit}>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Course</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={course}
              label="Age"
              onChange={handleChange}
              name="drop"
              required

            >
            {secList.map((item)=>
            {
             return <MenuItem value={item}>{item}</MenuItem>
            })}
              

              
            </Select>
          </FormControl>
          <Stack spacing={2} marginTop={2} justifyContent={'center'}>
            <center>
              <input onSubmit={handleSubmit} type={'file'} name='fileName' id='fileupload' ref={fileRef} required />
            </center>
            <Button type='submit'>Submit</Button>
          </Stack>
        </form>
      </Box>
      <Box>
        <Typography variant='h4' margin={3}>Take attendance</Typography>
        <FormControl onSubmit={attend} margin='15px' fullWidth>
            <InputLabel id="demo-simple-select-label">Course</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={course}
              label="Age"
              onChange={handleChangeAttendance}
              name="drop"
              required

            >
            {secList.map((item)=>
            {
             return <MenuItem value={item}>{item}</MenuItem>
            })}
              

              
            </Select>
            <Input sx={{marginTop:'15px'}} onChange={handleDate}  type='date'/>
            <Button sx={{margin:'15px'}} type='submit'>Proceed</Button>
          </FormControl>
      </Box>

    </>
  )
}
