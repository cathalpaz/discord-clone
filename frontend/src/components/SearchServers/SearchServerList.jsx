import React from "react";

export default function SearchServerList() {
  return (
    <div className="search-server-list-container">
      <div className="search_categories-container">
        <div className="search_categories">
          <i className="fa-solid fa-compass fa-lg search_categories-compass"></i>
          <span>Home</span>
        </div>
        <div className="search_categories">
          <i className="fa-solid fa-gamepad fa-lg search_categories-gamepad"></i>
          <span>Gaming</span>
        </div>
        <div className="search_categories">
          <i className="fa-solid fa-laptop-code fa-lg search_categories-laptop"></i>
          <span>Coding</span>
        </div>
        <div className="search_categories">
          <i className="fa-solid fa-music fa-lg search_categories-music"></i>
          <span>Music</span>
        </div>
      </div>
    </div>
  );
}
