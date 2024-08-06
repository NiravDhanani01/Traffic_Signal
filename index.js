let totalTime = 0;
let totalLight = 4;
let currentPosition = 0

let green = document.querySelectorAll("#green");
let yellow = document.querySelectorAll("#yellow");
let red = document.querySelectorAll("#red");
let timer = document.querySelector("#timer");

const startTrafficLight = () => {
  // let totalTime = parseInt(document.getElementById("userInput").value)
  let totalTime = 12;

  if (!totalTime || totalTime < 0) {
    alert("Enter valid time");
    return;
  }

  let goTime = totalTime / totalLight;
  let waitingTime = totalTime - goTime;
  goGreen(goTime);
};

const goGreen = (time) => {
  let interval = setInterval(() => {
    green.forEach((item,currentPosition) => {
      item.style.backgroundColor = "green";
      });
      if(time < 1){
        green.forEach((item,currentPosition) => {
          item.style.backgroundColor = "";
          });
      clearInterval(interval);
      stopRed(time)
    } 
    time--
  }, 1000);
  countTimer(time);
};

const stopRed = (time) => {
  console.log(time);
  
  let waitingTime = totalTime - time;
  let interval = setInterval(() => {
    red.forEach((item) => {
      item.style.backgroundColor = "red";
    });

    if(time < 1){
      red.forEach((item) => {
        item.style.backgroundColor = "";
      });
    clearInterval(interval);
      }

    waitingTime--
  }, 1000);
  countTimer(waitingTime);
};

const countTimer = (time) => {
  let interval = setInterval(() => {
    timer.textContent = time;
    time--;
    if (time < 1) {
      timer.textContent = "stop";
      clearInterval(interval);
    }
  }, 1000);
};

const yellowBlinking = () =>{
  let interval = setInterval(() => {
    yellow.forEach((item)=>{
      item.style.backgroundColor = "yellow"
    })
  })
}

yellowBlinking()


let totalTime = 12; // Total time for each traffic light
let totalLights = 4; // Total number of traffic lights
let currentLight = 0; // Start with the first light

const lights = document.querySelectorAll('.trafficSignals'); // Select all traffic light elements
const timers = document.querySelectorAll('.timer p'); // Select all timer elements

const startTrafficLight = () => {
  if (!totalTime || totalTime < 0) {
    alert("Enter valid time");
    return;
  }

  // Start the light cycle
  cycleLights(totalTime);
};

const cycleLights = (time) => {
  updateLights(currentLight, time);

  // Set an interval to cycle through the lights
  const interval = setInterval(() => {
    currentLight = (currentLight + 1) % totalLights; // Move to the next light
    updateLights(currentLight, time);

    if (time < 1) {
      clearInterval(interval);
    }
    time--;
  }, time * 1000); // Move to the next light after the specified time
};

const updateLights = (currentLightIndex, time) => {
  lights.forEach((light, index) => {
    if (index === currentLightIndex) {
      light.querySelector('.green').style.backgroundColor = 'green';
      light.querySelector('.red').style.backgroundColor = '';
    } else {
      light.querySelector('.green').style.backgroundColor = '';
      light.querySelector('.red').style.backgroundColor = 'red';
    }
    timers[index].textContent = `${time} s`;
  });
};

// Start the traffic lights when the button is clicked
document.querySelector(".startTime").addEventListener("click", startTrafficLight);
