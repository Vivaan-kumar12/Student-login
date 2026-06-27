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

alert("Login Successful");

}
else{

alert("Invalid Username or Password");

}

}
