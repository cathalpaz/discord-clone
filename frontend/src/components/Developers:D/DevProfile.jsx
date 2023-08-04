import React from 'react'
import { useState, useEffect } from 'react';

function DevProfile({ dev }) {
  const [color, setColor] = useState(dev.bannerColor);

  useEffect(() => {
    dev.bannerColor = color;
  }, [color]);

  return (
    <div className='dev-modal'>
      <div
        style={{ backgroundColor: dev.bannerColor }}
        className='user-modal_banner'
      />
      <div className='user-modal_top'>
        <div className='user-modal_title'>
          <img className='user-modal_avatar' src={dev.pic} />{" "}
          {dev.name}
        </div>
        <form>
          <input
            className='user-modal_color'
            type='color'
            name='color'
            id='color'
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </form>
      </div>
      <div className='dev-modal_info'>
        <div className='dev-modal_about'>
            <div className='dev-modal_info-name'>ABOUT</div>
            <span>{dev.about}</span>
        </div>
        <div className='dev-modal_links'>
            <div className='dev-modal__form__group'>
            <div className='dev-modal_info-name'>LINKEDIN</div>
            <a href={dev.linkedin}>
                <i className="fa-brands fa-linkedin"></i>
            </a>
            </div>
            <div className='dev-modal__form__group'>
            <div className='dev-modal_info-name'>GITHUB</div>
                <a href={dev.github}>
                    <i className="fa-brands fa-github"></i>
                </a>
            </div>

        </div>

      </div>


    </div>
  )
}

export default DevProfile
