import dayjs from "dayjs";

const fillEmptycolumns = (columns, start, end) => {
  const filledColumns = columns.slice(0);

  const startDay = dayjs(start).get("day");
  for (let i = 1; i <= startDay; i++) {
    const date = dayjs(start).subtract(i, "day");
    filledColumns.unshift(date);
  }

  const endDay = dayjs(end).get("day");
  for (let i = 1; i <= 6 - endDay; i++) {
    const date = dayjs(end).add(i, "day");
    filledColumns.push(date);
  }

  return filledColumns;
};

export const getCalendarColumns = (now) => {
  const start = dayjs(now).startOf("month");
  const end = dayjs(now).endOf("month");
  const endDate = end.get("date");

  const columns = [];
  for (let i = 0; i < endDate; i++) {
    const date = dayjs(start).add(i, "day");
    columns.push(date);
  }

  const filledColumns = fillEmptycolumns(columns, start, end);
  return filledColumns;
};
