import React, { useState, useEffect } from "react";

export default function Login({ authenticate }) {
  const [username, setUsername] = useState("admin");
  const [password, setPasword] = useState("lol");

  function usernameChanged(ev) {
    setUsername(ev.target.value);
  }
  function passwordChanged(ev) {
    setPasword(ev.target.value);
  }

  return (
    <div>
      <input
        id="username"
        type="text"
        value={username}
        onChange={usernameChanged}
      />
      <input
        id="password"
        type="password"
        value={password}
        onChange={passwordChanged}
      />
      <button
        id="submit"
        onClick={() => {
          authenticate(username, password);
        }}
      >
        Post
      </button>
    </div>
  );
}
