import React from "react";
import { useHistory } from "react-router-dom";
import "../../styles/LandingPage.css";

export default function Footer() {
  const history = useHistory()

  const sendToTop = () => {
    window.scrollTo({ top: 0 });
  };

  const sendToRegister = () => {
    history.push("/register");
  };

  return (
    <>
      <div className="body-fifth-block-container">
        <div className="body-fifth-block-sub-container">
          <div className="body-fifth-block-techologies">
            <p className="body-fifth-block-language">
              <img
                style={{ width: "1.5rem", height: "1rem" }}
                src={"/images/flag.png"}
              ></img>
              English, USA
            </p>
            <p className="body-fifth-block-techologies-header">
              Used Technologies:{" "}
            </p>
            <div className="body-fifth-block-icons">
              <i className="fa-brands fa-react fa-xl"></i>
              <img className="fa-redux" src="/images/redux_icon.png"></img>
              <i className="fa-brands fa-python fa-2xl"></i>
              <i className="fa-brands fa-aws fa-xl"></i>
              <img className="fa-flask" src="/images/flask_icon.png"></img>
              <img className="fa-vite" src="/images/vite_icon.png"></img>
              <img
                className="fa-socketio"
                src="/images/socket_io_icon.png"
              ></img>
              <i className="fa-brands fa-node-js fa-2xl"></i>
              <img
                className="fa-sqlalchemy"
                src="/images/sql_alchemy_icon.png"
              ></img>
            </div>
          </div>
          <div className="body-fifth-block-main-developer-container">
            <div className="body-fifth-block-first-developer-container">
              <div className="body-fifth-block-cathal">
                <p
                  style={{
                    color: "#5865F2",
                    paddingBottom: "1rem",
                    width: "5rem",
                  }}
                >
                  Cathal Paz
                </p>
                <a href="https://github.com/cathalpaz" target="_blank">
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/cathal-paz-052239263/"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </div>
              <div className="body-fifth-block-jason">
                <p
                  style={{
                    color: "#5865F2",
                    paddingBottom: "1rem",
                    width: "8rem",
                  }}
                >
                  Jason Murphy
                </p>
                <a href="https://github.com/jmurphy1196" target="_blank">
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/jason-murphy-3704ba1b8/"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="body-fifth-block-second-developer-container">
              <div className="body-fifth-block-jp">
                <p
                  style={{
                    color: "#5865F2",
                    paddingBottom: "1rem",
                    width: "8rem",
                  }}
                >
                  Jun "JP" Park
                </p>
                <a href="https://github.com/thejhp1" target="_blank">
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/jun-park-3b23b7285/"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </div>
              <div className="body-fifth-block-zach">
                <p className="body-fifth-block-zach-name">Zachary Stallings</p>
                <a href="https://github.com/zachary5939" target="_blank">
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/zachary-stallings-11434b266/"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="body-fifth-block-footer">
          <div className="footer-nav-logo">
            <p
              style={{
                marginBottom: ".5rem",
                fontWeight: "800",
                fontSize: "17px",
                fontFamily: "ginto",
              }}
              onClick={sendToTop}
            >
              <i
                style={{ marginBottom: ".9rem", paddingRight: ".5rem" }}
                className="fa-brands fa-discord fa-xl"
              ></i>
              Slacord
            </p>
            <button
              onClick={sendToRegister}
              className="body-fifth-block-footer-signup-button"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
