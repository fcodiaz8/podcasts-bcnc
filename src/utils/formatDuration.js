export const formatDuration = (trackTimeMillis) => {
  const totalSeconds = Math.floor(trackTimeMillis / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  const formattedTrackTime = hours
    ? `${hours}:${minutes}:${seconds}`
    : `${minutes}:${seconds}`;
  return formattedTrackTime;
};
