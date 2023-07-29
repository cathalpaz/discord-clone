import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import '../../styles/components/SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [color, setColor] = useState("");
  const [pronoun, setPronoun] = useState("")
  const [errors, setErrors] = useState([]);
  const [serverError, setServerError] = useState([])

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!email.includes("@")) {
      errors.email = "Must be a valid email."
    } else if (
      !email.endsWith(".org") &&
      !email.endsWith(".com") &&
      !email.endsWith(".gov") &&
      !email.endsWith(".edu") &&
      !email.endsWith(".net") &&
      !email.endsWith(".io")
    ) {
      errors.email = "Invalid email, must end with .org/.com/.gov/.net/.edu/.io";
    } else if (email.includes("@")) {
      let count = 0;
      for (let ele of email.split("")) {
        if (ele === "@") {
          count++;
        }
      }
      if (count > 1) {
        errors.email = "Must be a valid email.";
      }
    }

    if (username.length < 4 || username.length > 50) {
      errors.username = "Username must be within 4 and 50 characters long."
    }

    if (password !== confirmPassword) {
      errors.password = "Passwords do not match";
      errors.confirmpassword = "Passwords do not match"
    } else if (password.length < 4 || password.length > 50) {
      errors.password = "Password must be between 4 and 50 characters long."
    }
    console.log(birthday.length)
    if (!(birthday.length === 10 || birthday.length === 9)) {
      errors.birthday = "Please enter correct birthday format in MM/DD/YYYY"
    } else if (birthday.includes("/")) {
      let count = 0;
      for (let ele of birthday.split("")) {
        if (ele === "/") {
          count++;
        }
      }
      if (count !== 2) {
        errors.birthday = "Please enter correct birthday format in MM/DD/YYYY"
      }
    }

    if (birthday.split("/")[0].length !== 2) {
      errors.birthday = "Please enter correct birthday format in MM/DD/YYYY"
    } else if (birthday.split("/")[1].length !== 2) {
      errors.birthday = "Please enter correct birthday format in MM/DD/YYYY"
    } else if (birthday.split("/")[2].length !== 4) {
      errors.birthday = "Please enter correct birthday format in MM/DD/YYYY"
    }

    if (birthday.length == 9) {
      const arr = birthday.split("/")
      if (arr[0].length > 1) {
        errors.birthday = "Please enter correct birthday format in MM/DD/YYYY"
      } else if (arr[1].length !== 2) {
        errors.birthday = "Please enter correct birthday format in MM/DD/YYYY"
      } else if (arr[1].length !== 4) {
        errors.birthday = "Please enter correct birthday format in MM/DD/YYYY"
      }
    }

    if (!color.length) {
      errors.color = "Must pick a banner color"
    }

    if (Object.values(errors).length === 0) {
      const data = await dispatch(signUp(username, email, password, birthday, color, pronoun));
      if (data) {
        setServerError(data)
      }
    }

    setErrors(errors)
  };

  const sentToLogin = () => {
    history.push("/login")
  }

  return (
    <>
      <img
      className="login-background1"
      src="/images/login_background1.JPG">
      </img>
      <img
      className="login-background2"
      src="/images/login_background2.JPG">
      </img>
      <div className="signup-container">
        <div className="signup-form-container">
        <h2 style={{fontWeight:"600", marginTop:"2rem", marginBottom:".8rem", color:"#F2F3F5"}}>Create an account</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <ul className="signup-server-errors">
            {serverError.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label>
            EMAIL<label style={{fontSize:"12px", color:"#F23F42", paddingLeft:".1rem"}}> *</label>
          </label>
          <label>
          {errors.email && (
            <p className="signup-modal-errors-email">{errors.email}</p>
          )}
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>
            USERNAME <label style={{fontSize:"12px", color:"#F23F42", paddingLeft:".1rem"}}> *</label>
          </label>
          <label>
          {errors.username && (
            <p className="signup-modal-errors-username">{errors.username}</p>
          )}
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>
            PASSWORD <label style={{fontSize:"12px", color:"#F23F42", paddingLeft:".1rem"}}> *</label>
          </label>
          <label>
          {errors.password && (
            <p className="signup-modal-errors-password">{errors.password}</p>
          )}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>
            CONFIRM PASSWORD <label style={{fontSize:"12px", color:"#F23F42", paddingLeft:".1rem"}}> *</label>
          </label>
          <label>
          {errors.confirmpassword && (
            <p className="signup-modal-errors-confirmpassword">{errors.confirmpassword}</p>
          )}
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label>
            DATE OF BIRTH (MM/DD/YYYY) <label style={{fontSize:"12px", color:"#F23F42", paddingLeft:".1rem"}}> *</label>
          </label>
          <label>
          {errors.birthday && (
            <p className="signup-modal-errors-birthday">{errors.birthday}</p>
          )}
          </label>
          <input
            type="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
          <div className="signup-form-footer">
            <div className="signup-form-banner-color">
              <label>
                BANNER COLOR <label style={{fontSize:"12px", color:"#F23F42", paddingLeft:".1rem"}}> *</label>
              </label>
              <label>
                {errors.color && (
                  <p className="signup-modal-errors-color">{errors.color}</p>
                )}
              </label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
              />
              {}
            </div>
            <div className="signup-form-pronouns">
              <label>
                PRONOUN <label style={{fontSize:"12px", color:"#F23F42", paddingLeft:".1rem"}}> *</label>
              </label>
              <label>
                {errors.pronoun && (
                  <p className="signup-modal-errors-pronoun">{errors.pronoun}</p>
                )}
              </label>
              <input
                type="pronoun"
                value={pronoun}
                onChange={(e) => setPronoun(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit">Continue</button>
        </form>
        <span onClick={sentToLogin} className="signup-already-have-account">Already have an account?</span>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;
