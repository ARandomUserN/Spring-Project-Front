import React from 'react';
import './App.css'
import { Route } from "react-router-dom";

import LoginForm from "./components/Pages/LoginForm";

import student from "./components/Pages/student/student";
import studetnsGrades from './components/Pages/student/studentsGrades';
import studentsComments from './components/Pages/student/studentsComments';
import studentsPresence from './components/Pages/student/studentsPresence';

import teacher from './components/Pages/teacher/teacher';
import teacherSubjects from './components/Pages/teacher/teacherSubjects';
import teacherClassYear from './components/Pages/teacher/teacherClassYear';

import caretaker from './components/Pages/caretaker';

function App() {

  return(
    <div className='App'>
      <Route exact path='/' component = {LoginForm} />
      <Route exact path='/student' component = {student} />
      <Route exact path='/student/grades' component = {studetnsGrades} />
      <Route exact path='/student/comments' component = {studentsComments} />
      <Route exact path='/student/presence' component = {studentsPresence} />

      <Route exact path='/teacher' component = {teacher} /> 
      <Route exact path='/teacher/subjects' component = {teacherSubjects} />
      <Route exact path='/teacher/class' component = {teacherClassYear} />

      <Route exact path='/caretaker' component = {caretaker} />
    </div>
  );
}

export default App;
