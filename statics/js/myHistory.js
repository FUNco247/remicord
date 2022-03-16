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
const dateValidCheck = () => {
  const date1 = new Date(dateStart.value);
  const date2 = new Date(dateEnd.value);
  const gap = date2.getTime() - date1.getTime();
  if (gap / (1000 * 60 * 60 * 24) > 364) {
    alert("최대 조회 가능 기간은 1년입니다.");
    return location.reload();
  } else if (date1.getTime() > date2.getTime()) {
    alert("시작일이 종료일 이후입니다.");
    return location.reload();
  }
};

// drawing HTML by using JSON "records"..... fuck....
const drawHistoryTable = async (obj) => {
  let totalCyles = 0;
  let sumTotalDistance = 0;
  let sumTotalOiling = 0;
  const allkeys = Object.keys(obj);
  const keys = allkeys.filter(
    (e) =>
      /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(e) &&
      e.length < 11
  );
  //console.log(keys);
  const summury = document.querySelector("div.summury");
  const showHistory = document.querySelector("div.showHistory");
  if (showHistory.innerHTML || summury.innerHTML) {
    showHistory.innerHTML = "";
    summury.innerHTML = "";
  }
  const table = document.createElement("table");
  table.classList.add("historyTable");
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
    "주유량(L)",
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
  for (let key of keys) {
    const recordArr = obj[key];
    //td.innerText = key;
    //trBody.appendChild(td);
    totalCyles = totalCyles + recordArr.length;
    let endCheck = false;
    for (record of recordArr) {
      const trBody = document.createElement("tr");
      trBody.classList.add("dayRecord");
      for (let i = 0; i < rowDataKeyArr.length; i++) {
        const rowDataKey = rowDataKeyArr[i];
        const td = document.createElement("td");
        if (record[rowDataKey]) {
          td.innerText = record[rowDataKey];
          td.classList.add(`${rowDataKey}`);
        } else {
          td.innerText = "-";
          td.classList.add(`${rowDataKey}`);
        }
        trBody.appendChild(td);
        if (i === rowDataKeyArr.length - 1) {
          endCheck = true;
        }
      }
      tbody.appendChild(trBody);
    }
    if (endCheck) {
      const sumTr = document.createElement("tr");
      const sumTd = document.createElement("td");
      sumTr.classList.add("daySum");
      sumTr.appendChild(sumTd);
      sumTd.setAttribute("colspan", "8");
      const sumDayData = obj[`${key}_sum`];
      console.log(key, sumDayData);
      if (sumDayData.length > 0) {
        const sumDayDistance = sumDayData[0]["totalDistance"];
        const sumDayOiling = sumDayData[0]["totalOiling"];
        //console.log(sumDayDistance, sumDayOiling);
        sumTd.innerText = `소 계 ▷ ${recordArr.length} 회전, 주행거리 : ${sumDayDistance} km, 주유량 : ${sumDayOiling} 리터`;
      } // 소계를 삽입할 방법을 강구해보자.....
      tbody.appendChild(sumTr);
    }
  }
  const sumTotalData = obj["sumTotal"];
  if (sumTotalData.length > 0) {
    sumTotalDistance = sumTotalData[0]["totalDistance"];
    sumTotalOiling = sumTotalData[0]["totalOiling"];
    sumTotalWater = sumTotalData[0]["totalWater"];
    sumTotalOverTime = sumTotalData[0]["totalOverTime"];
    sumTotalNightSupport = sumTotalData[0]["totalNightSupport"];
    //console.log(sumTotalDistance, sumTotalOiling);
    summury.innerHTML = `Total ▶ <span>${totalCyles}</span> 회전, 주행거리 : <span>${sumTotalDistance}</span> km, 
    주유량 : <span>${sumTotalOiling}</span> 리터, 회수수 : <span>${sumTotalWater}</span> 회, OT : ${sumTotalOverTime} 회, 야간 : ${sumTotalNightSupport} 회`;
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
  //console.log(records);
  //console.log(objKeys);
  await drawHistoryTable(records);
  const tdDateArr = document.querySelectorAll("td.date");
  const tdWaterArr = document.querySelectorAll("td.water");
  const tdOverTimeArr = document.querySelectorAll("td.overTime");
  const tdNightSupportArr = document.querySelectorAll("td.nightSupport");
  tdDateArr.forEach((x) => (x.innerText = x.innerText.split("T")[0]));
  tdWaterArr.forEach(
    (x) => (x.innerText = x.innerText == 1 ? "O" : x.innerText)
  );
  tdOverTimeArr.forEach(
    (x) => (x.innerText = x.innerText == 1 ? "O" : x.innerText)
  );
  tdNightSupportArr.forEach(
    (x) => (x.innerText = x.innerText == 1 ? "O" : x.innerText)
  );
};

getHistoryBtn.addEventListener("click", getHistoryJson);
