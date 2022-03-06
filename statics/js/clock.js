const clock = document.querySelector("h1.clock");
const calendar = document.querySelector("b.calendar");
const daysArr = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];

function getClock() {
  const date = new Date();
  const years = String(date.getFullYear());
  let months = String(date.getMonth() + 1);
  let dates = String(date.getDate());
  const days = daysArr[date.getDay()];
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  months = months < 10 ? "0" + months : months;
  dates = dates < 10 ? "0" + dates : dates;

  clock.innerText = `${hours}:${minutes}:${seconds}`;
  calendar.innerText = `${years}년 ${months}월 ${dates}일 ${days}`;
}
getClock();
setInterval(getClock, 1000);
