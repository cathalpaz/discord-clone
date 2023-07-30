import { useHistory } from "react-router-dom";
import "../../styles/LandingPage.css";
import { useSelector } from "react-redux";

export default () => {
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user)

  const sendToLogin = () => {
    history.push("/login")
  }

  const sendToMain = () => {
    history.push("/main")
  }

  const sendToLanding = () => {
    history.push("/")
  }

  const sendToTop = () => {
    window.scrollTo({top:0, behavior:"smooth"})
  }

  const sendToRegister = () => {
    history.push("/register")
  }

  const sendToApp = () => {
    alert("Feature coming soon!")
  }

  return (
    <div className='landing-page'>
      <div className='heading-background-container'>
        <div className='heading-nav-container'>
          <div className='heading-nav-items'>
            <div onClick={sendToLanding} className='heading-nav-logo'>
              <i className='fa-brands fa-discord fa-xl'></i>
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
            <div className='heading-nav-links'>
              <p onClick={sendToApp}>Download</p>
              <p onClick={sendToApp}>Nitro</p>
              <p onClick={sendToApp}>Discover</p>
              <p onClick={sendToApp}>Safety</p>
              <p onClick={sendToApp}>Support</p>
              <p onClick={sendToApp}>Blog</p>
              <p onClick={sendToApp}>Careers</p>
            </div>
            <div className='heading-nav-login'>
              {sessionUser ? <button className="heading-nav-main-button" onClick={sendToMain}>Open Discord</button> : <button className="heading-nav-login-button" onClick={sendToLogin}>Login</button>}
            </div>
          </div>
        </div>
        <div className='heading-items-container'>
          <h1
            style={{
              fontFamily: "ginto",
              fontSize: "56px",
              maxHeight: "7rem",
              margin: "0px",
              lineHeight: "3.3rem",
              width: "39rem",
              paddingRight:".8rem"
            }}
          >
            IMAGINE A PLACE...
          </h1>
          <p
            style={{
              fontSize: "20px",
              marginTop: "2.45rem",
              marginBottom: "0rem",
              maxWidth: "40rem",
              lineHeight: "2.04rem",
            }}
          >
            ...where you can belong to a school club, a gaming group, or a
            worldwide art community. Where just you and a handful of friends can
            spend time together. A place that makes it easy to talk every day
            and hang out more often.
          </p>
          <div className='heading-item-buttons'>
            <button onClick={sendToApp} className='download-button'>
              {" "}
              <i
                className='fa-solid fa-download'
                style={{ paddingRight: ".4rem" }}
              ></i>{" "}
              Download for Windows
            </button>
            {sessionUser ? <button onClick={sendToMain} className='open-discord-button'>
              Open Slacord in your browser
            </button> : <button onClick={sendToLogin} className='open-discord-button'>
              Open Slacord in your browser
            </button> }

          </div>
        </div>
        <img src={"/images/landing_img2.svg"} className='left-picture' />
        <img src={"/images/landing_img1.svg"} className='right-picture' />
        <img src={"/images/landing_img3.svg"} className='background-picture' />
      </div>
      <div className='body-first-block-container'>
        <div className='body-first-block-image'>
          <img
            src={"/images/landing_body_img1.svg"}
            className='body-img1'
          ></img>
        </div>
        <div className='body-first-block-text'>
          <h2>Create an invite-only place where you belong</h2>
          <p>
            Slacord servers are organized into topic-based channels where you
            can collaborate, share, and just talk about your day without
            clogging up a group chat.
          </p>
        </div>
      </div>
      <div className='body-second-block-container'>
        <div className='body-second-block-text'>
          <h2>Where hanging out is easy</h2>
          <p>
            Grab a seat in a voice channel when you're free. Friends in your
            server can see you're around and instantly pop in to talk without
            having to call.
          </p>
        </div>
        <div className='body-second-block-image'>
          <img
            src={"/images/landing_body_img2.svg"}
            className='body-img2'
          ></img>
        </div>
      </div>
      <div className='body-third-block-container'>
        <div className='body-third-block-image'>
          <img
            src={"/images/landing_body_img3.svg"}
            className='body-img3'
          ></img>
        </div>
        <div className='body-third-block-text'>
          <h2>From few to a fandom</h2>
          <p>
            Get any community running with moderation tools and custom member
            access. Give members special powers, set up private channels, and
            more.
          </p>
        </div>
      </div>
      <div className='body-fourth-block-container'>
        <h1>RELIABLE TECH FOR STAYING CLOSE</h1>
        <p>
          Low-latency voice and video feels like you're in the same room. Wave
          hello over video, watch friends stream their games, or gather up and
          have a drawing session with screen share.
        </p>
        <img src={"/images/landing_body_img4.svg"} className='body-img4'></img>
        <img src={"/images/landing_body_img5.svg"} className='body-img5'></img>
        <p
          style={{
            fontFamily: "ggsans",
            fontWeight: "600",
            fontSize: "32px",
            marginTop: "7rem",
            marginBottom: "0px"
          }}
        >
          Ready to start your journey?
        </p>
        <button className='body-fourth-block-button'>
          <i className='fa-solid fa-download' style={{ paddingRight: ".7rem" }}></i>
          Download for Windows
        </button>
      </div>
      <div className='body-fifth-block-container'>
        <div className='body-fifth-block-sub-container'>
          <div className='body-fifth-block-techologies'>
            <p className='body-fifth-block-language'>
              <img
                style={{ width: "1.5rem", height: "1rem" }}
                src={"/images/flag.png"}
              ></img>
              English, USA
            </p>
            <p className="body-fifth-block-techologies-header">Used Technologies: </p>
            <i
              className='fa-brands fa-react fa-xl'
              style={{ color: "#ffffff" }}
            ></i>
              <img
                className='fa-redux'
                src="/images/redux_icon.png"
              ></img>
            <i
              className='fa-brands fa-python fa-2xl'
              style={{ color: "#ffffff" }}
            ></i>
            <i
              className='fa-brands fa-aws fa-xl'
              style={{ color: "#ffffff" }}
            ></i>
            <img
              className="fa-flask"
              src="/images/flask_icon.png"
            >
            </img>
            <img
              className="fa-sqlalchemy"
              src="/images/sql_alchemy_icon.png"
            >
            </img>
            <img
              className="fa-vite"
              src="/images/vite_icon.png"
            >
            </img>
            <img
              className="fa-socketio"
              src="/images/socket_io_icon.png"
            >
            </img>
            <i
              className='fa-brands fa-node-js fa-2xl'
              style={{ color: "#ffffff" }}
            ></i>
          </div>
          <div className='body-fifth-block-cathal'>
            <p style={{ color: "#5865F2", paddingBottom: "1rem" }}>
              Cathal Paz
            </p>
            <a href='https://github.com/cathalpaz'>GitHub</a>
            <a href='https://www.linkedin.com/in/cathal-paz-052239263/'>LinkedIn</a>
          </div>
          <div className='body-fifth-block-jason'>
            <p style={{ color: "#5865F2", paddingBottom: "1rem" }}>Jason Murphy</p>
            <a href='https://github.com/jmurphy1196'>GitHub</a>
            <a href='https://www.linkedin.com/in/jason-murphy-3704ba1b8/'>
              LinkedIn
            </a>
          </div>
          <div className='body-fifth-block-jp'>
            <p style={{ color: "#5865F2", paddingBottom: "1rem" }}>
              Jun "JP" Park
            </p>
            <a href='https://github.com/thejhp1'>GitHub</a>
            <a href='https://www.linkedin.com/in/jun-park-3b23b7285/'>LinkedIn</a>
          </div>
          <div className='body-fifth-block-zach'>
            <p style={{ color: "#5865F2", paddingBottom: "1rem" }}>
              Zachary Stallings
            </p>
            <a href='https://github.com/zachary5939'>GitHub</a>
            <a href='https://www.linkedin.com/in/zachary-stallings-11434b266/'>
              LinkedIn
            </a>
          </div>
        </div>
        <div className='body-fifth-block-footer'>
          <div className='footer-nav-logo'>
            <p
              style={{
                marginBottom: ".5rem",
                fontWeight: "800",
                fontSize: "17px",
                fontFamily: "ginto"
              }}
              onClick={sendToTop}
            >
              <i
                style={{ marginBottom: ".9rem", paddingRight: ".5rem" }}
                className='fa-brands fa-discord fa-xl'
              ></i>
              Slacord
            </p>
            <button onClick={sendToRegister} className='body-fifth-block-footer-signup-button'>
              Sign up
            </button>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};
