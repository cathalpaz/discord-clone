import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import "../../styles/components/SignupForm.css";
import { UploadIcon } from "../Icons/UploadIcon";

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [color, setColor] = useState("");
  const [pronoun, setPronoun] = useState("");
  const [errors, setErrors] = useState([]);
  const [serverError, setServerError] = useState([]);
  const [birthdayMonth, setBirthdayMonth] = useState("");
  const [birthdayDay, setBirthdayDay] = useState("");
  const [birthdayYear, setBirthdayYear] = useState("");
  const [avatar, setAvatar] = useState();
  const [loading, setLoading] = useState(false)

  const fileRef = useRef();

  const startYear = 1900;
  const currentYear = 2023;
  let years = [];

  for (let i = currentYear; i >= startYear; i--) {
    years.push(i);
  }

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const errors = {};
    if (!email.includes("@")) {
      errors.email = "Must be a valid email.";
    } else if (
      !email.endsWith(".org") &&
      !email.endsWith(".com") &&
      !email.endsWith(".gov") &&
      !email.endsWith(".edu") &&
      !email.endsWith(".net") &&
      !email.endsWith(".io")
    ) {
      errors.email =
        "Invalid email, must end with .org/.com/.gov/.net/.edu/.io";
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
      errors.username = "Username must be within 4 and 50 characters long.";
    }

    if (password !== confirmPassword) {
      errors.password = "Passwords do not match";
      errors.confirmpassword = "Passwords do not match";
    } else if (password.length < 4 || password.length > 50) {
      errors.password = "Password must be between 4 and 50 characters long.";
    }

    if (!color.length) {
      errors.color = "Must pick a banner color";
    }

    if (Object.values(errors).length === 0) {
      const birthday = `${birthdayMonth}/${birthdayDay}/${birthdayYear}`;
      const userFormData = new FormData();
      userFormData.append("username", username);
      userFormData.append("password", password);
      userFormData.append("email", email);
      userFormData.append("pronouns", pronoun);
      userFormData.append("birthday", birthday);
      userFormData.append("banner_color", "#FAFAFA");
      if (avatar) {
        userFormData.append("file", avatar);
      }
      const data = await dispatch(signUp(userFormData));
      if (data) {
        setServerError(data);
        setLoading(false)
      }
    }

    setErrors(errors);
    setLoading(false)
  };

  const sentToLogin = () => {
    history.push("/login");
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  return (
    <>
      <img
        className="login-background1"
        src="/images/login_background1.JPG"
      ></img>
      <img
        className="login-background2"
        src="/images/login_background2.JPG"
      ></img>
      <div className="signup-container">
        <div className="signup-form-container">
          <h2
            style={{
              fontWeight: "600",
              marginTop: "2rem",
              marginBottom: ".8rem",
              color: "#F2F3F5",
            }}
          >
            Create an account
          </h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <ul className="signup-server-errors">
              {serverError.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label>
              EMAIL
              <label
                style={{
                  fontSize: "12px",
                  color: "#F23F42",
                  paddingLeft: ".1rem",
                }}
              >
                {" "}
                *
              </label>
            </label>
            <label>
              {errors.email && (
                <p className="signup-errors -email">{errors.email}</p>
              )}
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>
              USERNAME{" "}
              <label
                style={{
                  fontSize: "12px",
                  color: "#F23F42",
                  paddingLeft: ".1rem",
                }}
              >
                {" "}
                *
              </label>
            </label>
            <label>
              {errors.username && (
                <p className="signup-errors -username">{errors.username}</p>
              )}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>
              PASSWORD{" "}
              <label
                style={{
                  fontSize: "12px",
                  color: "#F23F42",
                  paddingLeft: ".1rem",
                }}
              >
                {" "}
                *
              </label>
            </label>
            <label>
              {errors.password && (
                <p className="signup-errors -password">{errors.password}</p>
              )}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>
              CONFIRM PASSWORD{" "}
              <label
                style={{
                  fontSize: "12px",
                  color: "#F23F42",
                  paddingLeft: ".1rem",
                }}
              >
                {" "}
                *
              </label>
            </label>
            <label>
              {errors.confirmpassword && (
                <p className="signup-errors -confirmpassword">
                  {errors.confirmpassword}
                </p>
              )}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <label>
              DATE OF BIRTH (MM/DD/YYYY){" "}
              <label
                style={{
                  fontSize: "12px",
                  color: "#F23F42",
                  paddingLeft: ".1rem",
                }}
              >
                {" "}
                *
              </label>
            </label>
            <label>
              {errors.birthday && (
                <p className="signup-errors -birthday">{errors.birthday}</p>
              )}
            </label>
            <div className="signup-birthday-select-container">
              <select
                name="birthday-month"
                onChange={(e) => setBirthdayMonth(e.target.value)}
                value={birthdayMonth}
                required
              >
                <option value="" disabled>
                  Select a month...
                </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
              <select
                name="birthday-day"
                onChange={(e) => setBirthdayDay(e.target.value)}
                value={birthdayDay}
                required
              >
                <option value="" disabled>
                  Select a day...
                </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>15</option>
                <option>16</option>
                <option>17</option>
                <option>18</option>
                <option>19</option>
                <option>20</option>
                <option>21</option>
                <option>22</option>
                <option>23</option>
                <option>24</option>
                <option>25</option>
                <option>26</option>
                <option>27</option>
                <option>28</option>
                <option>29</option>
                <option>30</option>
                <option>31</option>
              </select>
              <select
                name="birthday-year"
                onChange={(e) => setBirthdayYear(e.target.value)}
                value={birthdayYear}
                required
              >
                <option value="" disabled>
                  Select a year...
                </option>
                {years.map((year) => (
                  <option>{year}</option>
                ))}
              </select>
            </div>

            <div className="signup-form-footer">
              <div className="signup-form-avatar">
                <label>
                  AVATAR{" "}
                  <label
                    style={{
                      fontSize: "12px",
                      color: "#F23F42",
                      paddingLeft: ".1rem",
                    }}
                  >
                    {" "}
                    *
                  </label>{" "}
                </label>
                {!avatar ? (
                  <button
                    className="file__input-btn"
                    onClick={handleImageUpload}
                  >
                    <UploadIcon />
                  </button>
                ) : (
                  <div className="avatar__preview">
                    <img src={URL.createObjectURL(avatar)} />
                  </div>
                )}
                <input
                  type="file"
                  ref={fileRef}
                  className="file__input"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      const file = e.target.files[0];
                      if (file.type.substring("image/")) {
                        setAvatar(file);
                      }
                    }
                  }}
                />
              </div>
              <div className="signup-form-banner-color">
                <label>
                  BANNER COLOR{" "}
                  <label
                    style={{
                      fontSize: "12px",
                      color: "#F23F42",
                      paddingLeft: ".1rem",
                    }}
                  >
                    {" "}
                    *
                  </label>
                </label>
                <label>
                  {errors.color && (
                    <p className="signup-errors -color">{errors.color}</p>
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
                  PRONOUNS{" "}
                  <label
                    style={{
                      fontSize: "12px",
                      color: "#F23F42",
                      paddingLeft: ".1rem",
                    }}
                  >
                    {" "}
                    *
                  </label>
                </label>
                <label>
                  {errors.pronoun && (
                    <p className="signup-errors -pronoun">{errors.pronoun}</p>
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
            {loading ? <button>LOADING <i className="fa-solid fa-spinner fa-spin-pulse"></i> </button>: <button type="submit">Continue</button>}
          </form>
          <span onClick={sentToLogin} className="signup-already-have-account">
            Already have an account?
          </span>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;
