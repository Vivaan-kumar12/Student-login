import { db } from "./Firebase.js";

import {
doc,
setDoc,
getDoc
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";



if (!localStorage.getItem("adminPassword")) {

localStorage.setItem(
"adminPassword",
"12345"
);

}



function adminLogin() {

const username =
document.getElementById("username");

const password =
document.getElementById("password");

if (!username || !password) {
return;
}

const user =
username.value.trim();

const pass =
password.value.trim();

if (
user === "admin" &&
pass === localStorage.getItem("adminPassword")
) {

sessionStorage.setItem(
"adminLoggedIn",
"true"
);

window.location.href =
"dashboard.html";

}
else{

alert(
"Invalid Username or Password"
);

}

}

window.adminLogin = adminLogin;



const currentPage =
window.location.pathname;

if (

currentPage.includes("dashboard.html") ||

currentPage.includes("students.html") ||

currentPage.includes("edit-student.html") ||

currentPage.includes("change-password.html")

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

window.adminLogout = adminLogout;

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", adminLogout);
}

console.log("admin.js loaded");

const logoutBtn = document.getElementById("logoutBtn");

console.log(logoutBtn);

if (logoutBtn) {

console.log("Button Found");

logoutBtn.addEventListener("click", () => {

alert("Logout Button Clicked");

});

}
