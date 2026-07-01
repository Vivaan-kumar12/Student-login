import { db } from "./Firebase.js";

import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

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



// ==========================
// Student Table
// ==========================
const tableBody = document.getElementById("studentTable");

if (tableBody) {

    loadStudentTable();

}

async function loadStudentTable() {

    tableBody.innerHTML = "";

    const snapshot = await getDocs(
        collection(db, "students")
    );

    snapshot.forEach((docSnap) => {

        const student = docSnap.data();

        tableBody.innerHTML += `
        <tr>

            <td>${docSnap.id}</td>

            <td>${student.name}</td>

            <td>${student.class}</td>

            <td>

                <button onclick="editStudent('${docSnap.id}')">
                    Edit
                </button>

            </td>

        </tr>
        `;

    });

}


// ==========================
// Edit Student
// ==========================

function editStudent(roll) {

    localStorage.setItem("editRoll", roll);

    window.location.href = "edit-student.html";

}

window.editStudent = editStudent;

// ==========================
// Class Subjects
// ==========================

const classSubjects = {

    "1": [
        "English",
        "Math",
        "Hindi",
        "Science",
        "Social Studies",
        "Computer"
    ],

    "2": [
        "English",
        "Math",
        "Hindi",
        "Science",
        "Social Studies",
        "Computer"
    ],

    "3": [
        "English",
        "Math",
        "Hindi",
        "Science",
        "Social Studies",
        "Computer"
    ],

    "4": [
        "English",
        "Math",
        "Hindi",
        "Science",
        "Social Studies"
    ],

    "5": [
        "English",
        "Math",
        "Hindi",
        "Science",
        "Social Studies"
    ],

    "6": [
        "English",
        "Math",
        "Hindi",
        "Science",
        "Social Studies"
    ]

};


// ==========================
// Load Student 
// ==========================
async function loadStudent() {

    const editRoll = localStorage.getItem("editRoll");

    if (!editRoll) return;

    const studentRef = doc(db, "students", editRoll);

    const studentSnap = await getDoc(studentRef);

    if (!studentSnap.exists()) {
        alert("Student not found");
        return;
    }

    const student = studentSnap.data();

    localStorage.setItem("studentClass", student.class);

    document.getElementById("studentName").value = student.name || "";
    document.getElementById("fatherName").value = student.father || "";
    document.getElementById("attendance").value = student.attendance || "";

    loadMonths();

    const monthSelect = document.getElementById("month");
    monthSelect.value = "June 2026";

    loadSubjects(student);

    await loadMarksFromFirestore(editRoll, monthSelect.value);

    monthSelect.addEventListener("change", async function () {
        await loadMarksFromFirestore(editRoll, this.value);
    });

}
// ==========================
// Load Months
// ==========================

function loadMonths() {

    const month = document.getElementById("month");

    if (!month) return;

    month.innerHTML = "";

    const months = [
        "June 2026",
        "July 2026",
        "August 2026",
        "September 2026",
        "October 2026",
        "November 2026",
        "December 2026"
    ];

    months.forEach(item => {

        const option = document.createElement("option");

        option.value = item;

        option.textContent = item;

        month.appendChild(option);

    });

}

window.loadMonths = loadMonths;
if (window.location.pathname.includes("edit-student.html")) {
    loadStudent();
}
function loadSubjects(student) {

    const marksEditor = document.getElementById("marksEditor");

    if (!marksEditor) return;

    const subjects = classSubjects[student.class];

    marksEditor.innerHTML = "";

    subjects.forEach(subject => {

        const maxMarks =
            student.class === "1" ||
            student.class === "2" ||
            student.class === "3"
            ? 50
            : 60;

        const passMarks =
            student.class === "1" ||
            student.class === "2" ||
            student.class === "3"
            ? 17
            : 20;

        marksEditor.innerHTML += `
        <div class="subject-row">

            <label>
                ${subject}
                <br>
                <small>
                    Max : ${maxMarks}
                    &nbsp;&nbsp;
                    Pass : ${passMarks}
                </small>
            </label>

            <input
                type="number"
                min="0"
                max="${maxMarks}"
                value="0">

        </div>
        `;
    });

}

async function loadMarksFromFirestore(roll, month) {

    const resultRef = doc(db, "students", roll, "results", month);

    const resultSnap = await getDoc(resultRef);

    if (!resultSnap.exists()) return;

    const data = resultSnap.data();

    const inputs =
        document.querySelectorAll("#marksEditor input");

    const labels =
        document.querySelectorAll("#marksEditor label");

    labels.forEach((label, index) => {

        const subject =
            label.childNodes[0].textContent.trim();

        if (data[subject] !== undefined) {

            inputs[index].value = data[subject];

        }

    });

}

async function saveStudent() {

    const roll = localStorage.getItem("editRoll");

    const studentData = {

        name: document.getElementById("studentName").value,
        father: document.getElementById("fatherName").value,
        class: localStorage.getItem("studentClass"),
        attendance: document.getElementById("attendance").value,
        month: document.getElementById("month").value,
        publishStatus: document.getElementById("publishStatus").value

    };

    try {

    console.log("Roll =", roll);
    console.log(studentData);
    alert("Saving document: " + roll);

    await setDoc(
        doc(db, "students", roll),
        studentData,
        { merge: true }
    );
      const month = document.getElementById("month").value;

const inputs = document.querySelectorAll("#marksEditor input");

const resultData = {};

const labels = document.querySelectorAll("#marksEditor label");

labels.forEach((label, index) => {

    const subject =
        label.childNodes[0].textContent.trim();

    resultData[subject] =
        Number(inputs[index].value);

});
      console.log(resultData);

await setDoc(

    doc(db, "students", roll, "results", month),

    resultData

);

    const checkDoc = await getDoc(doc(db, "students", roll));

    alert(JSON.stringify(checkDoc.data()));

    alert("Student data saved successfully.");

} catch (error) {

    alert(error.message);
    console.error(error);

}

}

window.saveStudent = saveStudent;

function searchStudent() {

    const input =
        document.getElementById("searchStudent")
        .value.toLowerCase();

    const rows =
        document.querySelectorAll("#studentTable tr");

    rows.forEach(row => {

        const roll =
            row.cells[0].textContent.toLowerCase();

        const name =
            row.cells[1].textContent.toLowerCase();

        if (
            roll.includes(input) ||
            name.includes(input)
        ) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}

window.searchStudent = searchStudent;

<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Add Student</title>

<link rel="stylesheet" href="admin.css">

</head>

<body>

<div class="dashboard">

<h1>Add New Student</h1>

<input
type="text"
id="roll"
placeholder="Roll Number">

<input
type="text"
id="studentName"
placeholder="Student Name">

<input
type="text"
id="fatherName"
placeholder="Father Name">

<select id="studentClass">

<option value="">Select Class</option>

<option value="1">Class 1</option>
<option value="2">Class 2</option>
<option value="3">Class 3</option>
<option value="4">Class 4</option>
<option value="5">Class 5</option>
<option value="6">Class 6</option>

</select>

<input
type="text"
id="attendance"
placeholder="Attendance (Example: 95%)">

<br><br>

<button onclick="addStudent()">
Save Student
</button>

<br><br>

<button onclick="window.location.href='dashboard.html'">
⬅ Back
</button>

</div>

<script type="module" src="admin.js"></script>

</body>

</html>
