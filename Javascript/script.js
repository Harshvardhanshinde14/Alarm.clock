document.addEventListener("DOMContentLoaded", function () {
    const setAlarmButton = document.getElementById("setAlarm");
    const alarmsList = document.getElementById("alarmsList");
    let alarms = [];
  
    setAlarmButton.addEventListener("click", function () {
        const hours = parseInt(document.getElementById("hours").value) || 0;
        const minutes = parseInt(document.getElementById("minutes").value) || 0;
        const seconds = parseInt(document.getElementById("seconds").value) || 0;
        const ampm = document.getElementById("ampm").value;
  
        if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
            alert("Invalid time. Please enter a valid time.");
            return;
        }
  
        const alarm = {
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            ampm: ampm,
        };
  
        alarms.push(alarm);
  
        displayAlarms();
  
        clearInputs();
  
        // Start checking alarms if not already started
        if (alarms.length === 1) {
            checkAlarms();
        }
    });
  
    function displayAlarms() {
        alarmsList.innerHTML = "";
  
        alarms.forEach((alarm, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `Alarm ${index + 1}: ${formatTime(
                alarm.hours
            )}:${formatTime(alarm.minutes)}:${formatTime(alarm.seconds)} ${alarm.ampm}`;
            
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete";
            deleteButton.addEventListener("click", () => deleteAlarm(index));
  
            listItem.appendChild(deleteButton);
            alarmsList.appendChild(listItem);
        });
    }
  
    function deleteAlarm(index) {
        alarms.splice(index, 1);
        displayAlarms();
    }
  
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
  
    function clearInputs() {
        document.getElementById("hours").value = "";
        document.getElementById("minutes").value = "";
        document.getElementById("seconds").value = "";
        document.getElementById("ampm").value = "am";
    }
  
    function checkAlarms() {
        alarms.forEach((alarm, index) => {
            const { hours, minutes, seconds, ampm } = alarm;
  
            const currentTime = new Date();
            const currentHours = currentTime.getHours();
            const currentMinutes = currentTime.getMinutes();
            const currentSeconds = currentTime.getSeconds();
            const currentAMPM = currentHours < 12 ? "am" : "pm";
  
            if (
                currentHours === hours &&
                currentMinutes === minutes &&
                currentSeconds === seconds &&
                currentAMPM === ampm
            ) {
                alert(`Alarm ${index + 1} is going off: ${formatTime(
                    hours
                )}:${formatTime(minutes)}:${formatTime(seconds)} ${ampm}`);
                deleteAlarm(index);
            }
        });
  
        setTimeout(checkAlarms, 1000); // Check alarms every second
    }
  });
  