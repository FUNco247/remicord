const today = document.querySelector("input[name=date]").value;
const removeBtn = document.querySelectorAll("button.removeBtn");

// todays record delete
for (let i = 0; i < removeBtn.length; i++) {
  removeBtn[i].addEventListener("click", (e) => {
    const data = e.target.parentElement.parentElement;
    console.log(data);
    const siteName = data.querySelector(".siteName").innerText;
    const distance = data.querySelector(".distance").innerText;
    const water = data.querySelector(".water").innerText;
    const overTime = data.querySelector(".overTime").innerText;
    const nightSupport = data.querySelector(".nightSupport").innerText;
    const oiling = data.querySelector(".oiling").innerText;
    const record = {
      date: today,
      siteName,
      distance,
      water,
      overTime,
      nightSupport,
      oiling,
    };
    fetch("http://localhost:8282/db/record/remove-todays", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(record),
    });
    window.location.reload();
  });
}
