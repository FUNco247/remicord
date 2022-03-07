const dateStart = document.querySelector("input.dateStart");
const dateEnd = document.querySelector("input.dateEnd");
const getHistoryBtn = document.querySelector("button.getHistoryBtn");

// set default date of inputs today
const setDate = () => {
  const date = new Date();
  const years = String(date.getFullYear());
  let months = String(date.getMonth() + 1);
  let dates = String(date.getDate());
  months = months < 10 ? "0" + months : months;
  dates = dates < 10 ? "0" + dates : dates;
  dateStart.value = `${years}-${months}-${dates}`;
  dateEnd.value = `${years}-${months}-${dates}`;
};
setDate();

//get fetch, record.json

let records;
const getHistoryJson = async () => {
  const url = new URL("http://localhost:8282/record/history/api");
  const params = { startDate: dateStart.value, endDate: dateEnd.value };
  url.search = new URLSearchParams(params).toString();
  await fetch(url)
    .then((response) => response.json())
    .then((json) => {
      records = json;
    })
    .catch(function (error) {
      console.log("request failed", error);
    });
};

getHistoryBtn.addEventListener("click", getHistoryJson);

// drawing HTML by using JSON "records"..... fuck....
const showHistory = document.querySelector("div.showHistory");
