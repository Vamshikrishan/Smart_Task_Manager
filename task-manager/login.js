const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("loginError");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "" || password === "") {
    errorMsg.textContent = "⚠ Please fill in both fields!";
    errorMsg.classList.add("visible");
    return;
  }

  if (username === "admin" && password === "1234") {
    errorMsg.textContent = "";
    errorMsg.classList.remove("visible");

    // Small delay + animation
    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = "main.html";
    }, 600);
  } else {
    errorMsg.textContent = "❌ Invalid credentials! Try admin / 1234";
    errorMsg.classList.add("visible", "shake");
    setTimeout(() => errorMsg.classList.remove("shake"), 400);
  }
});
