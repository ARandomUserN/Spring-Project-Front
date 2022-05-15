import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  
  const [username, setName] = useState("");
  const [password, setEmail] = useState("");
  
  let next;

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username,password)
    try {
      let res = await axios({
        method: "put",
        url: "/login",
        data: JSON.stringify({
          username: username,
          password: password
        }),
        headers: {
          'Content-Type': 'application/json',
        }

      }).then(res => {
        console.log(res.data)
        let next = res.data["href"]
        console.log(next)
        // this.next = next
        
      })
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder="Email"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={password}
          placeholder="Pwd"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default App;