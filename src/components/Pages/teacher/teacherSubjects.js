import React from "react";
import axios from 'axios';
import NavBar from './teacherNavBar'
import { NavLink } from "react-router-dom";

function subjectToSession(subjectId, classyearId, subjectName, classYearName) {
  sessionStorage.setItem("subjectID", subjectId);
  sessionStorage.setItem("classYearID", classyearId);
  sessionStorage.setItem("subjectName", subjectName);    
  sessionStorage.setItem("classYearName", classYearName); 
}

export default class teacherSubjects extends React.Component {
  state = {
    subjects: []
  }

  componentDidMount() {
    if(sessionStorage.getItem("userID") !== null)
    {
      axios.get('/api/teachers/' + sessionStorage.getItem("userID") + '/subjects')
        .then(res => {
          const subjects = res.data;

          console.log(res.data)

          this.setState({ subjects: subjects });
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
          <li key={subject.id} className="nav-item"><NavLink exact to="/teacher/class" activeClassName="active" onClick={() => {subjectToSession(subject.subject.id, subject.classyear.id, subject.subject.name, subject.classyear.year + subject.classyear.name)}} className="nav-links"><strong>Klasa {subject.classyear.year}{subject.classyear.name}</strong> {subject.subject.name}</NavLink></li>
        )}
      </ul>     
      </>
    )
  }
}