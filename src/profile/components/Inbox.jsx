import React, { useContext, useState } from "react";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import GroupChannelList from "@sendbird/uikit-react/GroupChannelList";
import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import "@sendbird/uikit-react/dist/index.css";
import { AuthContext } from "../../context/AuthContext";

function Inbox() {
  const { user } = useContext(AuthContext);
  const [channelUrl, setChannelUrl] = useState(null);

  if (!user) return null;

  const userId = user.email.split("@")[0].toLowerCase();

  return (
    <div className="h-[80vh] md:h-[85vh]">
      <SendbirdProvider
        appId={import.meta.env.VITE_SENDBIRD_APP_ID}
        userId={userId}
        nickname={user.displayName || user.email}
      >
        <div className="flex h-full overflow-hidden">

          {/* Channel List */}
          <div
            className={`
            w-full md:w-[320px]
            border-r
            ${channelUrl ? "hidden md:block" : "block"}
            `}
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

          {/* Chat */}
          <div
            className={`
            flex-1
            ${!channelUrl ? "hidden md:flex" : "flex"}
            flex-col
            `}
          >
            {channelUrl ? (
              <>
                {/* Mobile Back Button */}
                <div className="md:hidden p-2 border-b">
                  <button
                    onClick={() => setChannelUrl(null)}
                    className="text-blue-600 font-medium"
                  >
                    ← Back
                  </button>
                </div>

                <GroupChannel channelUrl={channelUrl} />
              </>
            ) : (
              <div className="hidden md:flex items-center justify-center text-gray-400 w-full">
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