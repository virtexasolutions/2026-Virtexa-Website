export const HUBSPOT_MEETINGS_URL = "https://meetings-na2.hubspot.com/rikki-c";

export default function HubSpotMeetings({
  height = 720,
}: {
  height?: number;
}) {
  return (
    <iframe
      src={`${HUBSPOT_MEETINGS_URL}?embed=true`}
      title="Book your 30-minute System Audit"
      loading="lazy"
      className="w-full rounded-xl border-0 bg-white"
      style={{ height }}
    />
  );
}
