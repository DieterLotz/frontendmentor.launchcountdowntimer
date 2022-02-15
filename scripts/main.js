const launchDateKey = 'LaunchDate';
const daysTillLaunch = 14;

let storedLaunchDateString = localStorage.getItem(launchDateKey);

if(storedLaunchDateString == null)
{
    storedLaunchDateString = CalculateLaunchDate();
}

const storedFutureDate = new Date(storedLaunchDateString);

let tickInterval = setInterval(() => {
    let now = new Date();
    let difference = storedFutureDate.getTime() - now.getTime();

    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    console.log(`${days} + ' days'+ ${hours} + ' hours' + ${minutes} + ' minutes' + ${seconds} + ' seconds'`);
    
    days = (days < 10) ? `0${days}` : days;
    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;

    let daysElement = document.getElementById('days');
    let hoursElement = document.getElementById('hours');
    let minutesElement = document.getElementById('minutes');
    let secondsElement = document.getElementById('seconds');

    let listOfChanged = 
        [
            new KeyValuePair('days', HasChanged(daysElement.innerText, days)), 
            new KeyValuePair('hours', HasChanged(hoursElement.innerText, hours)),
            new KeyValuePair('minutes', HasChanged(minutesElement.innerText, minutes)),
            new KeyValuePair('seconds', HasChanged(secondsElement.innerText, seconds)),
        ];
    

    listOfChanged.forEach(e => {
        if(e.value == true){
            let element = document.getElementById(`${e.key}-top`);
            element.classList.add('flip');
            element.addEventListener("animationend", () => {
                element.classList.remove('flip');
            });
        }
    });

    daysElement.innerText = days;    
    hoursElement.innerText = hours;    
    minutesElement.innerText = minutes;    
    secondsElement.innerText = seconds;    

    if(difference < 0){
        localStorage.removeItem(launchDateKey);
        clearInterval(tickInterval);
    }

}, 1000);

class KeyValuePair {
    constructor(key , value){
        this.key = key;
        this.value = value;
    }
}

function CalculateLaunchDate(){
    const today = new Date();
    const res = today.setDate(today.getDate() + daysTillLaunch);
    const launchDate = new Date(res);
    localStorage.setItem(launchDateKey,launchDate.toString());

    return launchDate.toString();
}

function HasChanged(oldValue, newValue){
    return (oldValue == newValue) ? false : true;
}

