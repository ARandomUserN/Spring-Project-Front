import React, { useState } from "react"
import BackgroundImage from '../../assets/bg2.jpg'
import UserList from '../UserList';
import  { Redirect } from 'react-router-dom'

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}

function LoginForm(){
    const usersClass = new UserList();

    const [error, setError] = useState("");
    const [redirect, setRedirect] = useState("/");
    const [details, setDetails] = useState({email: "", password: ""});
  
    const Login = details => {
      const student = { username: details.email, password: details.password };
      usersClass.checkCredentials(student)
      .then(response => {
  
        for(let i = 0; i < response.data['href'].split('/').length; i++){
          if(response.data['href'].split('/')[i] === "students"){
            usersClass.getUserDataByID(response.data["href"]).then(userData => {
              sessionStorage.setItem('userID', userData.id)
              sessionStorage.setItem('email', userData.email)
              sessionStorage.setItem('name', userData.firstName)
              sessionStorage.setItem('surname', userData.lastName)
              sessionStorage.setItem('phone', userData.phone)
              sessionStorage.setItem('caretaker', userData.carFirstName + " " + userData.carLastName)
              sessionStorage.setItem('class', userData.year + userData.className)
              sessionStorage.setItem('classYearID', userData.classyearId)
              setRedirect("/student")
            })

          }
          if(response.data['href'].split('/')[i] === "teachers"){
            usersClass.getUserDataByID(response.data["href"]).then(userData => {
              console.log(userData)
              sessionStorage.setItem('userID', userData.teacher.id)
              sessionStorage.setItem('email', userData.email)
              sessionStorage.setItem('name', userData.teacher.firstName)
              sessionStorage.setItem('surname', userData.teacher.lastName)
              sessionStorage.setItem('phone', userData.teacher.phone)
              setRedirect("/teacher")
            })
          }
          if(response.data['href'].split('/')[i] === "caretakers"){
            setRedirect("/caretaker");
            break;
          }
          if(response.data['href'].split('/')[i] === "admin"){
            setRedirect("/admin");
            break;
          }
        }

        
        setError("")
    })
      .catch(error => { 
        setRedirect("/")
        setError("Błędne dane")
      })
    }

    const submitHandler = e =>{
        e.preventDefault();
        Login(details);
    }

    return (
      <div style={ HeaderStyle } className="text-center m-5-auto">
        {(redirect !== "/") ?(
          <Redirect to = {redirect}/>
        ):(
          <><h2>Logowanie</h2><form onSubmit={submitHandler} action="/home">
              {(error !== "") ? (<div className="error">{error}</div>) : ""}
              <p>
                <label htmlFor="email"> Email</label><br />
                <input type="email" name="email" id="email" onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} required /><br /><br />
              </p>
              <p>
                <label htmlFor="password"> Hasło</label><br />
                <input type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} required /><br /><br />
              </p>
              <p>
                <button id="sub_btn" type="submit">Zaloguj</button>
              </p>
            </form></>
        )}
        </div>
    )
}

export default LoginForm;