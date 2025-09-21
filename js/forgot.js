const form = document.getElementById("forgotForm");
const result = document.getElementById("result");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const newPassword = document.getElementById("newPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  // Get users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Find user index
  const userIndex = users.findIndex(u => u.email === email);

  if (userIndex === -1) {
    result.textContent = " Email not found!";
    result.classList.remove("text-success");
    result.classList.add("text-danger");
    return;
  }

  if (newPassword !== confirmPassword) {
    result.textContent = " Passwords do not match!";
    result.classList.remove("text-success");
    result.classList.add("text-danger");
    return;
  }

  // Update password
  users[userIndex].password = newPassword;
  localStorage.setItem("users", JSON.stringify(users));

  result.textContent = " Password updated successfully! Redirecting...";
  result.classList.remove("text-danger");
  result.classList.add("text-success");

  // Redirect after 2 seconds
  setTimeout(() => {
    window.location.href = "../pages/login.html";
  }, 2000);
});
