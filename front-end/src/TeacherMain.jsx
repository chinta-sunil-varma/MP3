import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import { Select, FormControl, InputLabel, MenuItem, Alert, Input, Stack, TextField, TextareaAutosize } from '@mui/material';
import { useNavigate } from 'react-router-dom'
axios.defaults.withCredentials = true;



export const TeacherMain = () => {
  const fileRef = React.useRef()
  const nav = useNavigate()
  const [sectionList, setSectionList] = React.useState({ sections: [] })
  const [selectedSection, setSelectedSection] = React.useState()//contains the selected section
  const [sectionDesc, setSectionDesc] = React.useState('')//section desc value here
  const [newsection, setnewSection] = React.useState('')//new section value here
  const [course, SetCourse] = React.useState()//contains coure info
  const [attendance, SetAttendance] = React.useState()
  const [date, setDate] = React.useState()
  const [secList, setSecLIst] = React.useState([])
  const [alert, SetAlert] = React.useState({ status: false, message: "", severity: 'error' })
  console.log(course)
  React.useEffect(() => {
    axios.get('http://localhost:2555/teacher/sections')
      .then((result) => {
        console.log(result.data)
        if(result.data!=null)
        setSecLIst(result.data)
      }).catch((err) => {
        console.log(err)
      });
  }, [])
  function handleSubmit(e) {
    e.preventDefault();
    const file = fileRef.current.files[0]
    console.log(file);
    let temp=course
    for (let index = 0; index < course.length; index++) {
      const dumy = temp[index]
      if (dumy === '1' || dumy === '2' || dumy === '3' || dumy === '4' || dumy === '5' || dumy === '6' || dumy === '7' || dumy === '8' || dumy === '9' || dumy === '0') {
        temp = temp.slice(index)
        break;
      }

    }

    let section='';
    if(newsection==='')

    {
      section=selectedSection
    }
    else
    {
      section=newsection
    }
    const formData = new FormData()

    formData.append('course', course)
    formData.append('courseShort', temp)
    formData.append('fileName', file)
    formData.append('section',section)
    formData.append('secDesc',sectionDesc)
    console.log(formData);
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
    let temp = e.target.value
    for (let index = 0; index < temp.length; index++) {
      const dumy = temp[index]
      if (dumy === '1' || dumy === '2' || dumy === '3' || dumy === '4' || dumy === '5' || dumy === '6' || dumy === '7' || dumy === '8' || dumy === '9' || dumy === '0') {
        temp = temp.slice(index)
        break;
      }

    }
    console.log('temp val', temp)
    axios.get(`http://localhost:2555/add/${temp}`)
      .then((result) => {
        console.log(result.data)
        if(result.data!=''){
        setSectionList(result.data)}
        SetCourse(e.target.value)

      }).catch((err) => {
        console.log('error in handle change', err)
      });


  }
  function handleChangeAttendance(e) {
    SetAttendance(e.target.value)
  }
  function handleDate(e) {
    setDate(e.target.value)
  }

  function attend(e) {
    e.preventDefault()
    nav('/attendance', { state: { date: date, attendance: attendance } })

  }
  function handleselectedSection(e) {
    setSelectedSection(e.target.value)
  }
  function handlesectionDisc(e) {
    setSectionDesc(e.target.value)
  }
  function handlenewsection(e)
  {
    setnewSection(e.target.value)
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
                {secList.map((item) => {
                  return <MenuItem value={item}>{item}</MenuItem>
                })}



              </Select>


              <TextField margin='15px' id="outlined-basic" label="Enter new section" variant="outlined" fullWidth
                value={newsection}
                onChange={handlenewsection}
              />
              <Typography>
                or select from existing section
              </Typography>

              <Select
                id='sectionlist'
                value={selectedSection}
                onChange={handleselectedSection}
                fullWidth
                required
                disabled={newsection ? true : false}
              >

                {sectionList.sections.map((item) => {
                  return <MenuItem value={item.secName}> {item.secName}  </MenuItem>
                })}

              </Select>
              <TextareaAutosize style={{height:'100px'}}
              value={sectionDesc}
                onChange={handlesectionDisc}
                required
               />
            </FormControl>
            <Stack spacing={2} marginTop={2} justifyContent={'center'}>
              <center>
                <input onSubmit={handleSubmit} type={'file'} name='fileName' id='fileupload' ref={fileRef}  />
              </center>
              <Button type='submit'>Submit</Button>
            </Stack>

        </form>

      </Box>
      <form onSubmit={attend}>
        <Box>
          <Typography variant='h4' margin={3}>Take attendance</Typography>
          <FormControl margin='15px' fullWidth>
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
              {secList.map((item) => {
                return <MenuItem value={item}>{item}</MenuItem>
              })}



            </Select>
            <Input sx={{ marginTop: '15px' }} onChange={handleDate} type='date' required />
            <Button sx={{ margin: '15px' }} type='submit'>Proceed</Button>
          </FormControl>
        </Box>
      </form>
    </>
  )
}
