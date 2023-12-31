import React from "react";
import OpenModalSpan from "../OpenModalSpan";
import DevProfile from "./DevProfile";
import "../../styles/components/Developers.css";

function Developers() {
  const developers = [
    {
      name: "Cathal",
      linkedin: "https://www.linkedin.com/in/cathal-paz-052239263/",
      github: "https://github.com/cathalpaz",
      pic: "https://tinyjpg.com/images/social/website.jpg",
      bannerColor: "#808000",
      about:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      name: "Jason",
      linkedin: "https://www.linkedin.com/in/jason-murphy-3704ba1b8/",
      github: "https://github.com/jmurphy1196",
      pic: "https://tinyjpg.com/images/social/website.jpg",
      bannerColor: "#00FFFF",
      about:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      name: "JP",
      linkedin: "https://www.linkedin.com/in/jun-park-3b23b7285/",
      github: "https://github.com/thejhp1",
      pic: "https://tinyjpg.com/images/social/website.jpg",
      bannerColor: "#00FFFF",
      about:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      name: "Zachary",
      linkedin: "https://www.linkedin.com/in/zachary-stallings-11434b266/",
      github: "https://github.com/zachary5939",
      pic: "https://tinyjpg.com/images/social/website.jpg",
      bannerColor: "#00FFFF",
      about:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];
  return (
    <div className="dev-container">
      <h3>Meet the Developers!</h3>
      {developers.map((dev, i) => (
        <div key={i} className="dev_prof-container">
          <div className="user_prof-info">
            <div className="user_prof-img-container">
              <img src={dev.pic} />
              <div className="online-status">
                <i className="fa-solid fa-crown"></i>
              </div>
            </div>
            <span>{dev.name}</span>
          </div>
          <div className="user_prof-settings">
            <OpenModalSpan
              buttonText={"View"}
              modalComponent={<DevProfile dev={dev} />}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Developers;
