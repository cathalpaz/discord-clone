import { useEffect, useState } from "react";
import ReactDom from "react-dom";

export function ChannelMenuDropToolTip({ serverName, parentRef }) {
  if (!parentRef.current) return false;
  const [style, setStyle] = useState({});
  useEffect(() => {
    const rect = parentRef.current.getBoundingClientRect();
    setStyle({
      top: `${rect.top + window.pageYOffset - 8}px`,
      left: `${rect.left + window.pageXOffset - 35}px`,
      position: "absolute",
      animation: "fade .3s ease forwards",
    });
  }, [parentRef]);
  return ReactDom.createPortal(
    <div style={style} className='channel-menu-tooltip'>
      {serverName}
    </div>,
    document.getElementById("root")
  );
}
