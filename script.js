import { db } from "./Firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const dropdown = document.getElementById("monthYear");

const months = [
"January","February","March","April",
"May","June","July","August",
"September","October","November","December"
];

for(let year=2026; year<=2027; year++){

    for(let month=0; month<months.length; month++){

        if(year===2026 && month<5){
            continue;
        }

        let option = document.createElement("option");

        option.value =
        months[month] + " " + year;

        option.textContent =
        months[month] + " " + year;

        dropdown.appendChild(option);
    }
}

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

function loginStudent(){

    const name =
    document.getElementById("studentName")
    .value
    .trim();

    const roll =
    document.getElementById("rollNumber")
    .value
    .trim();

    const month =
    document.getElementById("monthYear")
    .value;

    if(
        name==="" ||
        roll==="" ||
        month===""
    ){

        alert(
            "Please fill all fields"
        );

        return;
    }

    const studentFound =
    students.find(student =>

        student.name.toLowerCase()
        ===
        name.toLowerCase()

        &&

        student.roll===roll
    );

    if(!studentFound){

        alert(
        "Invalid Student Name or Roll Number"
        );

        return;
    }

    localStorage.setItem(
        "studentName",
        studentFound.name
    );

    localStorage.setItem(
        "studentRoll",
        studentFound.roll
    );

    localStorage.setItem(
    "selectedMonth",
    month
);

sessionStorage.setItem("loggedIn","true");

document.querySelector(".login-box button").disabled = true;
    
    document.getElementById("loader").style.display = "flex";

setTimeout(function(){

window.location.href = "result.html";

},1500);

}

function updateClock() {

    const now = new Date();

    const optionsDate = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const time = now.toLocaleTimeString('en-IN');

    const date = now.toLocaleDateString(
        'en-IN',
        optionsDate
    );

    const text = `
        ${time}
        <br>
        ${date}
    `;

    const loginClock =
        document.getElementById("liveClock");

    const resultClock =
        document.getElementById("resultClock");

    if(loginClock){
        loginClock.innerHTML = text;
    }

    if(resultClock){
        resultClock.innerHTML = text;
    }
}

setInterval(updateClock,1000);

updateClock();
