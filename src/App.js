import React from 'react';
import './App.css'
import { Route } from "react-router-dom";
import student from "./components/Pages/student/student";
import LoginForm from "./components/Pages/LoginForm";
import studetnsGrades from './components/Pages/student/studentsGrades';
import studentsComments from './components/Pages/student/studentsComments';
import studentsPresence from './components/Pages/student/studentsPresence';
import teacher from './components/Pages/teacher/teacher';
import caretaker from './components/Pages/caretaker';

//const createProxyMiddleware = require("http-proxy-middleware");

function App() {

  /*const Logout = () => {
    setUser({
      name: "",
      surname: "",
      id: "",
      email: "",
      phone: ""
    })
    setRedirect("/login")
  }*/

  return(
    <div className='App'>
      <Route exact path='/' component = {LoginForm} />
      <Route exact path='/student' component = {student} />
      <Route exact path='/student/grades' component = {studetnsGrades} />
      <Route exact path='/student/comments' component = {studentsComments} />
      <Route exact path='/student/presence' component = {studentsPresence} />
      <Route exact path='/teacher' component = {teacher} />     
      <Route exact path='/caretaker' component = {caretaker} />
    </div>


    /*<div className="App">

      {(redirect !== "/login") ?(
        <>
        <Router>
        <Link to="/student"></Link>
        </Router></>
      ):(
        <LoginForm Login={Login} error={error} />
      )}
    </div>*/
  );
}

export default App;
