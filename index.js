let totalTime = 0;
let currentPosition = 0;
let timer1;
let timer2;
let timer3;
let timer4;
let countdown;

let green = document.querySelectorAll("#green");
let yellow = document.querySelectorAll("#yellow");
let red = document.querySelectorAll("#red");
let timer = document.querySelectorAll("#timer");
let firstLine = document.getElementById("1st");
let secondLine = document.getElementById("2nd");
let thirdLine = document.getElementById("3rd");
let forthLine = document.getElementById("4th");

const startTrafficLight = () => {
  totalTime = parseInt(document.getElementById("userInput").value);
  // let totalTime = 100;
  if (isNaN(totalTime) || totalTime < 100) {
    alert("Please enter a valid number greater than 100");
    return;
  }

  let line1 = parseInt(firstLine.value);
  let line2 = parseInt(secondLine.value);
  let line3 = parseInt(thirdLine.value);
  let line4 = parseInt(forthLine.value);

  let finalTime = line1 + line2 + line3 + line4;

  if (finalTime > 100 || finalTime < 100) {
    alert("enter time ratio must be Equal to 100");
    return;
  }

  firstLine = Math.floor((totalTime * line1) / 100);
  secondLine = Math.floor((totalTime * line2) / 100);
  thirdLine = Math.floor((totalTime * line3) / 100);
  forthLine = Math.floor((totalTime * line4) / 100);

  goGreen(firstLine, secondLine, thirdLine, forthLine);

  document.getElementById("userInput").value = "";
  document.getElementById("1st").value = " ";
  document.getElementById("2nd").value = " ";
  document.getElementById("3rd").value = " ";
  document.getElementById("4th").value = " ";
};

// set timer according to ratio, other wise all equal
const goGreen = (firstLine, secondLine, thirdLine, forthLine) => {
  let time;
  let waitingTime;
  clearInterval(countdown);

  function update() {
    if (currentPosition == 0) {
      time = firstLine;
      waitingTime = totalTime - time;
    }
    if (currentPosition == 1) {
      time = secondLine;
      waitingTime = totalTime - time;
    }
    if (currentPosition == 2) {
      time = thirdLine;
      waitingTime = totalTime - time;
    }
    if (currentPosition == 3) {
      time = forthLine;
      waitingTime = totalTime - time;
    }

    // set light according to time
    green.forEach((light) => {
      light.style.backgroundColor = "transparent";
      light.style.boxShadow = "none";
    });
    red.forEach((light) => {
      light.style.backgroundColor = "rgb(255, 0, 0)";
      light.style.boxShadow = "0px 0px 40px rgb(255, 0, 0)";
    });
    timer.forEach((time) => time);

    // at the position light setting
    green[currentPosition].style.backgroundColor = "rgb(0, 255, 0)";
    green[currentPosition].style.boxShadow = "0px 0px 40px rgb(0, 255, 0)";
    red[currentPosition].style.backgroundColor = "transparent";
    red[currentPosition].style.boxShadow = "none";

    let decrementTime = time;

    if (currentPosition === 4) {
      currentPosition = 0;
    }

    countdown = setInterval(() => {
      timer[currentPosition].innerText = `${decrementTime} s`;
      timer[currentPosition].style.color = "green";
      decrementTime--;
      if (decrementTime < 0) {
        currentPosition++;
        clearInterval(countdown);
        update();
      }
    }, 1000);
  }
  update();

  redTimer(currentPosition, firstLine, secondLine, thirdLine, forthLine);
};

const redTimer = (
  currentPosition,
  firstLine,
  secondLine,
  thirdLine,
  forthLine
) => {
  let time;
  function update() {
    if (currentPosition == 0) {
      time = firstLine;
      waitingTime = totalTime - time;
    }
    if (currentPosition == 1) {
      time = secondLine;
      waitingTime = totalTime - time;
    }
    if (currentPosition == 2) {
      time = thirdLine;
      waitingTime = totalTime - time;
    }
    if (currentPosition == 3) {
      time = forthLine;
      waitingTime = totalTime - time;
    }

    timer.forEach((time) => time);

    let decrementTime = time;

    if (currentPosition === 4) {
      currentPosition = 0;
    }

    for (let i = 0; i < currentPosition.length; i++) {
      countdown = setInterval(() => {
        timer[i].innerText = `${decrementTime} s`;
        timer[i].style.color = "red";
        decrementTime--;
        if (decrementTime < 0) {
          currentPosition++;
          clearInterval(countdown);
          update();
        }
      }, 1000);
    }
  }

  update();
};
