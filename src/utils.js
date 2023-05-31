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

export const getDayText = (day) => {
  /** case 1 */
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return days[day];

  /** case 2 */
  // switch (day) {
  //   case 0:
  //     return "일";
  //   case 1:
  //     return "월";
  //   case 2:
  //     return "화";
  //   case 3:
  //     return "수";
  //   case 4:
  //     return "목";
  //   case 5:
  //     return "금";
  //   case 6:
  //     return "토";
  //   default:
  //     return;
  // }
};

export const getDayColor = (day) => {
  return day === 6 ? "#5872d1" : day === 0 ? "#e67639" : "#2b2b2b";
};
