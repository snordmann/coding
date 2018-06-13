let canvas
let outputDiv
let inputDiv

let gridSize = 5
let numLoops = 100
let cols
let rows
let grid


let setSize = function() {
  let parentWidth = $("#demo").width()
  let size = parentWidth < windowHeight ? parentWidth : windowHeight
  resizeCanvas(size, size)

  cols = width / gridSize
  rows = height / gridSize
  grid = []
  for (let i = 0; i < cols; i++) {
    grid[i] = []
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0
    }
  }
  grid[Math.floor(cols/2)][Math.floor(rows/2)] = 10000
}

function setup() {
  canvas = createCanvas(500, 500)
  canvas.parent('demo')
  setSize()

  outputDiv = select("#output")
  inputDiv = select("#input")
}

function topple() {
  let newGrid = []
  for (let i = 0; i < cols; i++) {
    newGrid[i] = []
    for (let j = 0; j < rows; j++) {
      newGrid[i][j] = grid[i][j]
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let numGrains = grid[i][j]
      if (numGrains >= 4) {
        newGrid[i][j] -= 4
        if( i+1 < cols)
          newGrid[i+1][j] += 1
        if( i-1 >= 0)
          newGrid[i-1][j] += 1
        if( j+1 < rows)
          newGrid[i][j+1] += 1
        if( j-1 >= 0)
          newGrid[i][j-1] += 1
      }
    }
  }


  grid = newGrid
}

function getColor(numGrains) {
  let color
  switch(numGrains) {
    case 0:
      color='#1841FB'
      break;
    case 1:
      color='#89C0FD'
      break;
    case 2:
      color='#F3DC33'
      break;
    case 3:
      color='#560205'
      break;
    case 4:
    default:
      color='#ffeee2'
      break;
  }
  return color
}

function draw() {
  background(51)
  stroke(255)
  for (let i = 0; i < numLoops; i++)
    topple()
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      fill(getColor(grid[i][j]))
      rect(i * gridSize, j * gridSize, gridSize, gridSize)
    }
  }
}

function windowResized() {
  setSize()
}
