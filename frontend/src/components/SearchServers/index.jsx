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
import SearchServerCard from './SearchServerCard';

function SearchServers() {
  const dispatch = useDispatch()
  const pubServers = useSelector(state => state.servers.publicServers)
  const servers = useSelector(state => state.servers)

  const [search, setSearch] = useState('')

  const allPubs = {}
  pubServers.map(id => allPubs[id] = servers[id])
  const realServers = Object.values(allPubs)

  const [filtered, setFiltered] = useState(realServers)

  useEffect(() => {
    (async () => {
        const res = await dispatch(thunkGetPublicServers());
        setFiltered(Object.values(res.servers))
    })()
  }, [dispatch])

  useEffect(() => {
      setFiltered(
          realServers.filter(server => {
              return server.name.toLowerCase().startsWith(search.toLowerCase())
          })
      )
  },[search])


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
            <div className='search_categories-container'>
              <div className='search_categories'>
                <i class="fa-solid fa-compass fa-lg search_categories-compass"></i>
                <span>Home</span>
              </div>
              <div className='search_categories'>
                <i class="fa-solid fa-gamepad fa-lg search_categories-gamepad"></i>
                <span>Gaming</span>
              </div>
              <div className='search_categories'>
                <i class="fa-solid fa-laptop-code fa-lg search_categories-laptop"></i>
                <span>Coding</span>
              </div>
              <div className='search_categories'>
                <i class="fa-solid fa-music fa-lg search_categories-music"></i>
                <span>Music</span>
              </div>

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
            <h3 className='search_channels-title'>Featured Communities</h3>
            <div className='search_channels-display'>
                {filtered.map((server) => (
                  // <div>{servers[id].name}</div>
                  <SearchServerCard server={server} />
                ))}
            </div>
          </div>
    </div>
  )
}

export default SearchServers
