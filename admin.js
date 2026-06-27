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
