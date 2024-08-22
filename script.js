let boxes = document.querySelectorAll(".button");
let resetBtn = document.querySelector("#reset-btn");
let msg = document.querySelector("#msg");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".show-container");

let turn0 = true; //player0 is playing, else playerX is playing
let drawCount = 0; // for draw match
let winFlag = false;
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.disabled = false;
  });
  turn0 = true;
  drawCount = 0;
  winFlag = false;
  msgContainer.classList.add("hide");
};
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerHTML = "<span class='red'>O</span>"; // by using CSS class
      //  style='color: red' -----------by using inline css
      turn0 = false;
    } else {
      box.innerHTML = "<span class='blue'>X</span>";

      turn0 = true;
    }
    box.disabled = true;

    checkWinner();
  });
});

const checkWinner = () => {
  winPatterns.forEach((pattern) => {
    let posVal1 = boxes[pattern[0]].innerHTML;
    let posVal2 = boxes[pattern[1]].innerHTML;
    let posVal3 = boxes[pattern[2]].innerHTML;

    if (posVal1 != "" && posVal2 != "" && posVal3 != "") {
      if (posVal1 == posVal2 && posVal2 == posVal3) {
        winnerMsg(posVal1);
        disableboxes();
        winFlag = true;
      }
    }
  });
  drawCount++;
  if (drawCount == 9 && winFlag == false) {
    drawMsg();
  }
};

const disableboxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

resetBtn.addEventListener("click", resetGame);

newBtn.addEventListener("click", resetGame);

const winnerMsg = (winner) => {
  msg.innerHTML = `Wohoo! Congratulations &#x1F389;, Winner is ${winner}.`;
  msgContainer.classList.remove("hide");
};

const drawMsg = () => {
  msg.innerHTML = `It's a Draw! &#x1F61E;, Play Again!`;
  msgContainer.classList.remove("hide");
};
