// Простая логика демо-версии REC/Studio

// страница входа: проверка полей и переход в личный кабинет
var loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value;
    var error = document.getElementById("error");

    if (email.indexOf("@") === -1) {
      error.textContent = "Введите корректный email";
      return;
    }
    if (password.length < 6) {
      error.textContent = "Пароль должен быть не короче 6 символов";
      return;
    }
    error.textContent = "";
    window.location.href = "dashboard.html";
  });
}

// дашборд: поиск по списку ближайших сессий
var search = document.getElementById("search");
if (search) {
  search.addEventListener("input", function () {
    var text = search.value.toLowerCase();
    var rows = document.querySelectorAll(".session");
    rows.forEach(function (row) {
      row.style.display = row.textContent.toLowerCase().indexOf(text) === -1 ? "none" : "";
    });
  });
}

// дашборд: кнопка уведомлений
var bell = document.getElementById("bell");
if (bell) {
  bell.addEventListener("click", function () {
    var panel = document.getElementById("notes");
    if (panel) {
      panel.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}
