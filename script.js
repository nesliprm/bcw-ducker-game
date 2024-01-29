const grid = document.querySelector(".grid");
const timer = document.querySelector(".timer");
const endScreen = document.querySelector(".end-game-screen");
const endText = document.querySelector(".end-game-text");
const reloadButton = document.querySelector("button");

// NESTED ARRAY

const gridMatrix = [
  ["", "", "", "", "", "", "", "", ""],
  [
    "river",
    "wood",
    "wood",
    "river",
    "wood",
    "river",
    "river",
    "river",
    "river",
  ],
  ["river", "river", "river", "wood", "wood", "river", "wood", "wood", "river"],
  ["", "", "", "", "", "", "", "", ""],
  ["road", "bus", "road", "road", "road", "car", "road", "road", "road"],
  ["road", "road", "road", "car", "road", "road", "road", "road", "bus"],
  ["road", "road", "car", "road", "road", "road", "bus", "road", "road"],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
];

const victoryRow = 0;
const riverRows = [1, 2];
const roadRows = [4, 5, 6];
const duckPlace = { x: 4, y: 8 };
let contentBeforeDuck = "";
let time = 15;

// LOOPING THROUGH GRID & CELLS

function drawGrid() {
  grid.innerHTML = "";
  gridMatrix.forEach(function (gridRow, gridRowIndex) {
    gridRow.forEach(function (cellContent, cellContentIndex) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (riverRows.includes(gridRowIndex)) {
        cell.classList.add("river");
      } else if (roadRows.includes(gridRowIndex)) {
        cell.classList.add("road");
      }

      if (cellContent) {
        cell.classList.add(cellContent);
      }

      grid.appendChild(cell);
    });
  });
}

function placeDuck() {
  contentBeforeDuck = gridMatrix[duckPlace.y][duckPlace.x];

  //x or y which comes before?? it has to look for y position first!
  gridMatrix[duckPlace.y][duckPlace.x] = "duck";
}

function moveDuck(event) {
  const key = event.key;
  gridMatrix[duckPlace.y][duckPlace.x] = contentBeforeDuck;

  // looking for keyboard actions:
  switch (key) {
    case ("ArrowUp", "w"):
      if (duckPlace.y > 0) duckPlace.y--; //if statement to avoid duck from going off screen
      break; // to put a stop in the function

    case ("ArrowDown", "s"):
      if (duckPlace.y < 8) duckPlace.y++;
      break;
    case ("ArrowLeft", "a"):
      if (duckPlace.x > 0) duckPlace.x--;
      break;
    case ("ArrowRight", "d"):
      if (duckPlace.x < 8) duckPlace.x++;
      break;
  }

  render();
}

function render() {
  placeDuck();
  drawGrid();
}

const renderLoop = setInterval(moveDuckWithoutDoubling, 600);

function moveDuckWithoutDoubling() {
  gridMatrix[duckPlace.y][duckPlace.x] = contentBeforeDuck;
  render();
}

// when you press the key and lift your finger 'keyup',
//when that happens move the duck
document.addEventListener("keyup", moveDuck);
