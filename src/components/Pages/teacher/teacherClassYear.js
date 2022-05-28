import React from "react";
import axios from 'axios';
import NavBar from './teacherNavBar'

export default class teacherClassYear extends React.Component {
  state = {
    students: []
  }

  componentDidMount() {
    axios.get('/api/teachers/' + sessionStorage.getItem("userID") + '/subjects/' + sessionStorage.getItem("subjectID") + '/classes/' + sessionStorage.getItem("classYearID"))
      .then(res => {
        const students = res.data;

        console.log(res.data)

        this.setState({ students: students });
      })
  }

  componentWillUnmount(){
    
  }

  render() {
    return (
      <><NavBar />
      <ul>
        {this.state.students.map(student =>
          <li key={student.id}><strong>Uczeń: </strong>{student.student.firstName} {student.student.lastName}</li>
        )}
      </ul>     
      </>
    )
  }
}