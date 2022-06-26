/**
 * Author: Daniel Botchway
 * Last Modified: 27/06/2022 6:49PM
 */

let currentTotal = 0; //The total of the current calculated numbers
let buffer = "0"; //Number changed and displayed on screen
let currentOperator = null; //The current operator pressed
let success = false; //true when = is pressed
let decimal = true;
const screen = document.querySelector(".code-main-screen");

//Grab the value from target
// document.querySelector(".code-buttons").addEventListener("click", (e) => {
//   console.log(e);
//  // buttonClick(e.target.innerText);
// });
let button = document.querySelectorAll(".code-button");

button.forEach( (element) => {
  element.addEventListener("click", function(e) {
    buttonClick(e.target.innerText);
  })
});

// button.forEach(button, function(e){
//   console.log(e);
// })

//Process Incoming values
function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    //Check if incoming value is a number
    processSymbols(value);
  } else {
    processNumber(value);
  }
  render();
}

function processNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    if(success) {
      buffer = value;
      success = false;
      decimal = true;
    } else {
      buffer += value;
    }
  }
}

function processSymbols(value) {
  switch (value) {
    case "AC":
      buffer = "0";
      currentOperator = null;
      currentTotal = 0;
      success = false;
      decimal = true;
      break;
    case "+/-":
      if (buffer > 0) {
        buffer *= -1.0;
      } else {
        buffer *= -1.0;
      }
      break;
    case "%":
        // number = buffer;
        // percent = "" + number * 0.01;
        // if(percent.length > 14) {
        //   percent = number * 0.01;
        //   buffer = percent.toPrecision(2);
        // } else {
        //   buffer = percent;
        // } OR
        number = buffer;
        buffer = (number * 0.01).toString();
        if(buffer.length > 14) {
          buffer = (number * 0.01).toPrecision(2);
        } else {
          buffer = buffer;
        }
      break;
    case "=":
      if(currentOperator === null) {
        return;
      }
      calculate(parseFloat(buffer));
      currentOperator = null;

      if(currentTotal.toString().length > 14) {
        buffer = currentTotal.toPrecision(2).toString();
      } else {
        buffer = "" + currentTotal;
      }
      currentTotal = 0;
      success = true;
      decimal = false;
      break;
    case "←":
      if(buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length -1);
      }
      break;
    case ".":
      if(decimal){
        buffer += value;
        decimal = false;
      }
      break;
    default:
      performMath(value);
      break;
  }
}

function performMath(value) {
  const intBuffer = parseFloat(buffer);
  if(currentTotal === 0) {
    currentTotal = intBuffer;
  } else {
    calculate(intBuffer);
  }
  currentOperator = value;
  buffer = "0";
  success = false;
  decimal = true;
}

function calculate(intBuffer) {
  switch(currentOperator) {
    case "÷":
      currentTotal /= intBuffer;
      break;
    case "˟":
      currentTotal *= intBuffer;
      break;
    case "-":
      currentTotal -= intBuffer;
      break;
    default:
      currentTotal += intBuffer;
      break;
  }
}

//Render the Incoming value to Screen
function render() {
  screen.innerText = buffer;
}
