import React from "react";

export default function SearchServerList() {
  const comingSoon = () => {
    alert("Feature coming soon!");
  };

  return (
    <div className="search-server-list-container">
      <div className="search_categories-container">
        <div className="search_categories">
          <i className="fa-solid fa-compass fa-lg search_categories-compass"></i>
          <span onClick={comingSoon}>Home</span>
        </div>
        <div className="search_categories">
          <i className="fa-solid fa-gamepad fa-lg search_categories-gamepad"></i>
          <span onClick={comingSoon}>Gaming</span>
        </div>
        <div className="search_categories">
          <i className="fa-solid fa-laptop-code fa-lg search_categories-laptop"></i>
          <span onClick={comingSoon}>Coding</span>
        </div>
        <div className="search_categories">
          <i className="fa-solid fa-music fa-lg search_categories-music"></i>
          <span onClick={comingSoon}>Music</span>
        </div>
      </div>
    </div>
  );
}
