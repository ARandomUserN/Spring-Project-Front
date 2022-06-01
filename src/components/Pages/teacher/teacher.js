import React from "react";
import NavBar from './teacherNavBar'

function Teacher(){

  return (
    <><p class="navb"><NavBar /></p><div>
        <>
        <p class="color"><h1>{sessionStorage.getItem('name')} {sessionStorage.getItem('surname')}</h1></p>
        <p>email: {sessionStorage.getItem('email')}</p>
        <p>telefon: {sessionStorage.getItem('phone')}</p>
        </>
    </div></>
  );
}
export default Teacher;
