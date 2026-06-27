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

{roll:"304",name:"Shreya Kumari",class:"1"},

{roll:"313",name:"Shristi Singh",class:"1"},

{roll:"310",name:"Akansha Singh",class:"2"},

{roll:"312",name:"Shreyansh Singh",class:"3"},

{roll:"306",name:"Advik Singh",class:"4"},

{roll:"315",name:"Aarnav Singh",class:"4"},

{roll:"309",name:"Sonali Singh",class:"4"},

{roll:"311",name:"Ayush Kumar",class:"5"},

{roll:"314",name:"Anshika Singh",class:"6"}

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
