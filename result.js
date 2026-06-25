/*=========================================
RESULT PAGE JAVASCRIPT
PART - 6A
=========================================*/


/*=========================================
STUDENT DATABASE
=========================================*/

const studentResults={

"304":{

name:"Shreya Kumari",

marks:{

English:91,

Hindi:94,

Mathematics:96,

Science:93,

"Social Science":92,

Computer:98

},

rank:2

},

"306":{

name:"Advik Singh",

marks:{

English:85,

Hindi:88,

Mathematics:91,

Science:90,

"Social Science":89,

Computer:95

},

rank:6

},

"309":{

name:"Sonali Singh",

marks:{

English:90,

Hindi:91,

Mathematics:94,

Science:92,

"Social Science":93,

Computer:96

},

rank:4

},

"310":{

name:"Akansha Singh",

marks:{

English:95,

Hindi:98,

Mathematics:99,

Science:97,

"Social Science":96,

Computer:100

},

rank:1

},

"311":{

name:"Ayush Kumar",

marks:{

English:84,

Hindi:86,

Mathematics:88,

Science:89,

"Social Science":87,

Computer:92

},

rank:7

},

"312":{

name:"Shreyansh Singh",

marks:{

English:92,

Hindi:95,

Mathematics:97,

Science:94,

"Social Science":93,

Computer:99

},

rank:3

},

"313":{

name:"Shristi Singh",

marks:{

English:88,

Hindi:90,

Mathematics:92,

Science:91,

"Social Science":90,

Computer:94

},

rank:5

},

"314":{

name:"Anshika Singh",

marks:{

English:82,

Hindi:84,

Mathematics:86,

Science:87,

"Social Science":85,

Computer:90

},

rank:9

},

"315":{

name:"Aarnav Singh",

marks:{

English:83,

Hindi:85,

Mathematics:87,

Science:88,

"Social Science":86,

Computer:91

},

rank:8

}

};


/*=========================================
GET SESSION
=========================================*/

const roll=sessionStorage.getItem("studentRoll");

const student=studentResults[roll];

if(!student){

window.location.href="index.html";

}


/*=========================================
GET HTML ELEMENTS
=========================================*/

const studentName=document.getElementById("studentName");

const studentRoll=document.getElementById("studentRoll");

const marksTable=document.getElementById("marksTable");

const totalMarks=document.getElementById("totalMarks");

const percentage=document.getElementById("percentage");

const grade=document.getElementById("grade");

const rank=document.getElementById("rank");

const remarks=document.getElementById("remarks");

const loading=document.getElementById("resultLoading");
/*=========================================
LOAD STUDENT DETAILS
=========================================*/

studentName.textContent = student.name;

studentRoll.textContent = roll;


/*=========================================
GENERATE MARKS TABLE
=========================================*/

let total = 0;

let subjectCount = 0;

marksTable.innerHTML = "";

for (const subject in student.marks) {

    const mark = student.marks[subject];

    total += mark;

    subjectCount++;

    let gradeText = "";

    if (mark >= 90) {

        gradeText = "A+";

    }

    else if (mark >= 80) {

        gradeText = "A";

    }

    else if (mark >= 70) {

        gradeText = "B";

    }

    else if (mark >= 60) {

        gradeText = "C";

    }

    else {

        gradeText = "D";

    }

    marksTable.innerHTML += `

<tr>

<td>${subject}</td>

<td>${mark}</td>

<td>${gradeText}</td>

</tr>

`;

}


/*=========================================
TOTAL & PERCENTAGE
=========================================*/

const maximumMarks = subjectCount * 100;

const percent = (total / maximumMarks) * 100;

totalMarks.textContent = `${total} / ${maximumMarks}`;

percentage.textContent = percent.toFixed(2) + "%";


/*=========================================
FINAL GRADE
=========================================*/

let finalGrade = "";

if (percent >= 90) {

    finalGrade = "A+";

}

else if (percent >= 80) {

    finalGrade = "A";

}

else if (percent >= 70) {

    finalGrade = "B";

}

else if (percent >= 60) {

    finalGrade = "C";

}

else {

    finalGrade = "D";

}

grade.textContent = finalGrade;


/*=========================================
RANK
=========================================*/

rank.textContent = "#" + student.rank;


/*=========================================
TEACHER REMARKS
=========================================*/

if (percent >= 95) {

    remarks.textContent =

    "Outstanding performance! Keep shining.";

}

else if (percent >= 90) {

    remarks.textContent =

    "Excellent work! Keep it up.";

}

else if (percent >= 80) {

    remarks.textContent =

    "Very good performance.";

}

else if (percent >= 70) {

    remarks.textContent =

    "Good effort. Keep improving.";

}

else {

    remarks.textContent =

    "Work harder and practice regularly.";

}


/*=========================================
PASS STATUS
=========================================*/

document.getElementById("studentStatus").textContent = "PASS";


/*=========================================
HIDE LOADING
=========================================*/

window.addEventListener("load", () => {

    setTimeout(() => {

        loading.style.display = "none";

    }, 1500);

});
/*=========================================
PRINT RESULT
=========================================*/

document.getElementById("printBtn").addEventListener("click",()=>{

window.print();

});


/*=========================================
DOWNLOAD PDF
=========================================*/

document.getElementById("downloadBtn").addEventListener("click",()=>{

alert(

"PDF Download feature will be added in the next version."

);

});


/*=========================================
LOGOUT
=========================================*/

document.getElementById("logoutBtn").addEventListener("click",()=>{

if(confirm("Are you sure you want to logout?")){

sessionStorage.clear();

window.location.href="index.html";

}

});


/*=========================================
STATUS BADGE
=========================================*/

const badge=document.getElementById("badgeText");

if(percent>=95){

badge.textContent="Top Performer";

}

else if(percent>=90){

badge.textContent="Excellent Result";

}

else if(percent>=80){

badge.textContent="Very Good";

}

else{

badge.textContent="Keep Improving";

}


/*=========================================
ACHIEVEMENT
=========================================*/

const achievement=document.getElementById("achievementText");

if(student.rank===1){

achievement.textContent="Congratulations! You secured Rank 1.";

}

else if(student.rank<=3){

achievement.textContent="Excellent! You are among the Top 3 Students.";

}

else{

achievement.textContent="Keep learning and aim even higher.";

}


/*=========================================
CONFETTI EFFECT
=========================================*/

const confetti=document.getElementById("confettiContainer");

const colors=[

"#ff5252",

"#ffeb3b",

"#4caf50",

"#2196f3",

"#ff9800",

"#9c27b0"

];

for(let i=0;i<80;i++){

const piece=document.createElement("div");

piece.className="confetti";

piece.style.left=Math.random()*100+"%";

piece.style.background=

colors[Math.floor(Math.random()*colors.length)];

piece.style.animationDelay=Math.random()*5+"s";

piece.style.animationDuration=(3+Math.random()*3)+"s";

confetti.appendChild(piece);

}


/*=========================================
WELCOME EFFECT
=========================================*/

setTimeout(()=>{

alert(

"Welcome "+student.name+

"!\nYour result has been loaded successfully."

);

},800);


/*=========================================
CURRENT DATE
=========================================*/

console.log(

"Result Viewed On : "+

new Date().toLocaleString()

);


/*=========================================
END OF PROJECT
=========================================*/

console.log(

"Student Result Portal Loaded Successfully."

);
