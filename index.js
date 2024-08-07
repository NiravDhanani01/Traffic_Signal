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
  totalTime = 10;
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
  thirdLine = Math.ceil((totalTime * line3) / 100);
  forthLine = Math.ceil((totalTime * line4) / 100);

  let currentDate = new Date();
  let hours = currentDate.getHours().toString().padStart(2, 0);
  let minutes = currentDate.getMinutes().toString().padStart(2, 0);

  let realTime = `${hours}${minutes}`;

  let jsonTime = response.map((item) => {
    let separateStartTime = item.startTime.split("/");
    let separateEndTime = item.endTime.split("/");

    let startHours = separateStartTime[0].padStart(2, 0);
    let startMinute = separateStartTime[1].padStart(2, 0);
    let separateEndHour = separateEndTime[0].padStart(2, 0);
    let separateEndMinute = separateEndTime[1].padStart(2, 0);

    let startTime = `${startHours}${startMinute}`;
    let endTime = `${separateEndHour}${separateEndMinute}`;
    return { startTime, endTime };
  });

  let check = jsonTime.find((item) => {
    return item.startTime <= realTime && item.endTime >= realTime;
  });

  if (check) {
    checkYellowLight();
  } else {
    goGreen(firstLine, secondLine, thirdLine, forthLine);
  }

  document.querySelector(".startTime").setAttribute("disabled", "disabled");
  document.querySelector(".stopBtn").removeAttribute("disabled", "disabled");
  document.getElementById("userInput").value = "";
  document.getElementById("1st").value = " ";
  document.getElementById("2nd").value = " ";
  document.getElementById("3rd").value = " ";
  document.getElementById("4th").value = " ";
};

// set timer according to ratio, other wise all equal
const goGreen = (firstLine, secondLine, thirdLine, forthLine) => {
  let time;
  let timer1 = 10;

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
    if (currentPosition == 4) {
      currentPosition = 0;
    }

    // set light according to time
    green.forEach((light) => {
      light.style.backgroundColor = "transparent";
      light.style.boxShadow = "none";
    });

    //set light for red
    red.forEach((light, index) => {
      if (index != currentPosition) {
        light.style.backgroundColor = "rgb(255, 0, 0)";
        light.style.boxShadow = "0px 0px 40px rgb(255, 0, 0)";
        light.style.transition = "all 1s";
      } else {
        red[currentPosition].style.backgroundColor = "transparent";
        red[currentPosition].style.boxShadow = "none";
      }
    });

    // at the position light setting
    green[currentPosition].style.backgroundColor = "rgb(0, 255, 0)";
    green[currentPosition].style.boxShadow = "0px 0px 40px rgb(0, 255, 0)";
    green[currentPosition].style.transition = "all 1s";

    let decrementTime = time;
    countdown = setInterval(() => {
      timer[currentPosition].innerText = `${decrementTime} s`;
      timer[currentPosition].style.color = "green";

      redLightTimer(
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

const redLightTimer = (
  currentPosition,
  firstLine,
  secondLine,
  thirdLine,
  forthLine
) => {
  let test = totalTime - firstLine;
  console.log(totalTime, firstLine);

  timer.forEach((time, index) => {
    if (index !== currentPosition) {
      time.style.color = "red";
    }
  });

  let a = setInterval(() => {
    timer[3].innerHTML = `${test}`;
    console.log(test);
    test--;
    if (test < 1) {
      clearInterval(a);
    }
  }, 1000);

  let b = setInterval(() => {
    timer[2].innerHTML = `${test}`;
    console.log(test);
    test--;
    if (test < 1) {
      clearInterval(b);
    }
  }, 1000);

  //   let time3 = totalTime;
  //   let time0 = firstLine;
  //   let time1 = secondLine * 2;
  //   let time2 = thirdLine;

  //   let a = setInterval(() => {
  //     timer[1].innerText = `${time0}`;
  //     time0--;
  //     if (time0 < 0) {
  //       clearInterval(a);
  //     }
  //   }, 1000);

  //   let b = setInterval(() => {
  //     timer[2].innerText = `${time1}`;
  //     time1--;
  //     if (time1 < 0) {
  //       clearInterval(b);
  //     }
  //   }, 1000);

  //   let c = setInterval(() => {
  //     timer[3].innerText = `${time2}`;
  //     time2--;
  //     if (time2 < 0) {
  //       clearInterval(c);
  //     }
  //   });
  //   let d = setTimeout(() => {
  //     let dd = setInterval(() => {
  //       timer[0].innerText = time3;
  //       time3--;
  //       if (time3 < 0) {
  //         clearInterval(dd);
  //       }
  //     }, 1000);
  //   }, 2000);
};
// 
const checkYellowLight = () => {
  yellow.forEach((item) => {
    let blinking = setInterval(() => {
      item.style.backgroundColor = "yellow";
      item.style.boxShadow = " 0px 0px 40px yellow";
      item.style.transition = "all 1s";
    }, 1000);
    let stopBlinking = setInterval(() => {
      item.style.boxShadow = "";
      item.style.backgroundColor = "";
    }, 2000);
  });
  timer.forEach((time) => (time.style.color = "yellow"));
};

const stop = () => {
  location.reload();
};
