// login handler

const loginFormHandler = async (event) => {
  event.preventDefault(); // prevent page from refreshing
  // Collect values from the login form
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();
  // If email and password are both provided
  if (email && password) {
    // POST the email and password to the login route
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    // If the response is okay, log the user in
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};
// Event listener for login button
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
// signup handler

const signupFormHandler = async (event) => {
    event.preventDefault(); // prevent page from refreshing
    // Collect values from the signup form
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();
    const confirmPassword = document.querySelector("#confirm_password").value.trim();
    // If first name, last name, email, and password are all provided
    if (username && password && confirmPassword) {
      // POST the username and password to the signup route
      const response = await fetch("/api/user/signup", {
        method: "POST",
        body: JSON.stringify({ username, password, confirmPassword }),
        headers: { "Content-Type": "application/json" },
      });
      // If the response is okay, log the user into the employees page
        if (response.ok) {
            document.location.replace("/employees");
        } else {
            alert(response.statusText);
        }

}
// Event listener for signup button
document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);

