// Functionality for creating a new blogpost
const newFormHandler = async (event) => {
    event.preventDefault();

    console.log("Creating a new post...");

    const title = document.querySelector("#post-title").value.trim();
    const contents = document.querySelector("#post-content").value.trim();

    if (title && contents) {
        const response = await fetch(`/api/blogPost`, {
            method: "POST",
            body: JSON.stringify({ title, contents }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            const errorData = await response.json();
            console.log("Error:", errorData);
            alert("Failed to create post");
        }
    }
};

// Functionality for deleting a blogpost
const delButtonHandler = async (event) => {
    console.log(`This is outside the if statement`);
    if (event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");
        console.log(`The ID is ${id}`);
        const response = await fetch(`/api/blogPost/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Failed to delete post");
        }
    }
};

// Functionality for updating a blogpost
const updateButtonHandler = async (event) => {
    event.preventDefault();
    console.log("Test");

    const title = document.querySelector("#post-title").value.trim();
    const contents = document.querySelector("#post-content").value.trim();
    const id = document.querySelector("#post-id").value.trim();

    const response = await fetch(`/api/blogPost/update${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, contents, id }),
    });

    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert("Failed to update post");
    }
};

// Functionality for adding a comment
// Uses the same variable names that are in the Comment model
const newCommentHandler = async (event) => {
    event.preventDefault();

    const text = document.querySelector("#new-comment").value.trim();
    const blogPostId = document.querySelector("#post-id").value.trim();

    if (text) {
        const response = await fetch(`/api/comments`, {
            method: "POST",
            body: JSON.stringify({ text, blogPostId }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            document.location.replace(`/blogPost/${blogPostId}`);
        } else {
            const errorData = await response.json();
            console.log("Error:", errorData);
            alert("Failed to create post");
        }
    }
};

// Event listener for the create button in the dashboard
if (document.querySelector("#new-blog")) {
    document
        .querySelector("#new-blog")
        .addEventListener("submit", newFormHandler);
}

// Event listener for each delete button in the dashboard by looping through all delete buttons
if (document.querySelector(".del-btn")) {
    document.querySelectorAll(".del-btn").forEach((btn) => {
        btn.addEventListener("click", delButtonHandler);
    });
}

// Event listener for the update button on the "blogPostEdit" page
if (document.querySelector("#update-blog")) {
    document
        .querySelector("#update-blog")
        .addEventListener("submit", updateButtonHandler);
}

// Event listener for the add comment button in the blogpost page
if (document.querySelector("#comment-form")) {
    document
        .querySelector("#comment-form")
        .addEventListener("submit", newCommentHandler);
}