import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ServerList from "../ServerList";
import DirectMessageSearch from "../DirectMessage/DirectMessageSearch";
import FriendBar from '../FriendList/FriendBar';
import UserProfile from '../UserProfile';
import DirectMessage from '../DirectMessage';
import FriendList from '../FriendList';
import '../../styles/components/SearchServers.css'
import { thunkGetPublicServers } from '../../store/server';

function SearchServers() {
  const dispatch = useDispatch()
  const pubServers = useSelector(state => state.servers.publicServers)
  const servers = useSelector(state => state.servers)


  useEffect(() => {
    dispatch(thunkGetPublicServers());
  }, [dispatch]);

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')

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
            <div className='search_header'>
              {/* <img src={"/images/search_image.svg"}></img> */}
              <span>Find your community on Slacord</span>
              <p>From gaming, to music, to learning, there's a place for you.</p>
              <div className='search_bar'>
                <input
                  className='search_input'
                  placeholder='Explore communities'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  />
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
            <div className='search_channels-display'>
                {pubServers.map((id) => (
                  <div>{servers[id].name}</div>
                ))}
            </div>
          </div>
    </div>
  )
}

export default SearchServers
