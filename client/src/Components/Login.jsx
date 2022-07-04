import React from "react";
import { Navigate, useNavigate, Outlet } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });

  const [cred, setCred] = React.useState(0);

  function handleChange(e) {
    setUser((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // fetch("http://localhost:3002/users")
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res);
    //   });

    fetch("http://localhost:3001/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        if (res.rows.length) {
          setCred(2);
        } else {
          setCred(1);
        }
      });

    // const navigate = useNavigate();
    // navigate("/homepage");
  }
  return (
    <>
      <div>
        <form onSubmit={handleSubmit} action="">
          <input
            name="username"
            onChange={handleChange}
            type="text"
            placeholder="username"
            value={user.username}
            autoComplete="off"
          />
          <input
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="password"
            value={user.password}
          />
          <button type="submit" class="btn btn-warning">LOGIN</button>
        </form>
        {cred === 2 && navigate("/homepage")}
        {cred === 1 && <div>Incorrect Password</div>}
      </div>
      {/* <button type="button submit" className="btn btn-outline-warning btn-lg">Confirm Order</button> */}
      <button type="button submit" className="btn btn-outline-warning btn-lg"  onClick={() => navigate("/register")}>REGISTER</button>
    </>
  );
}
