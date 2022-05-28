import React from "react";
import axios from 'axios';
import NavBar from './teacherNavBar'

export default class teacherClassYear extends React.Component {
  state = {
    students: []
  }

  componentDidMount() {

    if(sessionStorage.getItem("userID") !== null)
    {
      axios.get('/api/teachers/' + sessionStorage.getItem("userID") + '/subjects/' + sessionStorage.getItem("subjectID") + '/classes/' + sessionStorage.getItem("classYearID"))
      .then(res => {
        const students = res.data;

        console.log(res.data)

        this.setState({ students: students });
      })
    }
  }

  componentWillUnmount(){
    
  }

  render() {
    return (
      <><NavBar />
      <ul>

        <h2>{sessionStorage.getItem("subjectName")}</h2>
        <br></br>

        {this.state.students.map(student => 
          <><li key={student.id}><strong>Uczeń: </strong>{student.student.firstName} {student.student.lastName}</li>
          <ul>
          {student.mark.map(mark1 => 
            <li key={mark1.id}><strong>{mark1.type} </strong>{mark1.value} ({mark1.weight})   <u onClick={() => console.log("wybrano EDYTUJ ocene dla studenta " + student.student.firstName + " " + student.student.lastName + "(" + student.student.id + ")" + " - " + mark1.id)}>EDYTUJ</u>   <u onClick={() => console.log("wybrano USUN ocene dla studenta " + student.student.firstName + " " + student.student.lastName + "(" + student.student.id + ")" + " - " + mark1.id)}>USUŃ</u></li>
          )}
          <li><u onClick={() => console.log("wybrano DODAJ ocene dla studenta " + student.student.firstName + " " + student.student.lastName + "(" + student.student.id + ")")}>DODAJ OCENE :)</u></li>
          </ul></>
        )}

      </ul>     
      </>
    )
  }
}