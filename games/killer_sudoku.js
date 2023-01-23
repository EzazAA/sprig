/*
@title: killer_sudoku
@author: wyatt

This is a killer sudoku game - for those who don't know, it's sudoku, but
with no numbers at the start! 

- Cursor : Yellow border
- Invalid placement : Red border (This means that you've gone wrong)

Controls:
- WASD to control the cursor
- J to decrement the active number
- L to increment the active number
- K to clear the square

* If there is no number in the box, press either J or K

Credits:
- Bitmap numbers are from "15_puzzle" by @maggie - I hope this is okay! (nice game btw :))

*/

const blue = "b";
const white = "w"
const error = "r"
const cursor = "x"

const TEXT_WIDTH = 40;
const TEXT_HEIGHT = 16;


setLegend(
  [ blue, bitmap`
................
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
................`],
  [ white, bitmap`
................
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
................`],
  [ cursor, bitmap`
6666666666666666
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6666666666666666`],
  [ error, bitmap`
3333333333333333
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3333333333333333`],
  [ "1", bitmap`
................
.22222222222222.
.22222000222222.
.22220000222222.
.22200000222222.
.22200200222222.
.22222200222222.
.22222200222222.
.22222200222222.
.22222200222222.
.22222200222222.
.22222200222222.
.22200000000222.
.22200000000222.
.22222222222222.
................` ],
  [ "2", bitmap`
................
.22222222222222.
.22220000022222.
.22200000002222.
.22000222000222.
.22002222000222.
.22222222000222.
.22222222000222.
.22222220002222.
.22222200022222.
.22222000222222.
.22220000222222.
.22200000000022.
.22200000000022.
.22222222222222.
................` ],
  [ "3", bitmap`
................
.22222222222222.
.22200000000222.
.22200000000222.
.22222222000222.
.22222220002222.
.22222000022222.
.22222000000222.
.22222222000222.
.22222222200222.
.22202222200222.
.22200222000222.
.22200000002222.
.22220000022222.
.22222222222222.
................` ],
  [ "4", bitmap`
........222.....
.22222222222222.
.22200222002222.
.22200222002222.
.22200222002222.
.22200222002222.
.22200222002222.
.22200000002222.
.22200000002222.
.22222222002222.
.22222222002222.
.22222222002222.
.22222222002222.
.22222222002222.
.22222222222222.
................` ],
  [ "5", bitmap`
................
.22222222222222.
.22200000002222.
.22200000002222.
.22200222222222.
.22200222222222.
.22200000022222.
.22200000002222.
.22222222000222.
.22222222200222.
.22222222200222.
.22200222000222.
.22200000002222.
.22220000022222.
.22222222222222.
................` ],
  [ "6", bitmap`
................
.22222222222222.
.22222000002222.
.22220000002222.
.22200022222222.
.22200222222222.
.22000222222222.
.22000000002222.
.22000000000222.
.22000222200222.
.22000222200222.
.22000222200222.
.22200000000222.
.22220000002222.
.22222222222222.
................` ],
  [ "7", bitmap`
................
.22222222222222.
.22200000000222.
.22200000000222.
.22222222000222.
.22222222000222.
.22222222002222.
.22222220002222.
.22222220022222.
.22222200022222.
.22222200222222.
.22222000222222.
.22220002222222.
.22220002222222.
.22222222222222.
................` ],
  [ "8", bitmap`
................
.22222222222222.
.22220000002222.
.22200022000222.
.22200222200222.
.22200022000222.
.22220000002222.
.22200000000222.
.22200222200222.
.22002222220022.
.22002222220022.
.22000222200022.
.22200000000222.
.22220000002222.
.22222222222222.
................` ],
  [ "9", bitmap`
................
.22222222222222.
.22220000002222.
.22200000002222.
.22200222000222.
.22200222000222.
.22200222000222.
.22200000000222.
.22220000000222.
.22222222000222.
.22222222000222.
.22200220002222.
.22200000002222.
.22220000022222.
.22222222222222.
................` ],
  [ "!", bitmap`
................
.77777777777777.
.77777000777777.
.77770000777777.
.77700000777777.
.77700700777777.
.77777700777777.
.77777700777777.
.77777700777777.
.77777700777777.
.77777700777777.
.77777700777777.
.77700000000777.
.77700000000777.
.77777777777777.
................` ],
  [ "@", bitmap`
................
.77777777777777.
.77770000077777.
.77700000007777.
.77000777000777.
.77007777000777.
.77777777000777.
.77777777000777.
.77777770007777.
.77777700077777.
.77777000777777.
.77770000777777.
.77700000000077.
.77700000000077.
.77777777777777.
................` ],
  [ "#", bitmap`
................
.77777777777777.
.77700000000777.
.77700000000777.
.77777777000777.
.77777770007777.
.77777000077777.
.77777000000777.
.77777777000777.
.77777777700777.
.77707777700777.
.77700777000777.
.77700000007777.
.77770000077777.
.77777777777777.
................` ],
  [ "$", bitmap`
................
.77777777777777.
.77700777007777.
.77700777007777.
.77700777007777.
.77700777007777.
.77700777007777.
.77700000007777.
.77700000007777.
.77777777007777.
.77777777007777.
.77777777007777.
.77777777007777.
.77777777007777.
.77777777777777.
................` ],
  [ "%", bitmap`
................
.77777777777777.
.77700000007777.
.77700000007777.
.77700777777777.
.77700777777777.
.77700000077777.
.77700000007777.
.77777777000777.
.77777777700777.
.77777777700777.
.77700777000777.
.77700000007777.
.77770000077777.
.77777777777777.
................` ],
  [ "^", bitmap`
................
.77777777777777.
.77777000007777.
.77770000007777.
.77700077777777.
.77700777777777.
.77000777777777.
.77000000007777.
.77000000000777.
.77000777700777.
.77000777700777.
.77000777700777.
.77700000000777.
.77770000007777.
.77777777777777.
................` ],
  [ "&", bitmap`
................
.77777777777777.
.77700000000777.
.77700000000777.
.77777777000777.
.77777777000777.
.77777777007777.
.77777770007777.
.77777770077777.
.77777700077777.
.77777700777777.
.77777000777777.
.77770007777777.
.77770007777777.
.77777777777777.
................` ],
  [ "*", bitmap`
................
.77777777777777.
.77770000007777.
.77700077000777.
.77700777700777.
.77700077000777.
.77770000007777.
.77700000000777.
.77700777700777.
.77007777770077.
.77007777770077.
.77000777700077.
.77700000000777.
.77770000007777.
.77777777777777.
................` ],
  [ "(", bitmap`
................
.77777777777777.
.77770000007777.
.77700000007777.
.77700777000777.
.77700777000777.
.77700777000777.
.77700000000777.
.77770000000777.
.77777777000777.
.77777777000777.
.77700770007777.
.77700000007777.
.77770000077777.
.77777777777777.
................` ],
  ["n", bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
);

const whiteLetters = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
}

const blueLetters = {
    "!": 1,
    "@": 2,
    "#": 3,
    "$": 4,
    "%": 5,
    "^": 6,
    "&": 7,
    "*": 8,
    "(": 9
}

let numbers = new Array(9).fill(0).map(v => new Array(9).fill(null))

const background = map`
bbbwwwbbb
bbbwwwbbb
bbbwwwbbb
wwwbbbwww
wwwbbbwww
wwwbbbwww
bbbwwwbbb
bbbwwwbbb
bbbwwwbbb`

setMap(background)
setBackground("n")

addSprite(4,4, cursor)

const getCursor = () => {
  const c = getFirst(cursor)
  const tileType = getTile(c.x,c.y).filter(v => ![error, cursor].includes(v.type))[0].type
  const isWhite = tileType === white || Object.keys(whiteLetters).includes(tileType)
  const isNumber = isWhite ? Object.keys(whiteLetters).includes(tileType) : Object.keys(blueLetters).includes(tileType)
  const number = isNumber ? (isWhite ? whiteLetters[tileType] : blueLetters[tileType]) : null
  const quadrant = numbers.slice(3 * Math.floor(c.y / 3), 3 * (c.y === 0 ? 1 : Math.ceil(c.y / 3))).map(row => row.slice(3 * Math.floor(c.x / 3), 3 * (c.x === 0 ? 1 : Math.ceil(c.x / 3)))).flat()
  const row = numbers[c.y] 
  const col = numbers.map(row => row[c.x]).flat()

  return {
    cursor: c,
    isWhite,
    number,
    quadrant,
    row,
    col
  }
}

const moveCursor = (x, y) => {
  const c = getCursor().cursor
  const desiredPos = [c.x + x, c.y + y]
  if (desiredPos[0] < 0 || desiredPos[0] > 8 || desiredPos[1] < 0 || desiredPos[1] > 8) {
    return
  }
  c.x = desiredPos[0]
  c.y = desiredPos[1]
}

onInput("w", () => {
  moveCursor(0,-1)
})

onInput("a", () => {
  moveCursor(-1,0)
})

onInput("s", () => {
  moveCursor(0,1)
})

onInput("d", () => {
  moveCursor(1,0)
})


onInput("l", () => {
  const {cursor: c, isWhite, number, quadrant, row, col} = getCursor()
  const newNum = number + 1 < 10 ? number + 1 : 9
  if (number === newNum) return;
  const newSprite = Object.entries(isWhite ? whiteLetters : blueLetters).find(([key, val]) => val === newNum)[0]
  const isWrong = quadrant.includes(newNum) || row.includes(newNum) || col.includes(newNum)
  
  clearTile(c.x, c.y)
  addSprite(c.x,c.y, newSprite)
  if (isWrong) addSprite(c.x, c.y, error)
  addSprite(c.x,c.y, cursor)
  numbers[c.y][c.x] = newNum
})

onInput("j", () => {
  const {cursor: c, isWhite, number, quadrant, row, col} = getCursor()
  const newNum = number - 1 > 0 ? number - 1 : 1
  if (number === newNum) return;
  const newSprite = Object.entries(isWhite ? whiteLetters : blueLetters).find(([key, val]) => val === newNum)[0]
  const isWrong = quadrant.includes(newNum) || row.includes(newNum) || col.includes(newNum)
  
  clearTile(c.x, c.y)
  addSprite(c.x,c.y, newSprite)
  if (isWrong) addSprite(c.x, c.y, error)
  addSprite(c.x,c.y, cursor)
  numbers[c.y][c.x] = newNum
})

onInput("k", () => {
  const {cursor: c, isWhite} = getCursor()
  clearTile(c.x, c.y)
  addSprite(c.x, c.y, isWhite ? white : blue)
  addSprite(c.x, c.y, cursor)
  numbers[c.y][c.x] = null
})

afterInput(() => {
  const rowsAreValid = numbers.every(row => (new Set(row.filter(v => v))).size === row.length)
  const colsAreValid = (new Array(9).fill(0).map((_,i) => numbers.map(row => row[i]).flat())).every(col => (new Set(col.filter(v => v)).size === col.length))
  if (!rowsAreValid || !colsAreValid) return
  for (let x = 1; x < 4; x++) {
    for (let y = 1; y < 4; y++) {
      const quad = numbers.slice(3 * (y - 1), 3 * y).map(row => row.slice(3 * (x - 1), 3 * x))
      if ((new Set(quad)).size !== quad.length) return
    }
  }

  addText("You win!", {x: 6, y: 7, color: color`3`})
  setTimeout(() => {
    numbers = new Array(9).fill(0).map(v => new Array(9).fill(null))
    clearText()
    setMap(background)
  }, 6000)
});
