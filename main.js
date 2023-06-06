const selectMenu = document.querySelectorAll("select");
const currentTime = document.querySelector("h1");
const setAlarmBtn = document.querySelector("button");
const content = document.querySelector(".content");

let alarmTime, isAlarmSet = false,
ringTone = new Audio("files/ringtone.mp3");


for (let i = 12; i > 0; i--) {
    i = i<10 ? "0" + i : i;
    let option = '<option value='+String(i)+">"+String(i)+'</option>';
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    i = i<10 ? "0" + i : i;
    let option = '<option value='+String(i)+">"+String(i)+'</option>';
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = '<option value='+String(ampm)+">"+String(ampm)+'</option>';
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
    let date = new Date();
    let h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

    if(h>12)
    {
        h = h-12;
        ampm = "PM";
    }

    // If hour value is 0 set it to 12
    h = h == 0 ? h = 12 : h;

    // Adding 0 before hour minute and second
    h = h<10 ? "0" + h : h;
    m = m<10 ? "0" + m : m;
    s = s<10 ? "0" + s : s;

    currentTime.innerText = (String(h) + ":"+ String(m) + ":"+ String(s) + " " + ampm);

    if(alarmTime == (String(h) + ":"+ String(m) + " " + ampm))
    {
        ringTone.play();
        ringTone.loop = true;
    }

}, 1000);

function setAlarm(){

    if(isAlarmSet)
    {
        alarmTime = "";
        ringTone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }


    let time = String(selectMenu[0].value) + ":"+String(selectMenu[1].value)+" "+ String(selectMenu[2].value); 

    if(time.includes("Hour") || time.includes("Minute") ||time.includes("AM/PM"))
    {
        return alert()
    }
    isAlarmSet = true;
    alarmTime = time;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
}

setAlarmBtn.addEventListener("click" , setAlarm);