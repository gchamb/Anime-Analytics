import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../../../index.css";
import { endpoints } from "../../../utils/util";

const axios = require("axios");
const ResetPassword = () => {
  document.title = "Reset Password!";
  const [validationError, setValidationError] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const history = useHistory();
  const { token } = useParams();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password === "") {
      setValidationError("You have to enter a password");
      return;
    }
    if (verifyPassword === "") {
      setValidationError("You have to verify your new password!");
      return;
    }
    if (password.length <= 5) {
      setValidationError("Password have to be greater than 5 characters!");
      return;
    }
    if (verifyPassword !== password) {
      setValidationError("The password and verified password have to match!");
      return;
    }

    window.alert("Password Resetted!");
    history.replace("/login");
    try {
      await axios.patch(endpoints.auth.patchReset + token, {
        password: password,
      });
    } catch (err) {
      const { error } = err.response.data;
      setValidationError(error);
      return;
    }
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const verifyPasswordHandler = (e) => {
    setVerifyPassword(e.target.value);
  };

  return (
    <main>
      <h1 className="centeredWhite">Reset Password!</h1>
      <form className="form" onSubmit={onSubmitHandler}>
        {validationError !== undefined && (
          <p className="centeredError">{validationError}</p>
        )}
        <div className="formGroup">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            name="password"
            onChange={passwordHandler}
            value={password}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="verifyPassword">Verify New Password:</label>
          <input
            type="password"
            name="password"
            onChange={verifyPasswordHandler}
            value={verifyPassword}
          />
        </div>
        <div className="formButtonGroup">
          <input type="submit" value="Submit" className="btn2" />
        </div>
      </form>
    </main>
  );
};

export default ResetPassword;
