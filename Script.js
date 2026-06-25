/*==================================================
  STUDENT RESULT PORTAL
  SCRIPT.JS
  PART - 3A
==================================================*/


/*=========================================
VALID STUDENT DATABASE
=========================================*/

const students = [

{

name:"Shreya Kumari",

roll:"304"

},

{

name:"Shristi Singh",

roll:"313"

},

{

name:"Akansha Singh",

roll:"310"

},

{

name:"Shreyansh Singh",

roll:"312"

},

{

name:"Advik Singh",

roll:"306"

},

{

name:"Aarnav Singh",

roll:"315"

},

{

name:"Sonali Singh",

roll:"309"

},

{

name:"Ayush Kumar",

roll:"311"

},

{

name:"Anshika Singh",

roll:"314"

}

];


/*=========================================
GET HTML ELEMENTS
=========================================*/

const form = document.getElementById("loginForm");

const studentName = document.getElementById("studentName");

const rollNumber = document.getElementById("rollNumber");

const message = document.getElementById("message");

const remember = document.getElementById("remember");

const loadingScreen = document.getElementById("loadingScreen");

const successPopup = document.getElementById("successPopup");


/*=========================================
LOAD SAVED DATA
=========================================*/

window.addEventListener("load",()=>{

const savedName = localStorage.getItem("studentName");

const savedRoll = localStorage.getItem("studentRoll");

if(savedName){

studentName.value = savedName;

}

if(savedRoll){

rollNumber.value = savedRoll;

remember.checked = true;

}

});


/*=========================================
CLEAR MESSAGE
=========================================*/

function clearMessage(){

message.innerHTML = "";

message.style.color = "#ffffff";

}


/*=========================================
SHOW ERROR
=========================================*/

function showError(text){

message.style.color = "#ff9d9d";

message.innerHTML = text;

}


/*=========================================
SHOW SUCCESS
=========================================*/

function showSuccess(text){

message.style.color = "#8dffb2";

message.innerHTML = text;

}


/*=========================================
SAVE REMEMBER ME
=========================================*/

function saveRemember(){

if(remember.checked){

localStorage.setItem(

"studentName",

studentName.value.trim()

);

localStorage.setItem(

"studentRoll",

rollNumber.value.trim()

);

}

else{

localStorage.removeItem(

"studentName"

);

localStorage.removeItem(

"studentRoll"

);

}

}