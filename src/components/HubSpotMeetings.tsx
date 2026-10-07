import { useEffect } from "react";

export const HUBSPOT_MEETINGS_URL = "https://meetings-na2.hubspot.com/rikki-c";

const EMBED_SCRIPT_SRC =
  "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";

// HubSpot's embed script fills every .meetings-iframe-container present when
// it runs, so it is (re)loaded after the container mounts rather than once in
// index.html.
export default function HubSpotMeetings() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = EMBED_SCRIPT_SRC;
    script.type = "text/javascript";
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <div
      className="meetings-iframe-container"
      data-src={`${HUBSPOT_MEETINGS_URL}?embed=true`}
    />
  );
}
