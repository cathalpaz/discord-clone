import { useEffect, useState } from "react";
import ReactDom from "react-dom";
import "../../styles/components/ChannelListToolTip.css";

export function CreateChannelToolTip({ serverName, parentRef }) {
  if (!parentRef.current) return false;
  const [style, setStyle] = useState({});
  useEffect(() => {
    const rect = parentRef.current.getBoundingClientRect();
    setStyle({
      top: `${rect.top + window.pageYOffset - 27}px`,
      left: `${rect.left + window.pageXOffset - 130}px`,
      position: "absolute",
      animation: "fade .05s ease forwards",
    });
  }, [parentRef]);
  return ReactDom.createPortal(
    <div style={style} className='create-channel-tooltip'>
        {serverName}
    </div>,
    document.getElementById("root")
  );
}
