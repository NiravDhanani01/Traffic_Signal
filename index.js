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