import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginPage from '../Login/Login';
import "./Profile.css"

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    createAt: "",
    name: "",
    id: ""
  });
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    let didCancel = false;
    if (token && userId !== undefined) {
      axios({
        method: "GET",
        url: `https://60dff0ba6b689e001788c858.mockapi.io/users/${userId}`,
        headers: {
          Authorization: token
        }
      }).then(response => {
        console.log(response.data);
        if (!didCancel) {
          setUserInfo({
            createAt: response.data.createAt,
            name: response.data.name,
            id: response.data.id
          })
        }
      })
    }
    return () => { didCancel = true };
  }, [token, userId])

  return token ? (
    <div className='main'>
      <h3>Profile</h3>
      <div>Name: {userInfo.name}</div>
      <div>UserID: {userInfo.id}</div>
    </div>
  ) : (
    <div>
      <h3>You need to login to continue</h3>
      <LoginPage />
    </div>
  );
}

export default ProfilePage;
