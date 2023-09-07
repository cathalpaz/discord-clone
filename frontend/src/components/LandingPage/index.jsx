import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../Footer";
import "../../styles/LandingPage.css";

export default () => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const sendToLogin = () => {
    history.push("/login");
  };

  const sendToMain = () => {
    history.push("/@");
  };

  const sendToLanding = () => {
    history.push("/");
  };

  const sendToApp = () => {
    alert("Feature coming soon!");
  };

  return (
    <div className="landing-page">
      <div className="landing-page-scroll-container">
        <div className="heading-background-container">
          <div className="heading-nav-container">
            <div className="heading-nav-items">
              <div onClick={sendToLanding} className="heading-nav-logo">
                <i className="fa-brands fa-discord fa-xl"></i>
                <p
                  style={{
                    marginBottom: "0px",
                    paddingLeft: ".5rem",
                    fontWeight: "800",
                    fontSize: "16px",
                  }}
                >
                  Slacord
                </p>
              </div>
              <div className="heading-nav-links">
                <p onClick={sendToApp}>Download</p>
                <p onClick={sendToApp}>Nitro</p>
                <p onClick={sendToApp}>Discover</p>
                <p onClick={sendToApp}>Safety</p>
                <p onClick={sendToApp}>Support</p>
                <p onClick={sendToApp}>Blog</p>
                <p onClick={sendToApp}>Careers</p>
              </div>
              <div className="heading-nav-login">
                {sessionUser ? (
                  <button
                    className="heading-nav-main-button"
                    onClick={sendToMain}
                  >
                    Open Slacord
                  </button>
                ) : (
                  <button
                    className="heading-nav-login-button"
                    onClick={sendToLogin}
                  >
                    Login
                  </button>
                )}
                {
                  <button
                    onClick={() =>
                      alert(
                        "Mobile application coming soon! Please view the site on an iPad or computer for now."
                      )
                    }
                    className="nav-bar-mobile-view"
                  >
                    Open Slacord
                  </button>
                }
              </div>
            </div>
          </div>
          <div className="heading-items-container">
            <h1 className="heading-items-title">IMAGINE A PLACE...</h1>
            <p className="heading-items-p">
              ...where you can belong to a school club, a gaming group, or a
              worldwide art community. Where just you and a handful of friends
              can spend time together. A place that makes it easy to talk every
              day and hang out more often.
            </p>
            <div className="heading-item-buttons">
              <button onClick={sendToApp} className="download-button">
                {" "}
                <i
                  className="fa-solid fa-download"
                  style={{ paddingRight: ".4rem" }}
                ></i>{" "}
                Download for {window.innerWidth <= 480 ? "Phone" : "Windows"}
              </button>
              {sessionUser ? (
                <button onClick={sendToMain} className="open-discord-button">
                  Open Slacord in your browser
                </button>
              ) : (
                <button onClick={sendToLogin} className="open-discord-button">
                  Open Slacord in your browser
                </button>
              )}
              {
                <button
                  onClick={() =>
                    alert(
                      "Mobile application coming soon! Please view the site on an iPad or computer for now."
                    )
                  }
                  className="open-discord-button-mobile-view"
                >
                  Open Slacord in your browser
                </button>
              }
            </div>
          </div>
          <img src={"/images/landing_img2.svg"} className="left-picture" />
          <img src={"/images/landing_img1.svg"} className="right-picture" />
          <img
            src={"/images/landing_img3.svg"}
            className="background-picture"
          />
        </div>
        <div className="body-first-block-container">
          <div className="body-first-block-image">
            <img
              src={"/images/landing_body_img1.svg"}
              className="body-img1"
            ></img>
          </div>
          <div className="body-first-block-text">
            <h2>Create an invite-only place where you belong</h2>
            <p>
              Slacord servers are organized into topic-based channels where you
              can collaborate, share, and just talk about your day without
              clogging up a group chat.
            </p>
          </div>
        </div>
        <div className="body-second-block-container">
          <div className="body-second-block-text">
            <h2>Where hanging out is easy</h2>
            <p>
              Grab a seat in a voice channel when you're free. Friends in your
              server can see you're around and instantly pop in to talk without
              having to call.
            </p>
          </div>
          <div className="body-second-block-image">
            <img
              src={"/images/landing_body_img2.svg"}
              className="body-img2"
            ></img>
          </div>
        </div>
        <div className="body-third-block-container">
          <div className="body-third-block-image">
            <img
              src={"/images/landing_body_img3.svg"}
              className="body-img3"
            ></img>
          </div>
          <div className="body-third-block-text">
            <h2>From few to a fandom</h2>
            <p>
              Get any community running with moderation tools and custom member
              access. Give members special powers, set up private channels, and
              more.
            </p>
          </div>
        </div>
        <div className="body-fourth-block-container">
          <h1>RELIABLE TECH FOR STAYING CLOSE</h1>
          <p className="body-fourth-block-p">
            Low-latency voice and video feels like you're in the same room. Wave
            hello over video, watch friends stream their games, or gather up and
            have a drawing session with screen share.
          </p>
          <img
            src={"/images/landing_body_img4.svg"}
            className="body-img4"
          ></img>
          <p className="body-img5">Ready to start your journey?</p>

          <button onClick={sendToApp} className="body-fourth-block-button">
            <i
              className="fa-solid fa-download"
              style={{ paddingRight: ".7rem" }}
            ></i>
            Download for Windows
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
};
