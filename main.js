const holes = document.querySelectorAll('.hole')
const moles = document.querySelectorAll('.mole')
const scoreBoard = document.querySelector('.score')
let lastHole
let score
let timeUp

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function randomeHole(holes) {
  const idx = Math.floor(Math.random() * holes.length)
  const hole = holes[idx]
  if (hole === lastHole) {
    return randomHole(holes)
  }
  lastHole = hole
  return hole
}

function peep() {
  const time = randomTime(500, 1000)
  const hole = randomeHole(holes)
  hole.classList.add('up')
  setTimeout(function() {
    hole.classList.remove('up')
    if (!timeUp) peep()
  }, time)
}

function startGame() {
  scoreBoard.textContent = 0
  timeUp = false
  score = 0
  peep()
  setTimeout(() => (timeUp = true), 20000)
}

function bonk(e) {
  if (!e.isTrusted) return // tramposo
  score++
  this.parentNode.classList.remove('up')
  scoreBoard.textContent = score
}

moles.forEach(mole => mole.addEventListener('click', bonk))
