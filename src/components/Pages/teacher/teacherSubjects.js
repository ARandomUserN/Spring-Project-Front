import React from "react";
import axios from 'axios';
import NavBar from './teacherNavBar'
import { NavLink } from "react-router-dom";

function subjectToSession(subjectId, classyearId) {
  sessionStorage.setItem("subjectID", subjectId);
  sessionStorage.setItem("classYearID", classyearId);    
}

export default class teacherSubjects extends React.Component {
  state = {
    subjects: []
  }

  componentDidMount() {
    axios.get('/api/teachers/' + sessionStorage.getItem("userID") + '/subjects')
      .then(res => {
        const subjects = res.data;

        this.setState({ subjects: subjects });
      })
  }

  componentWillUnmount(){
    
  }

  render() {
    return (
      <><NavBar />
      <ul>
        {this.state.subjects.map(subject =>
          <li key={subject.id} className="nav-item"><NavLink exact to="/teacher/class" activeClassName="active" onClick={() => {subjectToSession(subject.subject.id, subject.classyear.id)}} className="nav-links"><strong>Klasa: {subject.classyear.year}{subject.classyear.name}</strong> Przedmiot: {subject.subject.name}</NavLink></li>
        )}
      </ul>     
      </>
    )
  }
}