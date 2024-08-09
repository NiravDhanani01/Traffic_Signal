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
  if (isNaN(totalTime) || totalTime < 50) {
    alert("Please enter a valid number greater than 50");
    return;
  }

  let line1 = parseInt(firstLine.value);
  let line2 = parseInt(secondLine.value);
  let line3 = parseInt(thirdLine.value);
  let line4 = parseInt(forthLine.value);

  let finalTime = line1 + line2 + line3 + line4;

  if (finalTime !== 100) {
    alert("Time ratio must be equal to 100");
    return;
  }

  firstLine = Math.floor((totalTime * line1) / 100);
  secondLine = Math.floor((totalTime * line2) / 100);
  thirdLine = Math.ceil((totalTime * line3) / 100);
  forthLine = Math.ceil((totalTime * line4) / 100);

  trafficLightSimulation(firstLine, secondLine, thirdLine, forthLine);

  document.querySelector(".startTime").setAttribute("disabled", "disabled");
  document.querySelector(".stopBtn").removeAttribute("disabled");
  document.getElementById("userInput").value = "";
  document.getElementById("1st").value = "";
  document.getElementById("2nd").value = "";
  document.getElementById("3rd").value = "";
  document.getElementById("4th").value = "";
};

const trafficLightSimulation = async (firstLine, secondLine, thirdLine, fourthLine) => {
  let time;
  let blinking;
  let stopBlinking;
  let timeData = await fetch("./data.json");
  let response = await timeData.json();

  let time0 = firstLine + secondLine + thirdLine + fourthLine + 3;
  let time1 = firstLine;
  let time2 = firstLine + secondLine + 1;
  let time3 = firstLine + secondLine + thirdLine + 3;

  setInterval(() => {
    let currentDate = new Date();
    let hours = currentDate.getHours().toString().padStart(2, '0');
    let minutes = currentDate.getMinutes().toString().padStart(2, '0');
    let realTime = `${hours}${minutes}`;
    localStorage.setItem("time", JSON.stringify(realTime));
  }, 2000);

  function update() {
    // Yellow light checking
    let jsonTime = response.map((item) => {
      let [startHour, startMinute] = item.startTime.split("/");
      let [endHour, endMinute] = item.endTime.split("/");

      let startTime = `${startHour.padStart(2, '0')}${startMinute.padStart(2, '0')}`;
      let endTime = `${endHour.padStart(2, '0')}${endMinute.padStart(2, '0')}`;
      return { startTime, endTime };
    });

    let realTime = JSON.parse(localStorage.getItem("time"));

    let check = jsonTime.find((item) => item.startTime <= realTime && item.endTime >= realTime);

    if (check) {
      // Start yellow blinking
      yellow.forEach((item) => {
        blinking = setInterval(() => {
          item.style.backgroundColor = "yellow";
          item.style.boxShadow = "0px 0px 40px yellow";
        }, 1000);

        stopBlinking = setInterval(() => {
          item.style.boxShadow = "";
          item.style.backgroundColor = "";
        }, 2000);
      });

      // Turn off green and red
      green.forEach(light => {
        light.style.backgroundColor = "transparent";
        light.style.boxShadow = "none";
      });
      red.forEach(light => {
        light.style.backgroundColor = "transparent";
        light.style.boxShadow = "none";
      });
      timer.forEach(time => {
        time.style.color = "yellow";
        time.innerText = `00`;
      });
    } else {
      // Stop yellow blinking if not in range
      clearInterval(blinking);
      clearInterval(stopBlinking);

      // Green and red light logic
      if (currentPosition == 0) time = firstLine;
      else if (currentPosition == 1) time = secondLine;
      else if (currentPosition == 2) time = thirdLine;
      else if (currentPosition == 3) time = forthLine;

      if (currentPosition > 3) {
        currentPosition = 0;
        time = firstLine;
      }

      let decrementTime = time;

      green.forEach((light, index) => {
        if (index != currentPosition) {
          light.style.backgroundColor = "transparent";
          light.style.boxShadow = "none";
        } else {
          green[currentPosition].style.backgroundColor = "rgb(0, 255, 0)";
          green[currentPosition].style.boxShadow = "0px 0px 40px rgb(0, 255, 0)";
        }
      });

      red.forEach((light, index) => {
        if (index != currentPosition) {
          light.style.backgroundColor = "rgb(255, 0, 0)";
          light.style.boxShadow = "0px 0px 40px rgb(255, 0, 0)";
        } else {
          light.style.backgroundColor = "transparent";
          light.style.boxShadow = "none";
        }
      });

      yellow.forEach(light => {
        light.style.backgroundColor = "transparent";
        light.style.boxShadow = "none";
      });

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

        if (time0 < 0) time0 = firstLine + secondLine + thirdLine + fourthLine + 3;
        if (time1 < 0) time1 = firstLine + secondLine + thirdLine + fourthLine + 3;
        if (time2 < 0) time2 = firstLine + secondLine + thirdLine + fourthLine + 3;
        if (time3 < 0) time3 = firstLine + secondLine + thirdLine + fourthLine + 3;

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

const gogreen = () => {
  console.log("green");
};

const stop = () => {
  location.reload();
};
