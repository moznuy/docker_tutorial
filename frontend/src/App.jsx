import React, { useState, useEffect } from "react";
import MessageContainer from "./components/MessageContainer";
import Login from "./components/Login";
import { login_post, user_data } from "./api/backend";

function App() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access")
  );
  const [userInfo, setUserInfo] = useState({});

  async function authenticate(username, password) {
    const token = await login_post(username, password);
    setAccessToken(token);
    localStorage.setItem("access", token);
  }

  useEffect(() => {
    if (accessToken === null) return;

    async function fetch_user() {
      const user_info = await user_data(accessToken);
      setUserInfo(user_info);
    }
    fetch_user();
  }, [accessToken]);

  async function logout(username, password) {
    setAccessToken(null);
    localStorage.removeItem("access");
  }

  return (
    <>
      {accessToken === null ? (
        <Login authenticate={authenticate} />
      ) : (
        <>
          <button onClick={logout}>Logout</button>
          <MessageContainer accessToken={accessToken} userInfo={userInfo} />
        </>
      )}
    </>
  );
}

export default App;
