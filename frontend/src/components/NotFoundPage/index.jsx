import React from 'react'
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../Footer';
import "../../styles/components/NotFoundPage.css"

function NotFoundPage() {
  const sessionUser = useSelector((state) => state.session.user)
  const history = useHistory()

  const sendToLogin = () => {
    history.push("/login")
  }

  const sendToMain = () => {
    history.push("/@")
  }

  const sendToLanding = () => {
    history.push("/")
  }
  console.log(window.outerWidth == 375)
  return (
    <>
        <div className='nav-bar-container'>
            <div onClick={sendToLanding} className='nav-bar-logo'>
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
            <div className='nav-bar-links'>
              <p >Download</p>
              <p >Nitro</p>
              <p >Discover</p>
              <p >Safety</p>
              <p >Support</p>
              <p >Blog</p>
              <p >Careers</p>
            </div>
            <div className='nav-bar-login'>
              {sessionUser ? <button className="nav-bar-main-button" onClick={sendToMain}>Open Discord</button> : <button className="nav-bar-login-button" onClick={sendToLogin}>Login</button>}
              {<button onClick={() => alert("Mobile application coming soon! Please view the site on an iPad or computer for now.")}className='nav-bar-mobile-view'>Open Discord</button>}
            </div>
        </div>
        <div className='not-found-body-container'>
            <img src="/images/not_found_page.gif"></img>
            <h1>WRONG TURN?</h1>
            <p style={{color: "#000000"}}>You look lost, stranger. You know what helps when you’re lost? A piping hot bowl of noodles. Take a seat, we’re frantically at work here cooking up something good. Oh, you need something to read? These might help you:</p>
        </div>
        <Footer />
    </>
  )
}


export default NotFoundPage
