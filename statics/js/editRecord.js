// 가져온 기록으로 테이블 채우기
const drawRecord = async (recordArr) => {
  const dataTable = document.querySelector("tbody.dataTable");
  const tableIndex = [
    "siteName",
    "distance",
    "water",
    "overTime",
    "nightSupport",
    "oiling",
  ];
  if (dataTable.innerHTML) {
    dataTable.innerHTML = "";
  }
  for await (record of recordArr) {
    const tr = document.createElement("tr");
    for await (index of tableIndex) {
      const td = document.createElement("td");
      td.classList.add(`${index}`);
      td.innerText = record[index];
      tr.appendChild(td);
    }
    const btn = document.createElement("button");
    btn.classList.add("removeBtn");
    btn.innerText = "삭제";
    tr.appendChild(btn);
    dataTable.appendChild(tr);
  }
};

// 일 운행기록 가져오기
const dateSelectInput = document.querySelector("input[name=date]");
let recordArr;
const getRecord = async () => {
  const url = new URL("http://localhost:8282/record/edit/api");
  const params = { searchDate: dateSelectInput.value };
  url.search = new URLSearchParams(params).toString();
  await fetch(url)
    .then((response) => response.json())
    .then((json) => {
      recordArr = json["record"];
      //console.log(record);
    });
  await drawRecord(recordArr);
  const tdWater = document.querySelectorAll("td.water");
  const tdOverTime = document.querySelectorAll("td.overTime");
  const tdNightSupport = document.querySelectorAll("td.nightSupport");
  const booleanToString = (arr) => {
    console.log(arr);
    arr.forEach((element) => {
      element.innerText = element.innerText === "true" ? "O" : "-";
    });
  };
  booleanToString(tdWater);
  booleanToString(tdOverTime);
  booleanToString(tdNightSupport);
};

dateSelectInput.addEventListener("input", getRecord);

//
