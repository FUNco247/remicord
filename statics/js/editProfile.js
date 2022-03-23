const deleteUserAnc = document.querySelector("a.deleteUser");
const confirmDelete = function (e) {
  e.preventDefault();
  if (
    confirm(
      "회원 탈퇴시 저장된 운행기록은 복구할 수 없습니다. 정말 삭제할까요?"
    )
  ) {
    e.preventDefault();
    alert("그동안 이용해주셔서 감사합니다.");
    console.log(this.href);
    window.location = this.href;
  } else {
    location.reload();
  }
};
deleteUserAnc.addEventListener("click", confirmDelete);
