import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

// Setup dayjs to make human readable dates in the posts 🌈
export const useRelativeTime = (initialValue: Date) => {
  return dayjs(initialValue).fromNow();
};
