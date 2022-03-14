import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./Pages/Home/Home";
import LoginPage from "./Pages/Login/Login";
import PostsPage from "./Pages/Posts/Posts";
import PostPage from "./Pages/Post/Post";
import ProfilePage from "./Pages/Profile/Profile";
import TopNav from "./components/NavBar/NavBar";

const App = () => {
  // const [user, setUser] = useState({
  //   userId: null,
  //   token: null
  // });
  // const loginSuccess = ({ userId, token }) => setUser({ userId, token });
  // const logout = () => setUser({
  //   userId: null,
  //   token: null
  // });
  // const isUserLoggedIn = Boolean(user.userId);

  // const isLogin = () =>{
  //   if (isUserLoggedIn) return (
  //     <ProfilePage
  //       currentUser={user}
  //     />
  //   );
  //   return (
  //     <LoginPage
  //       message={"You need to login to continue"}
  //       loginSuccess={loginSuccess}
  //     />
  //   );
  // };
  return (
    <BrowserRouter>
      <div className="header">
        <TopNav />
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="/posts" element={<PostsPage />}></Route>
          <Route path="/posts/:id" element={<PostPage />}></Route>
          <Route path="/profile" element={<ProfilePage/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
