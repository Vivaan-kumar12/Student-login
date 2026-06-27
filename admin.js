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

marksEditor.innerHTML+=`

<div class="subject-row">

<label>

${subject}

</label>

<input
type="number"
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

alert(
"Demo Mode\n\nChanges are visible only in this session.\nPermanent Save will be added with Firebase Database in Chapter 5."
);

}
