const form = document.getElementById("registerForm");
const errorMsg = document.getElementById("registerError");
const successMsg = document.getElementById("registerSuccess");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("regUsername").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const confirm = document.getElementById("regConfirmPassword").value.trim();

  // Basic validation
  if (!username || !email || !password || !confirm) {
    errorMsg.textContent = "⚠ Please fill in all fields!";
    errorMsg.classList.add("visible", "shake");
    setTimeout(() => errorMsg.classList.remove("shake"), 400);
    return;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    errorMsg.textContent = "⚠ Please enter a valid email address!";
    errorMsg.classList.add("visible", "shake");
    return;
  }

  if (password.length < 4) {
    errorMsg.textContent = "⚠ Password must be at least 4 characters!";
    errorMsg.classList.add("visible", "shake");
    return;
  }

  if (password !== confirm) {
    errorMsg.textContent = "⚠ Passwords do not match!";
    errorMsg.classList.add("visible", "shake");
    return;
  }

  // Store data (temporary localStorage demo)
  localStorage.setItem("taskUser", JSON.stringify({ username, email, password }));

  // Show success message
  errorMsg.textContent = "";
  successMsg.textContent = "✅ Registered successfully! Redirecting...";
  successMsg.classList.add("visible");

  // Redirect to login after short delay
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
});
