import { useSelector } from "react-redux";
import { HashTagIcon } from "../Icons/HashTagIcon";
import "../../styles/components/ChannelHeader.css";

export function ChannelHeader() {
  const channels = useSelector((state) => state.singleServer.channels);
  const channelId = useSelector(
    (state) => state.singleServer?.selectedChannelId || null
  );
  return (
    <>
      <div className='channel-header-container'>
        <header className='channel-header__title'>
          <HashTagIcon className={"channel-header__title__icon"} />
          {channelId && channels[channelId]?.name}
        </header>
      </div>
    </>
  );
}
