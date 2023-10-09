// Login functionality
const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const name = document.querySelector("#name-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (name && password) {
        // Send a POST request to the API endpoint
        const response = await fetch(`/api/users/login`, {
            method: "POST",
            body: JSON.stringify({ name, password }),
            headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            // If successful, redirect the browser to the dashboard page
            document.location.replace("/dashboard");
        } else {
            alert("Incorrect name or password, please try again.");
        }
    }
};

// Signup functionality
const signupFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the signup form
    const name = document.querySelector("#name-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    if (name && email && password) {
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            // If successful, redirect the browser to the dashboard page
            document.location.replace("/dashboard");
        } else {
            alert("The username, email, or password is invalid, please try again. Remember, the password must be between 8 to 23 characters, and username and email must be unique.");
        }
    }
};

// Reviews viewport to find appropriate locations to listen in to order to execute functions
document.querySelector(".login-form").addEventListener("submit", loginFormHandler);

document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);