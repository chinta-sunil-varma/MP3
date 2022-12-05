import React from 'react'
import axios from 'axios'
import { Button, Paper, Typography, Card, CardActions, CardContent, Box, Select } from '@mui/material'
// import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker'

function reducing(state, action) {
    switch (action.type) {
        case 'add':
            return [...state, action.payload]
        case 'update':
            return state.map((item) => {
                console.log('heh outside id ', item.ID);

                if (item.ID == action.payload.ID) {
                    console.log('match found!');
                    return { ...item, STATUS: action.payload.STATUS }
                }
                return item
            })

    }
}
export const Attendance_copy = () => {
    const [data, setData] = React.useState(false)
    const [limit, setLimit] = React.useState(true)
    const [init, setInit] = React.useState(0)
    const [course, setCourse] = React.useState(false)
    const [state, dispatcher] = React.useReducer(reducing, [])
    const courseRef = React.useRef()
    const secRef = React.useRef()
    console.log(course);
    console.log(state);
    // React.useEffect(, [])

    function handleClick(e) {
        const { value } = e.target

        if (init < data.length) {
            console.log('outer init', init);
            dispatcher({ type: 'add', payload: { ID: data[init].ID, NAME: data[init].NAME, STATUS: value } })
            if (init + 1 >= data.length) {
                console.log('inside false stat');
                setLimit(false)

            } else { setInit(init + 1) }

        }
    }
    function handleSubmit(e) {
        console.log(e.target.name);
        console.log(e.target.value);
        const { name, value } = e.target
        dispatcher({ type: 'update', payload: { ID: name, STATUS: value } })

    }
    function download_csv() {

        //     define the heading for each row of the data  
        var csv = 'Roll,Name,Status\n';

        //merge the data with CSV  
        state.map(function (row) {
            console.log('values here', row)
            row = Object.values(row)
            csv += row.join(',');
            csv += "\n";
        });




        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';

        //provide the name for the CSV file to be downloaded  
        hiddenElement.download = `${Date.now().toLocaleString()}_it2.csv`;
        hiddenElement.click();

    }
    function fetch(sec)
    {
        
            axios.get(`http://localhost:2555/students/${sec}`,{headers:{key:'$2b$10$U3OZ.3UR6D9ajgOfpdN9M.wmYBLne3tD9gatmcsG4$y9iiIGmCiAK'}})
                .then((result) => {
                    console.log(result.data.length);
                    setData(result.data)
    
                }).catch((err) => {
                    console.log(err);
                });
        
    }
    function initializer() {
        const sec=secRef.current.value
         setCourse({ course: courseRef.current.value, sec: sec}) 
         setData(false)
         setInit(0)
         
         fetch(sec)

        
        
        }

    function upload_attend()
    {
        axios.post('http://localhost:2555/attendance/',{  name:courseRef.current.value,section:secRef.current.value,date:'28/08/2003',values:state})
        .then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        });
    }    
    return (
        <>
            <center>
                <Typography sx={{ display: 'inline-block', marginRight: '5px' }}>Course Name</Typography>
                <input type='text' ref={courseRef} />
                <br />
                <Typography sx={{ display: 'inline-block', marginRight: '5px' }}>Select Class</Typography>
                <select ref={secRef}>
                    <option value='it1' >it1</option>
                    <option value='it2' >it2</option>
                </select>
                <br></br>
                <Button onClick={initializer}>set-Subject</Button></center>
            {data ?
                <>

                    <Paper elevation={3} sx={{ display: 'flex', justifyContent: 'center', fontFamily: ' Gemunu Libre', fontSize: '120%' }}>
                        <Card  >
                            <CardContent sx={{ fontFamily: ' Gemunu Libre', fontSize: '120%' }} >
                                {data[init]['ID']}
                                <br></br>
                                {data[init]['NAME']}
                            </CardContent>
                            <CardActions>
                                <Button name='present' value='P' onClick={handleClick} disabled={limit ? false : true}>Present</Button>
                                <Button name='absent' value='A' onClick={handleClick} disabled={limit ? false : true}>Absent</Button>
                                <Button name='late' value='L' onClick={handleClick} disabled={limit ? false : true}>Late</Button>
                            </CardActions>
                        </Card>
                        <Button onClick={download_csv}> Download CSV </Button>
                        <Button onClick={upload_attend}> upload Attendance</Button>


                    </Paper>
                    <Typography variant='h4' justifyContent={'center'}> Absentees here</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', height: '250px' }}>
                        {state.map((item) => {
                            if (item.STATUS === 'A') {
                                return <Typography>{item.NAME}</Typography>
                            }
                        })}</Box>
                    <Typography variant='h4'> Edit here</Typography>
                    <br />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', height: '900px' }}>
                        {state.map((item) => {
                            return <Paper elivation={2} key={item.ID}>
                                <Typography sx={{ display: 'inline-block', color: 'salmon' }}>{item.ID}-</Typography>
                                <Typography sx={{ display: 'inline-block', color: 'blue' }}>{item.NAME}-</Typography>
                                <Typography sx={{ display: 'inline-block', marginRight: '20px', color: 'red' }}>{item.STATUS}</Typography>
                                <input onClick={handleSubmit} value='P' type={'radio'} name={item.ID} checked={item.STATUS == 'P' ? true : false} />
                                <Typography variant='body2'
                                    sx={{ fontFamily: ' Gemunu Libre', fontSize: '120%', display: 'inline-block' }}
                                >present</Typography>

                                <input onClick={handleSubmit} value='A' type={'radio'} name={item.ID} checked={item.STATUS == 'A' ? true : false} />
                                <Typography variant='body2'
                                    sx={{ fontFamily: ' Gemunu Libre', fontSize: '120%', display: 'inline-block' }}
                                >absent</Typography>

                                <input onClick={handleSubmit} value='L' type={'radio'} name={item.ID} checked={item.STATUS == 'L' ? true : false} />
                                <Typography variant='body2'
                                    sx={{ fontFamily: ' Gemunu Libre', fontSize: '120%', display: 'inline-block' }}
                                >late</Typography>


                            </Paper>

                        })}
                    </Box>
                </>
                : null}</>
    )
}
