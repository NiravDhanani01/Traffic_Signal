let totalTime = 0;
let currentPosition = 0;

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
  if (isNaN(totalTime) || totalTime < 100) {
    alert("Please enter a valid number greater than 100");
    return;
  }

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

  goGreen(firstLine, secondLine, thirdLine, forthLine);

  document.querySelector(".startTime").setAttribute("disabled", "disabled");
  document.querySelector(".stopBtn").removeAttribute("disabled", "disabled");
  document.getElementById("userInput").value = "";
  document.getElementById("1st").value = " ";
  document.getElementById("2nd").value = " ";
  document.getElementById("3rd").value = " ";
  document.getElementById("4th").value = " ";
};

// set timer according to ratio, other wise all equal
const goGreen = async (firstLine, secondLine, thirdLine, fourthLine) => {
  let time;
  let timeData = await fetch("./data.json");
  let response = await timeData.json();

  let time0 = firstLine + secondLine + thirdLine + fourthLine + 3;
  let time1 = firstLine;
  let time2 = firstLine + secondLine + 1;
  let time3 = firstLine + secondLine + thirdLine + 3;

  function update() {
    // yellow light checking
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

      green.forEach((light) => {
        light.style.backgroundColor = "transparent";
        light.style.boxShadow = "none";
      });

      red.forEach((light) => {
        light.style.backgroundColor = "transparent";
        light.style.boxShadow = "none";
      });

      timer.forEach((time) => {
        time.style.color = "yellow";
        time.innerText = `00`;
      });
    }
    // green and red light logic start
    else {
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
      if (currentPosition > 3) {
        currentPosition = 0;
        time = firstLine;
      }

      let decrementTime = time;

      // set light according to time
      green.forEach((light, index) => {
        if (index != currentPosition) {
          light.style.backgroundColor = "transparent";
          light.style.boxShadow = "none";
        } else {
          green[currentPosition].style.backgroundColor = "rgb(0, 255, 0)";
          green[currentPosition].style.boxShadow =
            "0px 0px 40px rgb(0, 255, 0)";
          green[currentPosition].style.transition = "all 1s";
        }
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

      yellow.forEach((light) => {
        light.style.backgroundColor = "transparent";
        light.style.boxShadow = "none";
      });

      // at the position light setting
      let countdown = setInterval(() => {
        timer[currentPosition].innerText = `${decrementTime} s`;
        timer[currentPosition].style.color = "green";

        timer.forEach((time, index) => {
          if (index !== currentPosition) {
            time.style.color = "red";
          }
          if (index == 1 && index !== currentPosition) {
            timer[1].innerHTML = `${time1} s`;
          }
          if (index == 2 && index !== currentPosition) {
            timer[2].innerHTML = `${time2} s`;
          }
          if (index == 3 && index !== currentPosition) {
            timer[3].innerHTML = `${time3} s`;
          }
          if (index == 0 && index !== currentPosition) {
            timer[0].innerHTML = `${time0} s`;
          }
        });

        decrementTime--;
        time0--;
        time1--;
        time2--;
        time3--;

        if (time0 < 0) {
          time0 = firstLine + secondLine + thirdLine + fourthLine + 3;
        }
        if (time1 < 0) {
          time1 = firstLine + secondLine + thirdLine + fourthLine + 3;
        }
        if (time2 < 0) {
          time2 = firstLine + secondLine + thirdLine + fourthLine + 3;
        }
        if (time3 < 0) {
          time3 = firstLine + secondLine + thirdLine + fourthLine + 3;
        }

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

const stop = () => {
  location.reload();
};
