"use strict";

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var primary = "#AF1E2D";
var secondary = "#FFCE00";
var grid = 32;
var count = 0;
var score = 0;
var snake = {
  x: grid * 5,
  y: grid * 5,
  vx: grid,
  vy: 0,
  cells: [],
  maxCells: 4
};
var apple = {
  x: grid * 10,
  y: grid * 10
};

function Update() {
  requestAnimationFrame(Update);

  if (++count < 4) {
    return;
  }

  count = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.x += snake.vx;
  snake.y += snake.vy;

  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  snake.cells.unshift({
    x: snake.x,
    y: snake.y
  });

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  } // Draw Apple


  ctx.fillStyle = secondary;
  ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1); // Draw snake

  ctx.fillStyle = primary;
  snake.cells.forEach(function (cell, index) {
    ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      score++;
      apple.x = getRandomInt(0, 24) * grid;
      apple.y = getRandomInt(0, 14) * grid;
    }

    for (var i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        window.location.reload();
      }
    }
  }); //Drawscore

  ctx.font = "42px Helvetica";
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.textAlign = "center";
  ctx.fillText(score, canvas.width / 2, canvas.height / 2);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener("keydown", function (evt) {
  if (evt.which === 37 && snake.vx === 0) {
    snake.vx = -grid;
    snake.vy = 0;
  } else if (evt.which === 38 && snake.vy === 0) {
    snake.vy = -grid;
    snake.vx = 0;
  } else if (evt.which === 39 && snake.vx === 0) {
    snake.vx = grid;
    snake.vy = 0;
  } else if (evt.which === 40 && snake.vy === 0) {
    snake.vy = grid;
    snake.vx = 0;
  }
}); // start game

requestAnimationFrame(Update);