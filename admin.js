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

const studentRef = doc(db, "students", editRoll);

const studentSnap = await getDoc(studentRef);

if (studentSnap.exists()) {

    const student = studentSnap.data();

        // Fill basic details
        document.getElementById("studentName").value = student.name;
        document.getElementById("fatherName").value = student.father;
        document.getElementById("attendance").value = student.attendance;

        // Load months
        loadMonths();

        // Default month
        const monthSelect = document.getElementById("month");
        monthSelect.value = "June 2026";

        // Load subjects first
        loadSubjects(student);

        // Then load marks from Firestore
        loadMarksFromFirestore(editRoll, monthSelect.value);

        // When month changes → reload marks
        monthSelect.addEventListener("change", function () {
            loadMarksFromFirestore(editRoll, this.value);
        });

    }
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
        class: document.getElementById("studentClass").value,
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
