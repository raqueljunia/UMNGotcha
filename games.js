const board = document.querySelector('.board')

function randomPosition () {
  return ~~(Math.random() * 15) + 1
}

let config = {
  speed: 250,
  level:1,
  player:{
    x: randomPosition(),
    y: randomPosition(),
  },
  food:{
    x: randomPosition(),
    y: randomPosition(),
  },
  velocity: {
    x:0,
    y:0,
  },
  showTitle() {
    const title = document.getElementById('title__1')
    title.style.opacity = "1"
    title.style.visibility = 'visible'
    title.style.zIndex = '1'
    setTimeout(function() {
      title.style.opacity = "0";
      title.style.visibility = "hidden";
      title.style.zIndex = "-1"; 
    }, 3000)
  }
  
}

const games = {
  createFood() {
    board.innerHTML = `<div class="food" style="grid-area: ${config.food.y} / ${config.food.x}"></div>`
  },
  createPlayer() {
    board.innerHTML += `<div class="player" id="player" style="grid-area: ${config.player.y} / ${config.player.x}"></div>`
  },
  movePlayer() {
    config.player.x += config.velocity.x
    config.player.y += config.velocity.y
  },
  resetPlayerPosition() {
    if(config.player.x <= 0 || config.player.x > 15 || config.player.y <= 0 || config.player.y > 15) {
      console.log('Game Over....')
      config.player.x = 7;
      config.player.y = 7;
    }
  },
  levelUp() {
    config.level += 1;
    console.log(config.level)
  },
  isWin() {
    if(config.player.x === config.food.x && config.player.y === config.food.y) {
      config.showTitle()
      this.levelUp()
      return true
    } 
    return false
  },
  randomFoodPosition() {
    config.food.x = randomPosition()
    config.food.y = randomPosition()
  }, 
}

function movement(listen) {
   switch(listen.key) {
    case "ArrowUp": //ArrowUp
      config.velocity.y = -1;
      config.velocity.x = 0;
    break;
    case "ArrowDown": //ArrowDown
      config.velocity.y = 1;
      config.velocity.x = 0;
    break;
    case "ArrowLeft": //ArrowLeft
      config.velocity.x = -1;
      config.velocity.y = 0;
    break;
    case "ArrowRight": //ArrowRight
      config.velocity.x = 1;
      config.velocity.y = 0;
    break;
    default:
      break;
   }
}

function headMovement() {
  const playerEl = document.getElementById("player")
  if(config.velocity.x == 1) {
    playerEl.style.transform = "scaleX(-1)"
  }
  if(config.velocity.y == -1) {
    playerEl.style.transform = "rotate(90deg)"
  }
  if(config.velocity.y == 1) {
    playerEl.style.transform = "rotate(-90deg)"
  }
}

function start() {
  games.createFood()
  games.createPlayer()
  games.movePlayer()
  headMovement()

  games.resetPlayerPosition()
  const win = games.isWin()
  if(win) games.randomFoodPosition()
}

setInterval(start, config.speed)
document.addEventListener("keydown", movement)

function back() {
  window.history.back();
}