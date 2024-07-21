export const convertMsToTimestamp = (s: number) => {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;
  const secsStr = secs.toString().padStart(2, "0");
  if (hrs > 0) return hrs + ":" + mins + ":" + secsStr;
  if (mins > 0) return mins + ":" + secsStr;

  return 0 + ":" + secsStr;
};
