export const isoDateToMonthDayYear = (trackDate: string) => {
  const date = new Date(trackDate);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  return { month, day, year };
};
