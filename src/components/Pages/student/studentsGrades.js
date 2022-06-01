import React from 'react';
import axios from 'axios';
import NavBar from "./studentNavBar";

export default class studentsGrades extends React.Component {
  state = {
    subjects: [], gradesList: []
  }

  componentDidMount() {
    if(sessionStorage.getItem("userID") !== null)
    {
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
  }

  componentWillUnmount(){
    
  }

  render() {
    return (
      <><p class="navb"><NavBar /></p>
      <ul>
      
        {this.state.subjects.map(subject =>
          <><p class="subject"><h1><li key={subject.id}><b>{subject.subject.name}</b></li></h1> <h6><p>{subject.teacher.firstName} {subject.teacher.lastName}</p></h6></p> <ul>
            {this.state.gradesList.map(grade => 
            
            (subject.subject.id === grade.subject) ?(<p style={{background: grade.weight > 3.0 ? "#FEF2FF" : "white"}} >

              <p class="grade" style={{color: grade.value < 1.5 ? "red" : "black"}} ><li key={grade.id}><h2>{grade.value}</h2><b>{grade.type}</b> <p></p><h6>Waga: {grade.weight}</h6> </li></p>

              </p>

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