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

const students = {
  "304": {
    name: "Shreya Kumari",
    class: "1",
    father: "Pankaj Kumar",
    attendance: "95%",
    results: {
	     		"June 2026": [
      ["English", 50, 17, 45],
      ["Math", 50, 17, 43],
      ["Hindi", 50, 17, 42],
      ["Science", 50, 17, 44],
      ["Social Studies", 50, 17, 46],
      ["Computer", 50, 17, 48]
        ]
     }
  },

  "313": {
    name: "Shristi Singh",
    class: "1",
    father: "Sumit Singh",
    attendance: "92%",
    results: {
			"June 2026": [
      ["English", 50, 17, 40],
      ["Math", 50, 17, 41],
      ["Hindi", 50, 17, 39],
      ["Science", 50, 17, 42],
      ["Social Studies", 50, 17, 43],
      ["Computer", 50, 17, 44]
         ]
     }
  },

  "310": {
    name: "Akansha Singh",
    class: "2",
    father: "Brijesh Rai",
    attendance: "90%",
    	results: {
	  	"June 2026": [
      ["English", 50, 17, 41],
      ["Math", 50, 17, 43],
      ["Hindi", 50, 17, 40],
      ["Science", 50, 17, 44],
      ["Social Studies", 50, 17, 42],
      ["Computer", 50, 17, 45]
         ]
     }
  },

  "312": {
    name: "Shreyansh Singh",
    class: "3",
    father: "Sushil Singh",
    attendance: "89%",
    results: {
		"June 2026": [
      ["English", 50, 17, 23],
      ["Math", 50, 17, 30],
      ["Hindi", 50, 17, 29],
      ["Science", 50, 17, 21],
      ["Social Studies", 50, 17, 25],
      ["Computer", 50, 17, 34]
        ]
     }
  },

  "306": {
    name: "Advik Singh",
    class: "4",
    father: "Pappu Singh",
    attendance: "93%",
    results: {
		"June 2026": [
      ["English", 60, 20, 50],
      ["Math", 60, 20, 48],
      ["Hindi", 60, 20, 49],
      ["Science", 60, 20, 51],
      ["Social Studies", 60, 20, 52]
        ]
     }
  },

  "315": {
    name: "Aarnav Singh",
    class: "4",
    father: "Pappu Singh",
    attendance: "91%",
    results: {
		"June 2026": [
      ["English", 60, 20, 47],
      ["Math", 60, 20, 46],
      ["Hindi", 60, 20, 48],
      ["Science", 60, 20, 49],
      ["Social Studies", 60, 20, 50]
         ]
     }
  },

  "309": {
    name: "Sonali Singh",
    class: "4",
    father: "Rajesh Singh",
    attendance: "94%",
    results: {
	"June 2026": [
      ["English", 60, 20, 25],
      ["Math", 60, 20, 16],
      ["Hindi", 60, 20, 52],
      ["Science", 60, 20, 55],
      ["Social Studies", 60, 20, 20]
        ]
     }
  },

  "311": {
    name: "Ayush Kumar",
    class: "5",
    father: "Pankaj Kumar",
    attendance: "88%",
    results: {
		"June 2026": [
      ["English", 60, 20, 44],
      ["Math", 60, 20, 45],
      ["Hindi", 60, 20, 46],
      ["Science", 60, 20, 47],
      ["Social Studies", 60, 20, 48]
           ]
      }
  },

  "314": {
    name: "Anshika Singh",
    class: "6",
    father: "Rajesh Kumar Singh",
    attendance: "96%",
    results: {
		"June 2026": [
      ["English", 60, 20, 58],
      ["Math", 60, 20, 56],
      ["Hindi", 60, 20, 57],
      ["Science", 60, 20, 58],
      ["Social Studies", 60, 20, 59]
        ]
     }
  },
}


// Get Login Data

const roll = localStorage.getItem("studentRoll");
const month = localStorage.getItem("selectedMonth");
console.log("Selected Month =", month);

const student = students[roll];

const studentRef = doc(db, "students", roll);
const studentSnap = await getDoc(studentRef);

if (studentSnap.exists()) {

    const firestoreData = studentSnap.data();

    student.attendance =
        firestoreData.attendance || student.attendance;

}

const publishStatus =
studentSnap.exists()
    ? studentSnap.data().publishStatus
    : "published";
if(
publishStatus==="unpublished"
){

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
const selectedResult = student.results[month];
console.log(selectedResult);

if (!selectedResult) {

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

// Profile Section

document.getElementById("studentName").textContent = student.name;

document.getElementById("studentRoll").textContent =
  "Class " + student.class + " - A";

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
