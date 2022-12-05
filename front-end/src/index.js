import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { Attendance } from './Attendance';
import { Attendance_copy } from './Attendance_copy';
import { Todo } from './Todo';
import {Que} from './Que'
import { TeacherMain } from './TeacherMain';
import SignIn from './SignIn';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <BrowserRouter>
  <Routes>
    {/* <Route path='/attendance' element={<Attendance/>}/> */}
    {/* <Route path='/todo' element={<Todo/>}/> */}
    <Route path='/attendance' element={<Attendance_copy/>}/>
    <Route path='/q' element={<Que/>}/>
    <Route path='/teacher' element={<TeacherMain/>}/>
    <Route path='/login' element={<SignIn/>}/>
    {/* <Route path='/discus' element={<AppC/>}/> */}

    
  </Routes>
 </BrowserRouter>
);


