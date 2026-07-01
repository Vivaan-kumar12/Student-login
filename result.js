alert("Result JS Started");
import { db } from "./Firebase.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

if(sessionStorage.getItem("loggedIn") !== "true"){

    alert(
    "Session Expired. Please Login Again."
    );

    window.location.href = "index.html";

}
// Student Data



// Get Login Data

const roll = localStorage.getItem("studentRoll");
const month = localStorage.getItem("selectedMonth");
console.log("Selected Month =", month);

const student = {};

const studentRef = doc(db, "students", roll);

const studentSnap = await getDoc(studentRef);

if (!studentSnap.exists()) {

    alert("Student data not found");

    window.location.href = "index.html";

    throw new Error("Student Not Found");

}

Object.assign(student, studentSnap.data());

const publishStatus =
    student.publishStatus || "published";
{

document.body.innerHTML=`

<div style="

text-align:center;

padding:80px;

font-family:Arial;

">

<h1>

Result Not Published Yet

</h1>

<p>

Please contact your Examiner.

</p>

</div>

`;

throw new Error(
"Result Hidden"
);

}

if (!student) {
    alert("Student data not found");
    window.location.href = "index.html";
}

console.log(student);
console.log(month);
console.log(student.results);


const resultRef = doc(db, "students", roll, "results", month);
const resultSnap = await getDoc(resultRef);

if (!resultSnap.exists()) {

document.body.innerHTML = `
<div style="
text-align:center;
padding:100px;
font-family:Arial;
">
<h1>Result Not Uploaded Yet</h1>
<p>Result for ${month} is not available.</p>
</div>
`;

throw new Error("Result Not Uploaded");
}

const data = resultSnap.data();
console.log(data);
const classSubjects = {
    "1": ["English", "Math", "Hindi", "Science", "Social Studies", "Computer"],
    "2": ["English", "Math", "Hindi", "Science", "Social Studies", "Computer"],
    "3": ["English", "Math", "Hindi", "Science", "Social Studies", "Computer"],
    "4": ["English", "Math", "Hindi", "Science", "Social Studies"],
    "5": ["English", "Math", "Hindi", "Science", "Social Studies"],
    "6": ["English", "Math", "Hindi", "Science", "Social Studies"]
};

const subjects = classSubjects[student.class];

const maxMarks =
    ["1", "2", "3"].includes(student.class) ? 50 : 60;

const passMarks =
    ["1", "2", "3"].includes(student.class) ? 17 : 20;

const selectedResult = subjects.map(subject => [
    subject,
    maxMarks,
    passMarks,
    data[subject] || 0
]);
// Profile Section

document.getElementById("studentName").textContent = student.name;

document.getElementById("studentRoll").textContent =
    "Roll No: " + roll + " | Class " + student.class;

document.getElementById("fatherName").textContent =
  student.father;

document.getElementById("month").textContent =
  month;

// Table

let totalMarks = 0;
let maxMarks = 0;

const table = document.getElementById("marksTable");

selectedResult.forEach(subject => {

  const subjectName = subject[0];
  const max = subject[1];
  const pass = subject[2];
  const marks = subject[3];

  totalMarks += marks;
  maxMarks += max;

  const status =
    marks >= pass ? "Pass" : "Fail";

  table.innerHTML += `
    <tr>
      <td>${subjectName}</td>
      <td>${max}</td>
      <td>${pass}</td>
      <td>${marks}</td>
      <td>${status}</td>
    </tr>
  `;
});

// Percentage

const percentage =
((totalMarks / maxMarks) * 100)
.toFixed(2);

document.getElementById("totalMarks").textContent =
totalMarks + " / " + maxMarks;

document.getElementById("percentage").textContent =
percentage + "%";

// Grade 

let grade = "";

if (percentage >= 90) {
    grade = "A1";
}
else if (percentage >= 80) {
    grade = "A2";
}
else if (percentage >= 70) {
    grade = "B1";
}
else if (percentage >= 60) {
    grade = "B2";
}
else if (percentage >= 50) {
    grade = "C1";
}
else if (percentage >= 40) {
    grade = "C2";
}
else if (percentage >= 33) {
    grade = "D";
}
else {
    grade = "E";
}

document.getElementById("grade").textContent =
grade;

// Attendance

document.getElementById("attendance").textContent =
student.attendance;

// Comment

if (percentage >= 90) {

    document.getElementById("comment").textContent =
    "Excellent performance! Keep up the good work. Stay focused and aim higher.";

}
else if (percentage >= 80) {

    document.getElementById("comment").textContent =
    "Outstanding performance! Keep up the excellent work.";

}
else if (percentage >= 70) {

    document.getElementById("comment").textContent =
    "Good progress! Displays a solid understanding of the lessons.";

}
else if (percentage >= 60) {

    document.getElementById("comment").textContent =
    "Good effort, but needs more practice in core concepts to improve.";

}
else if (percentage >= 50) {

    document.getElementById("comment").textContent =
    "An average performance. Needs to pay closer attention during lessons.";

}
else if (percentage >= 33) {

    document.getElementById("comment").textContent =
    "Must focus more in class and practice regularly at home to improve scores.";

}
else {

    document.getElementById("comment").textContent =
    "Needs hard work and regular practice for better improvement.";

}
function printResult(){

window.print();

}

function downloadPDF(){

window.print();

}

function logoutStudent(){

localStorage.clear();

sessionStorage.clear();

window.location.replace(
"index.html"
);

}
history.pushState(null,null,location.href);

window.onpopstate = function(){

    history.go(1);

};

function updateClock(){

    const clock = document.getElementById("resultClock");

    if(!clock){
        return;
    }

    const now = new Date();

    const time = now.toLocaleTimeString('en-IN');

    const day = now.toLocaleDateString('en-IN',{
        weekday:'long'
    });

    const date = now.toLocaleDateString('en-IN',{
        day:'numeric',
        month:'long',
        year:'numeric'
    });

    clock.innerHTML =
    `${time} | ${day} | ${date}`;
}

updateClock();
setInterval(updateClock,1000);

window.printResult = printResult;
window.downloadPDF = downloadPDF;
window.logoutStudent = logoutStudent;
