import React from "react";
import { useState } from "react";
import { Navigate, useNavigate, Outlet } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    username: "",
    password: "",
    repassword: "",
  });

  function handleChange(e) {
    setUser((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  }

  const [PostRes, setPostRes] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // fetch("http://localhost:3002/users")
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res);
    //   });

    fetch("http://localhost:3001/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.status === 200) {
        setPostRes("Registered Succesfully");
      } else if (res.status === 400) {
        setPostRes("Username Already Exists!");
      } else {
        setPostRes("Password and Confirm Password do not match");
      }
    });
  }
  return (
    <>
      <form onSubmit={handleSubmit} action="">
        <input
          name="username"
          onChange={handleChange}
          type="text"
          placeholder="Username"
          value={user.username}
          autoComplete="off"
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={user.password}
        />
        <input
          name="repassword"
          onChange={handleChange}
          type="password"
          placeholder="Confirm Password"
          value={user.repassword}
        />
        <br></br>
        <button type="submit" className="btn btn-warning">REGISTER</button>
      </form>
      <div>{PostRes}</div>
      <br></br>
      <button  class="btn btn-outline-warning btn-lg" onClick={() => navigate("/")}>LOGIN</button>
    </>
  );
}
