import React from "react";
import NavBar from './teacherNavBar'

function Teacher(){



  return (
    <><NavBar /><div>
        <>
        <h1>{sessionStorage.getItem('name')} {sessionStorage.getItem('surname')}</h1>
        <p>Kontakt: email: {sessionStorage.getItem('email')} telefon: {sessionStorage.getItem('phone')}</p>
        </>
    </div></>
  );
}
export default Teacher;
