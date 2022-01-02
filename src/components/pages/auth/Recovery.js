import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../../index.css";
import { endpoints } from "../../../utils/util";
const axios = require("axios");
const Recovery = () => {
  document.title = "Recovery!";
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState(undefined);
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const history = useHistory();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      setValidationError("You need to enter an email!");
      return;
    }
    window.alert("Resetting password email has been sent to " + email);
    history.replace("/login");
    try {
      await axios.post(endpoints.auth.postRecovery, {
        email: email,
      });
    } catch (error) {
      setValidationError("Email doesn't exist!");
      return;
    }
  };

  return (
    <main>
      <h1 className="centeredWhite">Recovery!</h1>
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
            value={email}
          />
        </div>
        <div className="formButtonGroup">
          <input type="submit" value="Submit" className="btn2" />
        </div>
      </form>
    </main>
  );
};

export default Recovery;
