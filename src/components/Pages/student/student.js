import React from "react";
import NavBar from './studentNavBar'

function Student(){



  return (
    <><p class="navb"><NavBar /></p><div>
        <>
        <p class="color"><h1>{sessionStorage.getItem('name')} {sessionStorage.getItem('surname')}</h1></p>
        <p>Klasa: {sessionStorage.getItem('class')}</p>
        <p>Opiekun: {sessionStorage.getItem('caretaker')}</p>
        <p>email: {sessionStorage.getItem('email')}</p>
        <p>telefon: {sessionStorage.getItem('phone')}</p>
        </>
    </div></>
  );
}
export default Student;
