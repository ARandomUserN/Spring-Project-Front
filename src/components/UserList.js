import React from 'react';
import axios from 'axios';

export default class UserList extends React.Component {

    async checkCredentials(student){
      return await axios({
        method: "put",
        url: "/login",
        data: JSON.stringify({
          username: student.username,
          password: student.password
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      })
    }

    async getUserDataByID(endPoint){
        const res = await axios.get(endPoint);
        return res.data;
    }

}