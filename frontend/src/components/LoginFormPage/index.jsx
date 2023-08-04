import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { Redirect, useHistory } from "react-router-dom";
import '../../styles/components/LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory()

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const sendToRegister = () => {
    history.push("/register")
  }

  const demo1Login = (e) => {
    dispatch(login('Demo', 'password'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  }
  const demo2Login = (e) => {
    dispatch(login('marnie', 'password'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
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
      <div className="login-container-main">
        <div className="login-container">
            <div className="login-input-container">
              <div className="login-input-area">
                <p style={{fontSize:"24px", fontWeight:"500", marginTop:"2.1rem", marginBottom:".35rem", color:"#F2F3F5"}}>Welcome back!</p>
                <p style={{fontSize:"16px", marginBottom:"1.25rem", color:"#B5BAC1"}}>We're so excited to see you again!</p>
              </div>
              <form onSubmit={handleSubmit} className="login-form">

              <div className="login-label-errors">
                <label style={{fontSize:"12px", color:"#B5BAC1", fontWeight:"700", marginBottom:".5rem"}}>
                  EMAIL OR USERNAME  <label style={{fontSize:"12px", color:"#F23F42", paddingLeft:".2rem"}}> *</label>
                </label>
                {errors.length ? (
                  <div className="login-errors">- {errors}</div>
                ) : ''}
              </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label style={{fontSize:"12px", color:"#B5BAC1", fontWeight:"700", marginBottom:".5rem", marginTop:"1.25rem"}}>
                  PASSWORD <label style={{fontSize:"12px", color:"#F23F42", paddingLeft:".2rem"}}> *</label>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p onClick={() => alert('Log in with a Demo!')} className="login-forgot-pass">Forgot your password?</p>
                <button type="submit">Log In</button>

              </form>
              <div className="login-bottom">
                <p style={{color:"#949BA4", fontSize:"14px", marginTop:".6rem", cursor:"default"}}>Need an account? <span className="login-register" onClick={sendToRegister}>Register</span></p>
                <p style={{color:"#949BA4", fontSize:"14px", marginTop:".6rem", cursor:"default"}}>Login with <span className="login-register" onClick={demo1Login}>Demo 1</span> or <span className="login-register" onClick={demo2Login}>Demo 2</span></p>
              </div>
            </div>
            <div className="login-qr-code">
              <img style={{width:"11rem", borderRadius:".25rem", marginLeft:".1rem"}}src="/images/qr-code.png"/>
              <div className="login-qr-info">
                <p style={{fontSize:"24px", width:"17rem", marginTop:"1.5rem", color:"#F2F3F5", marginBottom:".6rem"}}>Check us out with QR Code</p>
                <p style={{fontSize:"16px", color:"#B5BAC1"}}>Scan this with your <label style={{fontWeight:"600"}}>camera</label> to checkout our <label style={{fontWeight:"600"}}>GitHub page</label>.</p>

              </div>
            </div>
        </div>

      </div>

    </>
  );
}

export default LoginFormPage;
