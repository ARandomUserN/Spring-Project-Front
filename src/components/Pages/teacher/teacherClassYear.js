import React from "react";
import axios from 'axios';
import NavBar from './teacherNavBar'


export default class teacherClassYear extends React.Component {
  state = {
    students: [],
    gradeValue: null,
    gradeWeight: null,
    gradeType: null,
    studentID: null,
    gradeID: null,
    action: null,
    studentName: null
  }

  setDefaults(studentID, gradeID, action, gradeValue, gradeWeight, gradeType, studentName){
    this.setState({ action: action })
    this.setState({ gradeID: gradeID })
    this.setState({ studentID: studentID })
    this.setState({ gradeValue: gradeValue })
    this.setState({ gradeType: gradeType })
    this.setState({ gradeWeight: gradeWeight })
    this.setState({ studentName: studentName })
  }

  async deleteGrade(gradeID){
    await axios({
      method: "delete",
      url: '/api/teachers/' + sessionStorage.getItem("userID") + '/subjects/' + sessionStorage.getItem("subjectID") + '/classes/' + sessionStorage.getItem("classYearID"),
      data: JSON.stringify({
        markId: gradeID
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(window.location.reload(false))
  }
  
  async makeAction(){

    var actionData;

    if(this.state.action === 'put'){
      actionData = JSON.stringify({
        markId: this.state.gradeID,
        value: this.state.gradeValue,
        type: this.state.gradeType,
        weight: this.state.gradeWeight,
        studentId: this.state.studentID
      })
    }
    else if(this.state.action === 'post'){
      actionData = JSON.stringify({
        value: this.state.gradeValue,
        type: this.state.gradeType,
        weight: this.state.gradeWeight,
        studentId: this.state.studentID
      })
    }

    if(this.state.action === 'put' || this.state.action === 'post'){
      await axios({
        method: this.state.action,
        url: '/api/teachers/' + sessionStorage.getItem("userID") + '/subjects/' + sessionStorage.getItem("subjectID") + '/classes/' + sessionStorage.getItem("classYearID"),
        data: actionData,
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(window.location.reload(false))
    }
  }

  componentDidMount() {

    if(sessionStorage.getItem("userID") !== null)
    {
      axios.get('/api/teachers/' + sessionStorage.getItem("userID") + '/subjects/' + sessionStorage.getItem("subjectID") + '/classes/' + sessionStorage.getItem("classYearID"))
      .then(res => {
        const students = res.data;

        this.setState({ students: students });
      })
    }
  }

  componentWillUnmount(){
    
  }

  render() {
    return (
      <><p class="navb"><NavBar /></p>

      <p class="subject"><h2>{sessionStorage.getItem("subjectName")} Klasa {sessionStorage.getItem("classYearName")}</h2></p>
      <br></br>

      {(this.state.action !== null) ?(
      <><h2>{this.state.studentName}</h2>
        <form onSubmit={() => this.makeAction()}>
          <p>
            <label htmlFor="text"> Ocena</label><br />
            <input type="number" step="0.5" min="1" max="6" onChange={e => this.setState({ gradeValue: e.target.value })} value = {this.state.gradeValue} required /><br /><br />
          </p>
          <p>
            <label htmlFor="text"> Waga</label><br />
            <input type="number" step="1" min="1" max="5" onChange={e => this.setState({ gradeWeight: e.target.value })} value = {this.state.gradeWeight} required /><br /><br />
          </p>
          <p>
            <label htmlFor="text"> Opis</label><br />
            <input type="text" onChange={e => this.setState({ gradeType: e.target.value })} value = {this.state.gradeType} required /><br /><br />
          </p>
          <p>
            <button id="sub_btn" onClick={() => this.setState({ action: null })}>Cofnij</button>
            <br/>
            <button id="sub_btn" type="submit">Zatwierdź</button>
          </p>
        </form></>
      ):(
        <ul>

          {this.state.students.map(student => <p class="grade">
            <><li key={student.id}><h3><p class="subject">{student.student.firstName} {student.student.lastName}</p></h3></li>
            <ul>
              {student.mark.map(mark1 => 
                <li key={mark1.id}><strong>{mark1.type} </strong>{mark1.value} ({mark1.weight})<u onClick={() => this.setDefaults(student.student.id, mark1.id, "put", mark1.value, mark1.weight, mark1.type, 'Edytuj ocenę ' +  student.student.firstName + ' ' + student.student.lastName)}>EDYTUJ</u>   <u onClick={() => window.confirm('Czy chcesz usunąć ocenę ' + student.student.firstName + ' ' + student.student.lastName + ' za ' + mark1.type + '?') ? this.deleteGrade(mark1.id) : null}>USUŃ</u></li>
              )}
              <li><u onClick={() => this.setDefaults(student.student.id, "", "post", "", "", "", 'Dodaj ocenę ' + student.student.firstName + ' ' + student.student.lastName)}>DODAJ OCENE :)</u></li>
              <br/>
            </ul></></p>
          )}
        </ul>
      )
      }
      </>
    )
  }
}