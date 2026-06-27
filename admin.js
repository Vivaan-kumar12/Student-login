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

document.getElementById(
"studentName"
).value = "";

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
"Save feature will be added in Chapter 4 Part 4"
);

}
