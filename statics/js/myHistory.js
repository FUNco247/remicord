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

// check date range exceed 1 year
const dateValidCheck = async () => {
  const date1 = new Date(dateStart.value);
  const date2 = new Date(dateEnd.value);
  const gap = date2.getTime() - date1.getTime();
  if (gap / (1000 * 60 * 60 * 24) > 364) {
    await alert("최대 조회 가능 기간은 1년입니다.");
    return location.reload();
  } else if (date1.getTime() > date2.getTime()) {
    await alert("시작일이 종료일 이후입니다.");
    return location.reload();
  }
};

// drawing HTML by using JSON "records"..... fuck....
const showHistory = document.querySelector("div.showHistory");
const drawHistoryTable = (obj, keys) => {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const tr = document.createElement("tr");
  // draw table head index
  const theadArr = [
    "날짜",
    "현장명",
    "거리(km)",
    "폐수",
    "OT",
    "야간",
    "주유",
    "메모",
  ];
  for (i = 0; i < theadArr.length; i++) {
    const th = document.createElement("th");
    th.innerText = theadArr[i];
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  // draw table body
  const rowDataKeyArr = [
    "date",
    "siteName",
    "distance",
    "water",
    "overTime",
    "nightSupport",
    "oiling",
    "memo",
  ];
  for (i = 0; i < keys.length; i++) {
    const key = keys[i];
    const recordArr = obj[key];
    const trBody = document.createElement("tr");
    const td = document.createElement("td");
    //td.innerText = key;
    //trBody.appendChild(td);
    for (j = 0; j < recordArr.length; j++) {
      const rowData = recordArr[j];
      for (k = 0; k < rowDataKeyArr.length; k++) {
        const rowDataKey = rowDataKeyArr[k];
        if (rowData[rowDataKey]) {
          td.innerText = rowData[rowDataKey];
          td.classList.add(`${rowDataKey}`);
        } else {
          td.innerText = "-";
          td.classList.add(`${rowDataKey}`);
        }
        //console.log(td.innerText);
        trBody.appendChild(td);
      }
      tbody.append(trBody);
    }
  }
  // insert head & body
  table.appendChild(thead);
  table.appendChild(tbody);
  showHistory.appendChild(table);
};

//get fetch, record.json

let records;
const getHistoryJson = async () => {
  //input validation check
  dateValidCheck();
  //
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
  console.log(records);
  const objKeys = Object.keys(records);
  console.log(objKeys);
  await drawHistoryTable(records, objKeys);
};

getHistoryBtn.addEventListener("click", getHistoryJson);
