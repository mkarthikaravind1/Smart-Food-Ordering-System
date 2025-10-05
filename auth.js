// Only for protected pages
window.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    if (path.includes("menu.html") || path.includes("cart.html") || path.includes("dashboard.html")) {
        if (!localStorage.getItem("isUserLoggedIn")) {
            window.location.href = "login.html";
        }
    }
});

/* ====================== PASSWORD TOGGLE ====================== */
// Automatically attach toggle to all password inputs with a toggle span
document.querySelectorAll(".toggle-password").forEach(span => {
    span.addEventListener("click", () => {
        const input = document.getElementById(span.getAttribute("data-target"));
        input.type = input.type === "password" ? "text" : "password";
    });
});

// /* ====================== PERSISTENT LOGIN CHECK ====================== */
// window.addEventListener("DOMContentLoaded", () => {
//     if (localStorage.getItem("isAdminLoggedIn")) {
//         window.location.href = "dashboard.html";
//     } else if (localStorage.getItem("isUserLoggedIn")) {
//         window.location.href = "menu.html";
//     }
// });

/* ====================== PERSISTENT LOGIN CHECK ====================== */
window.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    // Only redirect if we are on login.html or signup.html
    if (path.includes("login.html") || path.includes("signup.html")) {
        if (localStorage.getItem("isAdminLoggedIn")) {
            window.location.href = "dashboard.html";
         } //else if (localStorage.getItem("isUserLoggedIn")) {
        //     window.location.href = "menu.html";
        // }
    }
});


/* ====================== LOGIN ====================== */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("loginUsername").value.trim();
        const password = document.getElementById("loginPassword").value.trim();
        const errorMsg = document.getElementById("errorMsg");
        const submitBtn = loginForm.querySelector("button");

        errorMsg.innerText = "";

        if (!username || !password) {
            errorMsg.innerText = "❌ Please enter both username and password.";
            setTimeout(() => errorMsg.innerText = "", 3000);
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerText = "Logging in...";

        try {
            const response = await fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                if (data.role && data.role === "admin") {
                    localStorage.setItem("isAdminLoggedIn", "true");
                    window.location.href = "dashboard.html";
                } else {
                    localStorage.setItem("isUserLoggedIn", "true");
                    window.location.href = "index.html";
                }
            } else {
                errorMsg.innerText = `❌ ${data.message || "Login failed. Check credentials."}`;
                setTimeout(() => errorMsg.innerText = "", 3000);
            }
        } catch (err) {
            console.error("Error:", err);
            errorMsg.innerText = "❌ Server error. Please check if backend is running.";
            setTimeout(() => errorMsg.innerText = "", 3000);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = "Login";
        }
    });
}

/* ====================== SIGNUP ====================== */
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("signupUsername").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value.trim();
        const signupMsg = document.getElementById("signupMsg");
        const submitBtn = signupForm.querySelector("button");

        signupMsg.innerText = "";
        signupMsg.style.color = "red";

        if (!username || !email || !password) {
            signupMsg.innerText = "❌ Please fill in all fields.";
            setTimeout(() => signupMsg.innerText = "", 3000);
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerText = "Signing up...";

        try {
            const response = await fetch("http://localhost:3000/api/users/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                signupMsg.style.color = "green";
                signupMsg.innerText = "✅ Signup successful! Redirecting to login...";
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);
            } else {
                signupMsg.innerText = `❌ ${data.message || "Signup failed."}`;
                setTimeout(() => signupMsg.innerText = "", 3000);
            }
        } catch (err) {
            console.error("Error:", err);
            signupMsg.innerText = "❌ Server error. Please check backend.";
            setTimeout(() => signupMsg.innerText = "", 3000);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = "Sign Up";
        }
    });
}
