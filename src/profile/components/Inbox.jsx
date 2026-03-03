import React, { useContext, useState } from "react";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import GroupChannelList from "@sendbird/uikit-react/GroupChannelList";
import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import "@sendbird/uikit-react/dist/index.css";
import { AuthContext } from "../../context/AuthContext";

function Inbox() {
  const { user } = useContext(AuthContext);
  const [channelUrl, setChannelUrl] = useState();

  if (!user) return null;

  const userId = user.email.split("@")[0].toLowerCase();

  return (
  <div style={{ height: "100vh" }}>
    <SendbirdProvider
      appId={import.meta.env.VITE_SENDBIRD_APP_ID}
      userId={userId}
      nickname={user.displayName || user.email}
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {/* Left Panel */}
        <div
          style={{
            width: "320px",
            borderRight: "1px solid #e5e5e5",
            overflow: "hidden",
          }}
        >
          <GroupChannelList
            onChannelSelect={(channel) => {
              if (channel) setChannelUrl(channel.url);
            }}
            channelListQueryParams={{
              includeEmpty: true,
            }}
          />
        </div>

        {/* Right Panel */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
          }}
        >
          {channelUrl ? (
            <GroupChannel channelUrl={channelUrl} />
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#888",
              }}
            >
              Select a conversation
            </div>
          )}
        </div>
      </div>
    </SendbirdProvider>
  </div>
);
}

export default Inbox;