const startTrafficLight = () => {
  let totalTime = document.getElementById("totalTime").value;
  console.log(totalTime);
};

let totalTime = 100;



const stopTrafficLights = () => {
  let yellowLight = document.querySelectorAll("#yellow");
  let light = true;

  yellowLight.forEach((item) => {
    if (light) {
      setInterval(() => {
        item.style.backgroundColor = "yellow";
        light = false;
      }, 500);
    } else {
      setInterval(() => {
        item.style.backgroundColor = "rgb(255, 255, 159);";
        light = true;
      }, 1000);
    }
  });

  // setInterval(()=>{
  //     yellowLight.style.backgroundColor = "yellow"
  // },1000)
};

stopTrafficLights();
