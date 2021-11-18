import * as dayjs from "dayjs";

export const formatDate = (unix: number) => {
  const date = dayjs.unix(unix);

  return date.format("DD/MM/YYYY");
};

export const formatTime = (unix: number) => {
  // const date = new Date(unix);

  // return date.toLocaleTimeString("ID-id", {});
  const date = dayjs.unix(unix);

  return date.format("HH:mm");
};
