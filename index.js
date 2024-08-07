let totalTime = 0;
let currentPosition = 0;
let countdown;

let green = document.querySelectorAll("#green");
let yellow = document.querySelectorAll("#yellow");
let red = document.querySelectorAll("#red");
let timer = document.querySelectorAll("#timer");
let firstLine = document.getElementById("1st");
let secondLine = document.getElementById("2nd");
let thirdLine = document.getElementById("3rd");
let forthLine = document.getElementById("4th");

const startTrafficLight = async () => {
  let timeData = await fetch("./data.json");
  let response = await timeData.json();

  // totalTime = parseInt(document.getElementById("userInput").value);
  let totalTime = 8;
  // if (isNaN(totalTime) || totalTime < 100) {
  //   alert("Please enter a valid number greater than 100");
  //   return;
  // }

  let line1 = parseInt(firstLine.value);
  let line2 = parseInt(secondLine.value);
  let line3 = parseInt(thirdLine.value);
  let line4 = parseInt(forthLine.value);

  let finalTime = line1 + line2 + line3 + line4;

  if (finalTime !== 100) {
    alert("enter time ratio must be Equal to 100");
    return;
  }

  firstLine = Math.floor((totalTime * line1) / 100);
  secondLine = Math.floor((totalTime * line2) / 100);
  thirdLine = Math.floor((totalTime * line3) / 100);
  forthLine = Math.floor((totalTime * line4) / 100);

  let currentDate = new Date();
  let hours = currentDate.getHours().toString().padStart(2, 0);
  let minutes = currentDate.getMinutes().toString().padStart(2, 0);

  let realTime = `${hours}${minutes}`;

  response.map((item) => {
    let separateStartTime = item.startTime.split("/");
    let separateEndTime = item.endTime.split("/");

    let startHours = separateStartTime[0].padStart(2, 0);
    let startMinute = separateStartTime[1].padStart(2, 0);
    let separateEndHour = separateEndTime[0].padStart(2, 0);
    let separateEndMinute = separateEndTime[1].padStart(2, 0);

    let startTime = `${startHours}${startMinute}`;
    let endTime = `${separateEndHour}${separateEndMinute}`;

    if (
      Number(realTime) >= Number(startTime) &&
      Number(realTime) <= Number(endTime)
    ) {
      checkYellowLight();
    } else {
      goGreen(firstLine, secondLine, thirdLine, forthLine);
    }
  });

  document.getElementById("userInput").value = "";
  document.getElementById("1st").value = " ";
  document.getElementById("2nd").value = " ";
  document.getElementById("3rd").value = " ";
  document.getElementById("4th").value = " ";
};

// set timer according to ratio, other wise all equal
const goGreen = (firstLine, secondLine, thirdLine, forthLine) => {
  let time;

  function update() {
    if (currentPosition == 0) {
      time = firstLine;
    }
    if (currentPosition == 1) {
      time = secondLine;
    }
    if (currentPosition == 2) {
      time = thirdLine;
    }
    if (currentPosition == 3) {
      time = forthLine;
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
      redTimerUpdate(
        currentPosition,
        firstLine,
        secondLine,
        thirdLine,
        forthLine
      );
      decrementTime--;
      if (decrementTime < 0) {
        currentPosition++;
        clearInterval(countdown);
        update();
      }
    }, 1000);
  }
  update();
};

const redTimerUpdate = (
  currentPosition,
  firstLine,
  secondLine,
  thirdLine,
  forthLine
) => {
  let waitingTime;

  timer.forEach((time, index) => {
    if (index !== currentPosition) {
      time.style.color = "red";
    }
    if (currentPosition == 1) {
      waitingTime = firstLine;
    }
    if (currentPosition == 2) {
      waitingTime = firstLine * 2;
    }
    if (currentPosition == 3) {
      waitingTime = firstLine * 3;
    }
    if (currentPosition == 4) {
      currentPosition = 0;
      waitingTime = firstLine * 4;
    }

    console.log(waitingTime);

    let remainingTIme = setInterval(() => {
      time[currentPosition + 1].innerText = waitingTime;
      waitingTime--;

      if (waitingTime < 1) {
        clearInterval(remainingTIme);
      }
    }, 1000);
  });
};

const checkYellowLight = () => {
  yellow.forEach((item) => {
    item.style.backgroundColor = "yellow";
    item.style.boxShadow = " 0px 0px 40px yellow";
  });
};
