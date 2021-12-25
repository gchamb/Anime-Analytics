import classes from "./Signup.module.css";
import "../../../index.css";
import yuno from "../../../images/signup.png";
import { useReducer, useState } from "react";
import { useHistory } from "react-router-dom";

const axios = require("axios");
// dispatch function for useReducer
const signUpReducer = (state, data) => {
  if (data.type === "username") {
    const updatedState = {
      username: data.username,
      email: state.email,
      password: state.password,
      formIsValid: {
        pass: state.password.length > 5,
        user: data.username.length >= 3,
      },
    };

    return updatedState;
  }
  if (data.type === "email") {
    const updatedState = {
      username: state.username,
      email: data.email,
      password: state.password,
      formIsValid: {
        pass: state.password.length > 5,
        user: state.username.length >= 3,
      },
    };

    return updatedState;
  }
  if (data.type === "password") {
    const updatedState = {
      username: state.username,
      email: state.email,
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

const Signup = () => {
  const [signUp, dispatchSignup] = useReducer(signUpReducer, {
    username: "",
    email: "",
    password: "",
    formIsValid: {
      pass: undefined,
      user: undefined,
    },
  });
  const [validationError, setValidationError] = useState(undefined);
  const history = useHistory();

  // updates the state with
  const usernameHandler = (event) => {
    dispatchSignup({ type: "username", username: event.target.value });
  };
  const emailHandler = (event) => {
    dispatchSignup({ type: "email", email: event.target.value });
  };
  const passwordHandler = (event) => {
    dispatchSignup({ type: "password", password: event.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (signUp.email === "") {
      setValidationError("You have to enter in an email!");
      return;
    }
    if (signUp.username === "") {
      setValidationError("You have to enter in an username!");
      return;
    }
    if (signUp.password === "") {
      setValidationError("You have to enter in a password!");
      return;
    }
    if (!signUp.formIsValid.user) {
      setValidationError(
        "Username has to be greater than or equal to 3 characters"
      );
      return;
    }
    if (!signUp.formIsValid.pass) {
      setValidationError("Password has to be greater than 5 characters");
      return;
    }

    const info = {
      email: signUp.email,
      username: signUp.username,
      password: signUp.password,
    };
    try {
      const { data } = await axios.post("http://localhost:5000/signup", info);
      console.log(data);
      history.push("/login");
    } catch (err) {
      const { error } = err.response.data;
      setValidationError(error);
    }
  };

  return (
    <div className={classes.signup}>
      <h1 className="centeredWhite">Sign up!</h1>
      <form className="form" onSubmit={onSubmitHandler}>
        {validationError !== undefined && (
          <p className="centeredError">{validationError}</p>
        )}
        <div className="formGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            onChange={emailHandler}
            value={signUp.email}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            onChange={usernameHandler}
            value={signUp.username}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            onChange={passwordHandler}
            value={signUp.password}
          />
        </div>
        <div className="formButtonGroup">
          <input type="submit" value="Register" className="btn2" />
        </div>
      </form>
      <div className={classes.pageImg}>
        <img src={yuno} alt="" />
      </div>
    </div>
  );
};

export default Signup;
