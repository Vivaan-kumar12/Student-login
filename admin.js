if(!localStorage.getItem("adminPassword")){

localStorage.setItem(
"adminPassword",
"12345"
);

}

function adminLogin(){

// Login code

}
window.adminLogin = adminLogin;
  
const username =
document.getElementById("username").value.trim();

const password =
document.getElementById("password").value.trim();

if(
username==="admin"
&&
password===localStorage.getItem("adminPassword")
){

sessionStorage.setItem(
"adminLoggedIn",
"true"
);

window.location.href = "dashboard.html";

}
else{

alert("Invalid Username or Password");

}

}

if(
window.location.pathname
.includes("dashboard.html")
){

if(
sessionStorage.getItem("adminLoggedIn")
!=="true"
){

window.location.replace(
"admin.html"
);

}

}

function adminLogout(){

// Logout code

}

window.adminLogout = adminLogout;

if(
confirm(
"Are you sure you want to logout?"
)
){

sessionStorage.removeItem(
"adminLoggedIn"
);

window.location.replace(
"admin.html"
);

}

}

const studentList = [

{roll:"304",name:"Shreya Kumari",class:"1",father:"Pankaj Kumar",attendance:"95%"},

{roll:"313",name:"Shristi Singh",class:"1",father:"Sumit Singh",attendance:"92%"},

{roll:"310",name:"Akansha Singh",class:"2",father:"Brijesh Rai",attendance:"90%"},

{roll:"312",name:"Shreyansh Singh",class:"3",father:"Sushil Singh",attendance:"89%"},

{roll:"306",name:"Advik Singh",class:"4",father:"Pappu Singh",attendance:"93%"},

{roll:"315",name:"Aarnav Singh",class:"4",father:"Pappu Singh",attendance:"91%"},

{roll:"309",name:"Sonali Singh",class:"4",father:"Rajesh Singh",attendance:"94%"},

{roll:"311",name:"Ayush Kumar",class:"5",father:"Pankaj Kumar",attendance:"88%"},

{roll:"314",name:"Anshika Singh",class:"6",father:"Rajesh Kumar Singh",attendance:"96%"}

];

const classSubjects={

"1":[
"English",
"Math",
"Hindi",
"Science",
"Social Studies",
"Computer"
],

"2":[
"English",
"Math",
"Hindi",
"Science",
"Social Studies",
"Computer"
],

"3":[
"English",
"Math",
"Hindi",
"Science",
"Social Studies",
"Computer"
],

"4":[
"English",
"Math",
"Hindi",
"Science",
"Social Studies"
],

"5":[
"English",
"Math",
"Hindi",
"Science",
"Social Studies"
],

"6":[
"English",
"Math",
"Hindi",
"Science",
"Social Studies"
]

};

const tableBody =
document.getElementById("studentTable");

if(tableBody){

studentList.forEach(student=>{

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

function editStudent(roll){

localStorage.setItem(
"editRoll",
roll
);

window.location.href =
"edit-student.html";

}

const editRoll =
localStorage.getItem("editRoll");

if(
window.location.pathname
.includes("edit-student.html")
){

const student =
studentList.find(s=>s.roll===editRoll);

if(student){

document.getElementById("studentName").value =
student.name;

document.getElementById("fatherName").value =
student.father;

document.getElementById("attendance").value =
student.attendance;

loadMonths();

document.getElementById("month").value =
"June 2026";
}

  const marksEditor=
document.getElementById("marksEditor");

if(marksEditor){

marksEditor.innerHTML="";

const subjects=
classSubjects[student.class];

subjects.forEach(subject=>{

const maxMarks =
(student.class=="1" ||
student.class=="2" ||
student.class=="3")
?50:60;

const passMarks =
(student.class=="1" ||
student.class=="2" ||
student.class=="3")
?17:20;

marksEditor.innerHTML+=`

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
oninput="validateMarks(this);calculatePreview()"
placeholder="Marks">

</div>

`;

});
}

document.getElementById(
"fatherName"
).value = "";

document.getElementById(
"attendance"
).value = "";

document.getElementById(
"month"
).value = "";

}

async function saveStudent() {

const roll = localStorage.getItem("editRoll");

const status =
document.getElementById("publishStatus").value;

await setDoc(doc(db, "students", roll), {

roll: roll,

name: document.getElementById("studentName").value,

father:
document.getElementById("fatherName").value,

attendance:
document.getElementById("attendance").value,

month:
document.getElementById("month").value,

publishStatus: status

});

alert("Student Saved Successfully");
}

function calculatePreview(){

const inputs =
document.querySelectorAll("#marksEditor input");

let total = 0;

let max = 0;

inputs.forEach(input=>{

const value =
Number(input.value)||0;

total += value;

if(inputs.length==6){

max += 50;

}
else{

max += 60;

}

});

const percentage =
((total/max)*100).toFixed(2);

document.getElementById("previewTotal").textContent =
total+" / "+max;

document.getElementById("previewPercentage").textContent =
percentage+"%";

let grade="E";

if(percentage>=90){

grade="A+";

}
else if(percentage>=80){

grade="A";

}
else if(percentage>=70){

grade="B";

}

document.getElementById("previewGrade").textContent =
grade;

document.getElementById("previewStatus").textContent =
percentage>=33 ? "PASS" : "FAIL";

}

  let comment="";

if(percentage>=80){

comment=
"Excellent performance! Keep up the good work. Stay focused and aim higher.";

}
else{

comment=
"Needs hard work and regular practice for better improvement.";

}

document.getElementById("previewComment").textContent =
comment;

function loadMonths(){

const monthSelect =
document.getElementById("month");

if(!monthSelect){

return;

}

monthSelect.innerHTML="";

const months=[

"January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December"

];

for(let year=2026;year<=2027;year++){

for(let i=0;i<months.length;i++){

if(year===2026 && i<5){

continue;

}

const option=
document.createElement("option");

option.value=
months[i]+" "+year;

option.textContent=
months[i]+" "+year;

monthSelect.appendChild(option);

}

}

  }

function changeMonth(){

const selectedMonth =
document.getElementById("month").value;

alert(
"Selected Month : " +
selectedMonth +
"\n\nDatabase support will be added in Chapter 5."
);

}

function changePassword(){

const oldPass =
document.getElementById("oldPassword").value;

const newPass =
document.getElementById("newPassword").value;

const confirmPass =
document.getElementById("confirmPassword").value;

const currentPass =
localStorage.getItem("adminPassword");

if(oldPass!==currentPass){

alert("Old Password is Incorrect");

return;

}

if(newPass.length<4){

alert("Password must be at least 4 characters");

return;

}

if(newPass!==confirmPass){

alert("Passwords do not match");

return;

}

localStorage.setItem(
"adminPassword",
newPass
);

alert("Password Changed Successfully");

window.location.href="dashboard.html";

}

function searchStudent(){

const input =
document.getElementById("searchStudent");

if(!input){

return;

}

const filter =
input.value.toLowerCase();

const rows =
document.querySelectorAll(".student-table tbody tr");

rows.forEach(row=>{

const text =
row.textContent.toLowerCase();

row.style.display =
text.includes(filter)
?
""
:
"none";

});

}

function validateMarks(input){

const max =
Number(input.max);

if(Number(input.value)>max){

input.value=max;

}

if(Number(input.value)<0){

input.value=0;

}

}

window.saveStudent = saveStudent;
window.editStudent = editStudent;
window.changeMonth = changeMonth;
window.changePassword = changePassword;
window.searchStudent = searchStudent;
window.validateMarks = validateMarks;
