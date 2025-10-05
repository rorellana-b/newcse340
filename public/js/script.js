const pswShow = document.querySelector("#btnShow");
if (pswShow) {
  pswShow.addEventListener("click", function () {
    const pswField = document.querySelector("#account_password");
    if (pswField.type === "password") {
      pswField.type = "text";
      pswShow.textContent = "Hide Password";
    } else {
      pswField.type = "password";
      pswShow.textContent = "Show Password";
    }
  });
}
