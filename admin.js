import { db } from "./Firebase.js";
import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ==========================
// Default Admin Password
// ==========================

if (!localStorage.getItem("adminPassword")) {
    localStorage.setItem("adminPassword", "12345");
}


// ==========================
// Admin Login
// ==========================

function adminLogin() {

    const username = document.getElementById("username");
    const password = document.getElementById("password");

    if (!username || !password) return;

    if (
        username.value.trim() === "admin" &&
        password.value.trim() === localStorage.getItem("adminPassword")
    ) {

        sessionStorage.setItem("adminLoggedIn", "true");

        window.location.href = "dashboard.html";

    } else {

        alert("Invalid Username or Password");

    }

}

window.adminLogin = adminLogin;


// ==========================
// Dashboard Security
// ==========================

const page = location.pathname;

if (
    page.includes("dashboard.html") ||
    page.includes("students.html") ||
    page.includes("edit-student.html") ||
    page.includes("change-password.html")
) {

    if (sessionStorage.getItem("adminLoggedIn") !== "true") {

        window.location.replace("admin.html");

    }

}


// ==========================
// Logout
// ==========================

function adminLogout() {

    if (confirm("Logout?")) {

        sessionStorage.clear();

        window.location.replace("admin.html");

    }

}

window.adminLogout = adminLogout;


// ==========================
// Console Test
// ==========================

console.log("admin.js Loaded Successfully");
