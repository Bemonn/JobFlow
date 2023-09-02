// Sign up handler
document.addEventListener("DOMContentLoaded", () => {
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
    // Basic client-side validation
    if (
      !first_name ||
      !last_name ||
      !username ||
      !position ||
      !password ||
      !confirm_password
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirm_password) {
      alert("Passwords do not match.");
      return;
    }

    // Make the server request
    try {
      const response = await fetch("/signup", {
        method: "POST",
        body: JSON.stringify({
          first_name,
          last_name,
          username,
          position,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });

      console.log("Password:", password);
      console.log("Confirm Password:", confirm_password);
      console.log("Response:", response);

      // GET /tasks
      if (response.ok) {
        document.location.replace("/tasks");
      } else {
        alert("Failed to sign up.");
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error("An error occurred:", error);
      alert("Failed to sign up. Please check your network connection.");
    }
  });
});
