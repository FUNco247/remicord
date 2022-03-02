const todayList = document.querySelectorAll("div.todayList");
const rewriteBtn = document.querySelectorAll("button.rewriteBtn");
const removeBtn = document.querySelectorAll("button.removeBtn");

console.log(todayList);

rewriteBtn[0].addEventListener("click", (e) => {
  console.log(e.target);
});

rewriteBtn[1].addEventListener("click", (e) => {
  console.log(e.target);
});
