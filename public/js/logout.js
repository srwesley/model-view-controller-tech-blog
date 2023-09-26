const logout = async () => {
    const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    // If good, sends to main landing page to log in again, or alerts a status error
    if (response.ok) {
        document.location.replace("/");
    } else {
        alert(response.statusText);
    }
};

// Reviews viewport to find appropriate locations to listen in to order to execute function
document.querySelector("#logout").addEventListener("click", logout);