function adminLogin(){

const username =
document.getElementById("username").value.trim();

const password =
document.getElementById("password").value.trim();

if(
username==="admin"
&&
password==="12345"
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

sessionStorage.removeItem(
"adminLoggedIn"
);

window.location.replace(
"admin.html"
);
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
oninput="calculatePreview()"
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

function saveStudent(){

const status =
document.getElementById("publishStatus").value;

localStorage.setItem(
"publishStatus",
status
);

alert(
"Demo Saved Successfully"
);

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

let rank="Unsatisfied";

if(percentage>=90){

rank="1st";

}
else if(percentage>=80){

rank="2nd";

}
else if(percentage>=70){

rank="3rd";

}

document.getElementById("previewRank").textContent =
rank;

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
