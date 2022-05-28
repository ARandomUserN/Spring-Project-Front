/*import React from "react";
import NavBar from "../studentNavBar";

function studentsGrades(){
  return (
    <><NavBar /><div>
      <h1>Oceny</h1>
    </div></>
  );
}

export default studentsGrades;*/


import React from 'react';
import axios from 'axios';
import NavBar from "./studentNavBar";

export default class studentsGrades extends React.Component {
  state = {
    subjects: [], gradesList: []
  }
//lelelelel
  componentDidMount() {
    axios.get('/api/students/' + sessionStorage.getItem("userID") + '/subjects')
      .then(res => {
        const subjects = res.data;

        this.setState({ subjects: subjects });
        axios.get('/api/students/' + sessionStorage.getItem("userID") + '/marks')
        .then(res => {
          const marks = res.data;
          var grades = []

          marks.forEach(mark => {
            grades.push({id: mark.mark.id, subject: mark.subjectId, value: mark.mark.value, weight: mark.mark.weight, type: mark.mark.type})
          });

          this.setState({ gradesList: grades });
        })
      })
  }

  componentWillUnmount(){
    
  }

  render() {
    return (
      <><NavBar />
      <ul>
        {this.state.subjects.map(subject =>
          <><li key={subject.subject.id}><b>{subject.subject.name}</b> Nauczyciel: {subject.teacher.firstName} {subject.teacher.lastName}</li><ul>
            {this.state.gradesList.map(grade => 
            
            (subject.subject.id === grade.subject) ?(
              <li key={grade.id}><b>Ocena: </b>{grade.value} <b>Za: </b>{grade.type} <b>Waga: </b>{grade.weight}</li>
            ):(
              <></>
            )
            )}
          </ul></>
          
        )}
      </ul>
          
      </>
    )
  }
}