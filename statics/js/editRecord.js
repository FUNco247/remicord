//레코드 어레이를 수정하여 저장된 데이터와 교체한다
let recordArr;
// boolean to string 'O' or '-'

const booleanToString = (arr) => {
  //console.log(arr);
  arr.forEach((element) => {
    element.innerText = element.innerText === "true" ? "O" : "-";
  });
};

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

// recordArr (운행기록) 가져오기 (생성하기)
const dateSelectInput = document.querySelector("input[name=date]");
const getRecord = async () => {
  const url = new URL("http://localhost:8282/record/edit/api");
  const params = { searchDate: dateSelectInput.value };
  url.search = new URLSearchParams(params).toString();
  await fetch(url)
    .then((response) => response.json())
    .then((json) => {
      recordArr = json["record"];
      recordArr.forEach((element) => {
        delete element["_id"];
      });
      //console.log(record);
    });
  await drawRecord(recordArr);
  const tdWater = document.querySelectorAll("td.water");
  const tdOverTime = document.querySelectorAll("td.overTime");
  const tdNightSupport = document.querySelectorAll("td.nightSupport");
  booleanToString(tdWater);
  booleanToString(tdOverTime);
  booleanToString(tdNightSupport);
};

dateSelectInput.addEventListener("input", getRecord);

// recorfArr에 추가하기
const addToListBtn = document.querySelector("button.addToList");

const addToList = async () => {
  const date = document.querySelector("input[name=date]").value;
  const siteName = document.querySelector("input[name=siteName]").value;
  const distance = document.querySelector("input[name=distance]").value;
  const water = document.querySelector("input[name=water]").checked;
  const overTime = document.querySelector("input[name=overTime]").checked;
  const nightSupport = document.querySelector(
    "input[name=nightSupport]"
  ).checked;
  const memo = document.querySelector("input[name=memo]").value;
  const oiling = document.querySelector("input[name=oiling]").value;
  const newRecord = {
    date: new Date(date).toISOString(),
    siteName,
    distance: Number(distance),
    water,
    overTime,
    nightSupport,
    memo,
    oiling: Number(oiling),
  };
  recordArr.push(newRecord);
  //console.log(newRecord);
  await drawRecord(recordArr);
  const tdWater = document.querySelectorAll("td.water");
  const tdOverTime = document.querySelectorAll("td.overTime");
  const tdNightSupport = document.querySelectorAll("td.nightSupport");
  booleanToString(tdWater);
  booleanToString(tdOverTime);
  booleanToString(tdNightSupport);
  //console.log(recordArr);
};

addToListBtn.addEventListener("click", addToList);

//recordArr 에서 제거하기

//recordArr 를 DB에 교체, 저장하기
