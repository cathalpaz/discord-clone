import React from 'react'
import '../../styles/components/Developers.css'

function Developers() {


  const devs = [
    {
        name: 'Cathal',
        linkedin: '',
        github: '',
        pic: 'https://tinyjpg.com/images/social/website.jpg'
    },
    {
        name: 'Jason',
        linkedin: '',
        github: '',
        pic: 'https://tinyjpg.com/images/social/website.jpg'
    },
    {
        name: 'JP',
        linkedin: '',
        github: '',
        pic: 'https://tinyjpg.com/images/social/website.jpg'
    },
    {
        name: 'Zachary',
        linkedin: '',
        github: '',
        pic: 'https://tinyjpg.com/images/social/website.jpg'
    },
  ]
  return (
    <div className='dev-container'>
        <h3>Developers</h3>
        {devs.map(dev => (
            <div className='dev_prof-container'>
                <div className='user_prof-info'>
                    <div className='user_prof-img-container'>
                        <img src={dev.pic} />
                        <div className='online-status'>
                            <div className='green-circle'></div>
                        </div>
                    </div>
                    <span>{dev.name}</span>
                </div>
                <div className='user_prof-settings'>
                </div>
            </div>

        ))}
    </div>
  )
}

export default Developers
