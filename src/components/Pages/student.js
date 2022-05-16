import React from "react";
import NavBar from '../studentNavBar'

function Student(){



  return (
    <><NavBar /><div>
        <>
        <h1>{sessionStorage.getItem('name')} {sessionStorage.getItem('surname')}</h1>
        <p>Kontakt: email: {sessionStorage.getItem('email')} telefon: {sessionStorage.getItem('phone')}</p>
        <p>Klasa: {sessionStorage.getItem('class')}</p>
        <p>Opiekun: {sessionStorage.getItem('caretaker')}</p>
        </>
    </div></>
  );
}
export default Student;
