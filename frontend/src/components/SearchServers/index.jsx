import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ServerList from "../ServerList";
import DirectMessageSearch from "../DirectMessage/DirectMessageSearch";
import FriendBar from '../FriendList/FriendBar';
import UserProfile from '../UserProfile';
import DirectMessage from '../DirectMessage';
import FriendList from '../FriendList';
import '../../styles/components/SearchServers.css'

function SearchServers() {

  const [selectedState, setSelectedState] = useState("");
  return (
    <div className='main-page-container-search'>
      <div className='main-page-container__item-search main-page-container__item--1-search'>
            <ServerList />
          </div>
          <div className='main-page-container__item-search main-page-container__item--2-search'>
            <div className='search_categories-title'>Discover</div>
          </div>
          <div className='main-page-container__item-search main-page-container__item--3-search'>
          </div>
          <div className='main-page-container__item-search main-page-container__item--4-search'>
            <UserProfile />
            <div className='search_categories'>
              <span>Home</span>
              <span>Gaming</span>
              <span>Coding</span>
              <span>Music</span>
            </div>
          </div>
          <div className='main-page-container__item-search main-page-container__item--5-search'>
            MAIN CONTAINER
          </div>
    </div>
  )
}

export default SearchServers
