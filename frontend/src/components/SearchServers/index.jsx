import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/components/SearchServers.css";
import { thunkGetPublicServers } from "../../store/server";
import SearchServerCard from "./SearchServerCard";
import ServerList from "../ServerList";
import SearchServerHeader from "./SearchServerHeader";
import SearchServerList from "./SearchServerList";
import UserProfile from "../UserProfile";
import { MainLoader } from "../Loading/MainLoader";

function SearchServers() {
  const dispatch = useDispatch();
  const pubServers = useSelector((state) => state.servers.publicServers);
  const servers = useSelector((state) => state.servers);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const allPubs = {};
  pubServers.map((id) => (allPubs[id] = servers[id]));
  const realServers = Object.values(allPubs);

  const [filtered, setFiltered] = useState(realServers);

  useEffect(() => {
    (async () => {
      const res = await dispatch(thunkGetPublicServers());
      setFiltered(Object.values(res.servers));
      setLoading(false);
    })();
  }, [dispatch]);

  useEffect(() => {
    setFiltered(
      realServers.filter((server) => {
        return server.name.toLowerCase().startsWith(search.toLowerCase());
      })
    );
  }, [search]);

  if (loading) {
    return <MainLoader />;
  }

  return (
    <>
      <div className='search-servers-container'>
        <div className='search-servers-left-container'>
          <div className='search-servers-server-list'>
            <ServerList />
          </div>
          <div className='search-servers-option-container'>
            <SearchServerHeader />
            <div className='search-servers-option'>
              <SearchServerList />
              <UserProfile />
            </div>
          </div>
        </div>
        <div className='search-server-main-container'>
          <div className='search-servers-image-container'>
            <div className='search-servers-image-info'>
              <span>Find your community on Slacord</span>
              <p style={{ marginBottom: ".6rem" }}>
                From gaming, to music, to learning, there's a place for you.
              </p>
              <div className='search_bar'>
                <input
                  className='search_input'
                  placeholder='Explore communities'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i className='fa-solid fa-magnifying-glass search_header-icon '></i>
              </div>
            </div>
          </div>
          <div className='search-server-general-info'>
            <p className='search_channels-title'>Featured communities</p>
            <div className='search_channels-display'>
              {filtered.map((server) => (
                <SearchServerCard key={server.id} server={server} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchServers;
