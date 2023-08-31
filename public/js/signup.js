// Sign up handler

const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // Test response
  console.log("goodbye");
  const first_name = document.getElementById("first_name").value.trim();
  const last_name = document.getElementById("last_name").value.trim();
  const username = document.getElementById("username").value.trim();
  const position = document.getElementById("position").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirm_password = document
    .getElementById("confirm_password")
    .value.trim();

  if (
    first_name &&
    last_name &&
    username &&
    position &&
    password &&
    confirm_password
  ) {
    const response = await fetch("/signup", {
      method: "POST",
      body: JSON.stringify({
        first_name,
        last_name,
        username,
        position,
        password,
        confirm_password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/tasks");
    } else {
      alert("Failed to sign up");
    }
  }
});
