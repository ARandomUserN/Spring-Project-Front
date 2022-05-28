import React from "react";
import NavBar from './teacherNavBar'
import  { Redirect } from 'react-router-dom'

function Teacher(){

  return (
    <><NavBar /><div>
        <>
        {(sessionStorage.getItem("userID") === null) ?(
          <Redirect to = {"/"}/>
        ):(
        <></>
        )}

        <h1>{sessionStorage.getItem('name')} {sessionStorage.getItem('surname')}</h1>
        <p>Kontakt: email: {sessionStorage.getItem('email')} telefon: {sessionStorage.getItem('phone')}</p>
        </>
    </div></>
  );
}
export default Teacher;
