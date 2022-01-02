import classes from "./Login.module.css";
import "../../../index.css";
import yuno from "../../../images/login.png";
import { useContext, useReducer, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import authContext from "../../../context/auth-context";
import Cookies from "universal-cookie";
import { endpoints } from "../../../utils/util";

const axios = require("axios");
const cookies = new Cookies();
// dispatch function for useReducer
const loginReducer = (state, data) => {
  if (data.type === "username") {
    const updatedState = {
      username: data.username,
      password: state.password,
      formIsValid: {
        pass: state.password.length > 5,
        user: data.username.length >= 3,
      },
    };

    return updatedState;
  }

  if (data.type === "password") {
    const updatedState = {
      username: state.username,
      password: data.password,
      formIsValid: {
        pass: data.password.length > 5,
        user: state.username.length >= 3,
      },
    };

    return updatedState;
  }

  return {
    username: "",
    email: "",
    password: "",
    formIsValid: {
      pass: undefined,
      user: undefined,
    },
  };
};
const Login = () => {
  document.title = "Login!";
  const [login, dispatchlogin] = useReducer(loginReducer, {
    username: "",
    password: "",
    formIsValid: {
      pass: undefined,
      user: undefined,
    },
  });
  const [validationError, setValidationError] = useState(undefined);
  const history = useHistory();
  const auth = useContext(authContext);

  // updates the state with
  const usernameHandler = (event) => {
    dispatchlogin({ type: "username", username: event.target.value });
  };
  const passwordHandler = (event) => {
    dispatchlogin({ type: "password", password: event.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (login.username === "") {
      setValidationError("You have to enter in an username!");
      return;
    }
    if (login.password === "") {
      setValidationError("You have to enter in a password!");
      return;
    }
    if (!login.formIsValid.user) {
      setValidationError(
        "Username has to be greater than or equal to 3 characters"
      );
      return;
    }
    if (!login.formIsValid.pass) {
      setValidationError("Password has to be greater than 5 characters");
      return;
    }

    const info = {
      username: login.username,
      password: login.password,
    };
    try {
      const { data } = await axios.post(endpoints.auth.postLogin, info);
      const date = new Date();
      date.setHours(date.getHours() + 1);

      cookies.set("token", data.token, {
        expires: date,
      });
      auth.setToken(data.token);
      auth.setUser(data.username);
      cookies.set("username", data.username, {
        expires: date,
      });
      auth.onLogin();
      history.push("/home");
    } catch (err) {
      const { error } = err.response.data;
      console.log(err.response);
      setValidationError(error);
    }
  };
  return (
    <div className={classes.login}>
      <h1 className="centeredWhite">Login!</h1>
      <form className="form" onSubmit={onSubmitHandler}>
        {validationError !== undefined && (
          <p className="centeredError">{validationError}</p>
        )}
        <div className="formGroup">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            onChange={usernameHandler}
            value={login.username}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            onChange={passwordHandler}
            value={login.password}
          />
        </div>
        <div className="forgotPass">
          <Link to="/recovery">Forgot Password?</Link>
        </div>
        <div className="formButtonGroup">
          <input type="submit" value="Login" className="btn2" />
        </div>
      </form>
      <div className={classes.pageImg}>
        <img src={yuno} alt="" />
      </div>
    </div>
  );
};

export default Login;
