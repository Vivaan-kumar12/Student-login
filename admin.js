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

    alert("Logout function called");

    sessionStorage.clear();

    window.location.replace("admin.html");

}

window.adminLogout = adminLogout;


// ==========================
// Console Test
// ==========================

console.log("admin.js Loaded Successfully");


// ==========================
// Student List
// ==========================

const studentList = [

{
    roll: "304",
    name: "Shreya Kumari",
    class: "1",
    father: "Pankaj Kumar",
    attendance: "95%"
},

{
    roll: "313",
    name: "Shristi Singh",
    class: "1",
    father: "Sumit Singh",
    attendance: "92%"
},

{
    roll: "310",
    name: "Akansha Singh",
    class: "2",
    father: "Brijesh Rai",
    attendance: "90%"
},

{
    roll: "312",
    name: "Shreyansh Singh",
    class: "3",
    father: "Sushil Singh",
    attendance: "89%"
},

{
    roll: "306",
    name: "Advik Singh",
    class: "4",
    father: "Pappu Singh",
    attendance: "93%"
},

{
    roll: "315",
    name: "Aarnav Singh",
    class: "4",
    father: "Pappu Singh",
    attendance: "91%"
},

{
    roll: "309",
    name: "Sonali Singh",
    class: "4",
    father: "Rajesh Singh",
    attendance: "94%"
},

{
    roll: "311",
    name: "Ayush Kumar",
    class: "5",
    father: "Pankaj Kumar",
    attendance: "88%"
},

{
    roll: "314",
    name: "Anshika Singh",
    class: "6",
    father: "Rajesh Kumar Singh",
    attendance: "96%"
}

];


// ==========================
// Student Table
// ==========================

const tableBody = document.getElementById("studentTable");

if (tableBody) {

    studentList.forEach(student => {

        tableBody.innerHTML += `
        <tr>

            <td>${student.roll}</td>

            <td>${student.name}</td>

            <td>${student.class}</td>

            <td>

                <button onclick="editStudent('${student.roll}')">

                    Edit

                </button>

            </td>

        </tr>
        `;

    });

}
