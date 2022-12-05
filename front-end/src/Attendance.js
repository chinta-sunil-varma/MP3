import axios from 'axios'
import React from 'react'
import { Box, CardContent, Paper, Typography, Card, CardActions, Button,RadioGroup,FormControlLabel,Radio } from '@mui/material'



export const Attendance = () => {
  const [data, setData] = React.useState(false)
  const [init, setInit] = React.useState(0)
  const [dateSet, setDateSet] = React.useState(false)
  const [jsonData, setJsonData] = React.useState([])
  const radioRef=React.useRef()
  // console.log(init);
  // console.log(data);
  console.log(data);
  console.log(jsonData);

  React.useEffect(() => {
    axios.get('http://localhost:2555/students/it2')
      .then((result) => {

        setData(result.data)

      }).catch((err) => {
        console.log(err);
      });
  }, [])

  function update(obj) {
    console.log(obj.target.id)
    if (obj.target.id === 'present') {
      const value = data[init]
      console.log(value);
      jsonData.push([value['ID'].toString()+' ', value['NAME'], 'P'])
      localStorage.setItem(value['ID'],'P')
      setInit(init + 1)
    }
    else if (obj.target.id === 'absent') {
      const value = data[init]
      jsonData.push([value['ID'].toString(), value['NAME'], 'A'])
      localStorage.setItem(value['ID'],'A')
      setInit(init + 1)
    }
    else if (obj.target.id === 'late') {
      const value = data[init]
      jsonData.push([value['ID'].toString(), value['NAME'], 'L'])
      localStorage.setItem(value['ID'],'L')
      setInit(init + 1)
    }

  }
  function setTheDate(obj) {
    const result = document.getElementById('date').value
    localStorage.setItem('date', result)
    console.log(result)
    setDateSet(true)
  }
  function download_csv_file() {  
  
    //     define the heading for each row of the data  
       var csv = 'Roll,Name,Status\n';  
           
        //merge the data with CSV  
     jsonData.forEach(function(row) {  
                csv += row.join(',');  
                csv += "\n";  
        });  
       
        
      
         
        var hiddenElement = document.createElement('a');  
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  
        hiddenElement.target = '_blank';  
          
        //provide the name for the CSV file to be downloaded  
        hiddenElement.download = 'Attendance.csv';  
        hiddenElement.click();  

    } 
    function updateRadio(event)
    {
      const {id}=event.target
      console.log(id)

    }
    function updateRef(event)
    {
          console.log(radioRef.current)
    }

  return (
    data ? <>
      <Box>
        <Typography variant='h2' textAlign={'center'} fontFamily=' Gemunu Libre'>
          Attendance
        </Typography>
        choose your date: <input type='date' id='date' />
        <Button onClick={setTheDate} variant='contained'>Submit</Button>
      </Box>
      {dateSet ? <>
        <Typography variant='h3' textAlign={'center'} fontFamily=' Gemunu Libre'>
          Action Center
        </Typography>
        <Paper elevation={3} sx={{ display: 'flex', justifyContent: 'center' }}>

          <Card  >
            <CardContent sx={{fontFamily:' Gemunu Libre',fontSize:'120%'}} >
              {data[init]['ID']}
              <br></br>
              {data[init]['NAME']}
            </CardContent>
            <CardActions>
              <Button id='present' onClick={update} variant='contained'>present</Button>
              <Button id='absent' onClick={update} variant='contained'>absent</Button>
              <Button id='late' onClick={update} variant='contained'>Late</Button>
            </CardActions>
          </Card>
          <Button onClick={download_csv_file}> Download CSV </Button>  


        </Paper>
        <Box justifyContent='center'>
          <Typography variant='h3' textAlign={'center'} fontFamily=' Gemunu Libre'>
            Recorded Attendance

          </Typography>
          <Box display={'flex'} flexDirection='column'>
            {jsonData.map((item) => (
              <Box key={item[0]}>
                <Typography display={'inline-block'} marginRight={2}>{item[0].toString()}</Typography>
                <Typography display={'inline-block'} marginRight={2}>{item[1]}</Typography>
                <RadioGroup
                row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  sx={{display:'inline-block'}}
                  // value={item[2]}
                  id={item[0]}
                  onChange={updateRadio}
                 
                >
                  <FormControlLabel   value="A" control={<Radio />} label="Absent" />
                  <FormControlLabel   value="P" control={<Radio />} label="Present" />
                  <FormControlLabel   value="U" control={<Radio />} label="Late" />
                </RadioGroup>
                <Button variant='contained' onClick={updateRef} className={item[0]}>Update</Button>

              </Box>

            ))}
          </Box>


        </Box>
  
        
      </> : null}
    </> : null
  )
}
