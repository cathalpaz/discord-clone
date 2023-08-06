import React from "react";

function DevProfile({ dev }) {
  return (
    <div className="dev-modal">
      <div
        style={{ backgroundColor: dev.bannerColor }}
        className="user-modal_banner"
      />
      <div className="user-modal_top">
        <div className="user-modal_title">
          <img className="user-modal_avatar" src={dev.pic} /> {dev.name}
        </div>
      </div>
      <div className="dev-modal_info">
        <div className="dev-modal_about">
          <div className="dev-modal_info-name">ABOUT</div>
          <span>{dev.about}</span>
        </div>
        <div className="dev-modal_links">
          <div className="dev-modal__form__group">
            <div className="dev-modal_info-name">LINKEDIN</div>
            <a href={dev.linkedin} target="_blank">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
          <div className="dev-modal__form__group">
            <div className="dev-modal_info-name">GITHUB</div>
            <a href={dev.github} target="_blank">
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DevProfile;
