import React from "react";
import BackgroundImage from "../../images/landing_img3.svg";
import BackgroundImageLeft from "../../images/landing_img2.svg"
import BackgroundImageRight from "../../images/landing_img1.svg"
import BodyImg1 from "../../images/landing_body_img1.svg"
import BodyImg2 from "../../images/landing_body_img2.svg"
import BodyImg3 from "../../images/landing_body_img3.svg"
import BodyImg4 from "../../images/landing_body_img4.svg"
import BodyImg5 from "../../images/landing_body_img5.svg"
import flag from "../../images/flag.png"
import "./LandingPage2.css";

export const LandingPage2 = () => {
  return (
    <div className="landing-page">
        <div className="heading-background-container">
            <div className="heading-nav-container">
                <div className="heading-nav-items">
                    <div className="heading-nav-logo">
                        <i class="fa-brands fa-discord fa-xl"></i>
                        <p style={{marginBottom:"0px", paddingLeft:".5rem", fontWeight:"800", fontSize:"16px"}}>Slacord</p>
                    </div>
                    <div className="heading-nav-links">
                        <p>Download</p>
                        <p>Nitro</p>
                        <p>Discover</p>
                        <p>Safety</p>
                        <p>Support</p>
                        <p>Blog</p>
                        <p>Careers</p>
                    </div>
                    <div className="heading-nav-login">
                        <button>Login</button>

                    </div>

                </div>
            </div>
            <div className="heading-items-container">
                <h1 style={{fontFamily:"ginto", fontSize:"50px", maxHeight:"7rem", margin:"0px", lineHeight:"3rem", width:"39rem"}}>IMAGINE A PLACE...</h1>
                <p style={{fontSize:"18px", marginTop:"2.25rem", marginBottom:"0rem", maxWidth: "40rem", lineHeight:"1.8rem"}}>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
                <div className="heading-item-buttons">
                    <button className="download-button"> <i class="fa-solid fa-download" style={{paddingRight:".4rem"}}></i> Download for Windows</button>
                    <button className="open-discord-button">Open Discord in your browser</button>
                </div>
            </div>
            <img src={BackgroundImageLeft} className="left-picture"/>
            <img src={BackgroundImageRight} className="right-picture"/>
            <img src={BackgroundImage} className="background-picture"/>
        </div>
        <div className="body-first-block-container">
            <div className="body-first-block-image">
                <img src={BodyImg1} className="body-img1"></img>
            </div>
            <div className="body-first-block-text">
                <h2>Create an invite-only place where you belong</h2>
                <p>Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.</p>
            </div>
        </div>
        <div className="body-second-block-container">
            <div className="body-second-block-text">
                <h2>Where hanging out is easy</h2>
                <p>Grab a seat in a voice channel when you're free. Friends in your server can see you're around and instantly pop in to talk without having to call.</p>
            </div>
            <div className="body-second-block-image">
                <img src={BodyImg2} className="body-img2"></img>
            </div>
        </div>
        <div className="body-third-block-container">
            <div className="body-third-block-image">
                <img src={BodyImg3} className="body-img3"></img>
            </div>
            <div className="body-third-block-text">
                <h2>From few to a fandom</h2>
                <p>Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.</p>
            </div>
        </div>
        <div className="body-fourth-block-container">
            <h1>RELIABLE TECH FOR STAYING CLOSE</h1>
            <p>Low-latency voice and video feels like you're in the same room. Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share.</p>
            <img src={BodyImg4} className="body-img4"></img>
            <img src={BodyImg5} className="body-img5"></img>
            <p style={{fontFamily:"ggsans", fontWeight:"600", fontSize:"29px", marginTop:"6.5rem"}}>Ready to start your journey?</p>
            <button className="body-fourth-block-button"><i class="fa-solid fa-download" style={{paddingRight:".4rem"}}></i>Download for Windows</button>
        </div>
        <div className="body-fifth-block-container">
            <div className="body-fifth-block-sub-container">
                <div className="body-fifth-block-social-links">
                    <p><img style={{width:"1.4rem", height:".9rem"}} src={flag}></img>English, USA</p>
                    <i class="fa-brands fa-twitter fa-lg" style={{color:"#ffffff"}}></i>
                    <i class="fa-brands fa-instagram fa-xl" style={{color:"#ffffff"}}></i>
                    <i class="fa-brands fa-square-facebook fa-xl" style={{color:"#ffffff"}}></i>
                    <i class="fa-brands fa-youtube fa-xl" style={{color:"#ffffff"}}></i>
                    <i class="fa-brands fa-tiktok fa-lg" style={{color:"#ffffff"}}></i>
                </div>
                <div className="body-fifth-block-names">
                    <p style={{color:"#5865F2", paddingBottom:".75rem"}}>Contributors</p>
                    <span>Cathal Paz</span>
                    <span>Jason Murphy</span>
                    <span>Jun "JP" Park</span>
                    <span>Zachary Stallings</span>
                </div>
                <div className="body-fifth-block-github">
                    <p style={{color:"#5865F2", paddingBottom:".75rem"}}>GitHub</p>
                    <a href="https://github.com/cathalpaz">cathalpaz</a>
                    <a href="https://github.com/jmurphy1196">jmurphy1196</a>
                    <a href="https://github.com/thejhp1">thejhp1</a>
                    <a href="https://github.com/zachary5939">zachary5939</a>
                </div>
                <div className="body-fifth-block-linkedin">
                    <p style={{color:"#5865F2", paddingBottom:".75rem"}}>LinkedIn</p>
                    <a href="https://www.linkedin.com/in/cathal-paz-052239263/">Cathal</a>
                    <a href="https://www.linkedin.com/in/jason-murphy-3704ba1b8/">Jason</a>
                    <a href="https://www.linkedin.com/in/jun-park-3b23b7285/">JP</a>
                    <a href="https://www.linkedin.com/in/zachary-stallings-11434b266/">Zachary</a>
                </div>
                <div className="body-fifth-block-capstone">
                    <p style={{color:"#5865F2", paddingBottom:".75rem"}}>Future Capstone Project</p>
                    <span>Coming soon...</span>
                    <span>Coming soon...</span>
                    <span>Coming soon...</span>
                    <span>Coming soon...</span>
                </div>
            </div>
            <div className="body-fifth-block-footer">
                <div className="heading-nav-logo">
                    <p style={{marginBottom:"1rem", fontWeight:"800", fontSize:"16px"}}><i style={{marginBottom:".8rem", paddingRight:".5rem"}} class="fa-brands fa-discord fa-xl"></i>Slacord</p>
                    <button className="body-fifth-block-footer-signup-button">Sign up</button>
                </div>
            </div>
        </div>
    </div>
  )
};
