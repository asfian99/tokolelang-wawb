import * as dayjs from "dayjs";

export const formatDate = (unix: number | string) => {
  const date = dayjs.unix(Number(unix));

  return date.format("DD/MM/YYYY");
};

export const formatTime = (unix: number | string) => {
  // const date = new Date(unix);

  // return date.toLocaleTimeString("ID-id", {});
  const date = dayjs.unix(Number(unix));

  return date.format("HH:mm");
};

export const formatUnixTime = (date: string | number | Date) => {
  const dt = new Date(date);
  return Math.floor(dt.getTime() / 1000);
};

export const getTimeStamp = () => {
  return Math.floor(Date.now() / 1000);
};
