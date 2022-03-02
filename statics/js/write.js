const todayList = document.querySelectorAll("div.todayList");
const removeBtn = document.querySelectorAll("button.removeBtn");

for (let i = 0; i < removeBtn.length; i++) {
  removeBtn[i].addEventListener("click", (e) => {
    const data = e.target.parentElement;
    const siteName = data.querySelector(".siteName").innerText;
    const distance = data.querySelector(".distance").innerText;
    const water = data.querySelector(".water").innerText;
    const overTime = data.querySelector(".overTime").innerText;
    const nightSupport = data.querySelector(".nightSupport").innerText;
    const oiling = data.querySelector(".oiling").innerText;
    const record = {
      siteName,
      distance,
      water,
      overTime,
      nightSupport,
      oiling,
    };
    console.log(record);
  });
}
