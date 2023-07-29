import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import '../../styles/components/SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [color, setColor] = useState("");
  const [pronoun, setPronoun] = useState("")
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(username, email, password));
        if (data) {
          setErrors(data)
        }
        console.log("this is data", data)
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

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
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label>
            EMAIL<label style={{fontSize:"12px", color:"#F23F42", paddingLeft:".1rem"}}> *</label>
          </label>
          <label>
          {errors.firstName && (
            <p className="signup-modal-errors-firstname">{data["username"]}</p>
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
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>
            PASSWORD <label style={{fontSize:"12px", color:"#F23F42", paddingLeft:".1rem"}}> *</label>
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
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label>
            DATE OF BIRTH (MM/DD/YYYY) <label style={{fontSize:"12px", color:"#F23F42", paddingLeft:".1rem"}}> *</label>
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
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
              />

            </div>
            <div className="signup-form-pronouns">
              <label>
                PRONOUN <label style={{fontSize:"12px", color:"#F23F42", paddingLeft:".1rem"}}> *</label>
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
        <p className="signup-already-have-account">Already have an account?</p>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;
