let petName = "";
let selectedAvatar = "";
const nameField = document.querySelector(".name-field");
const greeting = document.getElementById('greeting');
const time = document.getElementById('time');
const gameContent = document.getElementById("game-content");
let selectedAvatarType;


//Avatar Setting//

function eat() {
  document.getElementById("selected-avatar").setAttribute("src", `Images/${selectedAvatarType}Makan.png`);
  updateStatusBar();
}

function sleep() {
  document.getElementById("selected-avatar").setAttribute("src", `Images/${selectedAvatarType}Turu.png`);
  updateStatusBar();
}

function play() {
  document.getElementById("selected-avatar").setAttribute("src", `Images/${selectedAvatarType}Default.png`);
  updateStatusBar();
}

function medicine() {
  document.getElementById("selected-avatar").setAttribute("src", `Images/${selectedAvatarType}Obat.png`);
  updateStatusBar();
}

function clearPageContent() {
  const pageContent = document.getElementById("page-content");
  pageContent.style.display = "none";
  const gameContent = document.getElementById("game-content");
  gameContent.style.display = "block";
}

function startGame() {
  const petName = localStorage.getItem("petName");
  const selectedAvatarSrc = document
    .getElementById("selected-avatar")
    .getAttribute("src");

  document.getElementById("pet-name").innerHTML = `${petName}`;
  document
    .getElementById("selected-avatar")
    .setAttribute("src", selectedAvatarSrc);

  updateStatusBar();
}

function updateSelectedAvatar() {
  selectedAvatar = document.querySelector(".carousel-item.active img").getAttribute('src');
  selectedAvatarType = document.querySelector(".carousel-item.active img").getAttribute("data-animal-type");

  localStorage.setItem("petName", petName);
  const selectedAvatarId = document.querySelector(".carousel-item.active img").getAttribute('id');

  localStorage.setItem("selectedAvatarId", selectedAvatarId);

  document.getElementById("selected-avatar").setAttribute('src', selectedAvatar);
}

function playGame() {
  petName = nameField.value;

  updateSelectedAvatar()

 // Grettings Setting //

  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let greetingValue = greeting.value;

  if (hours >= 4 && hours < 11) {
    gameContent.style.backgroundImage = "url('Images/Morning.jpg')";
    greetingValue = 'Good Morning';
  } else if (hours >= 11 && hours < 15) {
    gameContent.style.backgroundImage = "url('Images/Afternoon.jpg')";
    greetingValue = 'Good Afternoon';
  } else if (hours >= 15 && hours < 19) {
    gameContent.style.backgroundImage = "url('Images/Evening.jpg')";
    greetingValue = 'Good Evening';
  } else {
    gameContent.style.backgroundImage = "url('Images/Night.jpg')";
    greetingValue = 'Good Night';
  }

  time.innerHTML = `${hours} : ${minutes}`
  greeting.innerHTML = `${greetingValue}, ${petName}`
  clearPageContent();
  updateSelectedAvatar();
  startGame();
}

function setPlayerAvatar() {
  const selectedAvatar = localStorage.getItem("selectedAvatar");

  // Set the background property of the .board .player class
  const playerElement = document.querySelector(".board .player");
  playerElement.style.background = `url('${selectedAvatar}') top center / contain no-repeat`;
}

// Call the setPlayerAvatar function when the page loads
window.addEventListener("load", setPlayerAvatar);


const start = () => {
  window.location.href = 'games.html'
}


//Status Bar Setting//

$(document).ready(function() {

  $(document).bind('touchmove', function(e) {
  	e.preventDefault();
  });

  var tamagotchi = { food: 100, game: 100, sleep: 100, health: 100, money: 0, level: 1, isDead: function() {
      if ((this.food <= 0) || (this.game <= 0) || (this.sleep <= 0) || (this.health <= 0)) {
        return true;
      } else {
        return false;
      }
    }, proPlayer: function() {
      if (this.level === 5) {
        return true;
      } else {
        return false;
      }
    }
  };

  var time = 0;
  var difficulty = 0;
  var cheatCode = 0;
  var counter = setInterval(timer, 800);


  $('#food').click(function() {
    tamagotchi.food += 5;
  });

  $('#game').click(function() {
    tamagotchi.game += 5;
  });

  $('#sleep').click(function() {
    tamagotchi.sleep += 5;
  });

  $('#health').click(function() {
    tamagotchi.health += 5;
  });

  $('#buy-level-up').on('click', 'img', function () {
    tamagotchi.level += 1;
    tamagotchi.food = 100;
    tamagotchi.game = 100;
    tamagotchi.sleep = 100;
    tamagotchi.health = 100;
    tamagotchi.money -= 1;
    $('.level').empty();
    $('.level').append(tamagotchi.level);
  });

function timer() {
    if (tamagotchi.money < 5) {
      $('#level-up').show();
      $('#buy-level-up').hide();
    }

    if (tamagotchi.money > 5) {
      $('#level-up').hide();
      $('#buy-level-up').removeClass('hide');
      $('#buy-level-up').show();
    }

    tamagotchi.money += (.01 * tamagotchi.level);
    tamagotchi.food -= (1.2 + difficulty - cheatCode - tamagotchi.level);
    tamagotchi.game -= (1.2 + difficulty - cheatCode - tamagotchi.level);
    tamagotchi.sleep -= (1.2 + difficulty - cheatCode - tamagotchi.level);
    tamagotchi.health -= (1.2 + difficulty - cheatCode - tamagotchi.level);
    time += .25;

    if (time % 5 === 0) {
      difficulty += .5;
    }

    if (tamagotchi.isDead() === true) {
      clearInterval(counter);
      alert("Your pet has passed away..");
      location.reload();
    }

    if (tamagotchi.level > 5) {
      tamagotchi.level = 5;
    }

    if (tamagotchi.proPlayer() === true) {
      $('.level').empty();
      $('.level').append(tamagotchi.level);
      clearInterval(counter);
      alert("Congratulations, You've Reached the Max Level! Thank you for playing ^^\nNow you can try the other animals as your pet");
      location.reload();
    }

    if (tamagotchi.food > 100) {
      tamagotchi.food = 100;
    }

    if (tamagotchi.game > 100) {
      tamagotchi.game = 100;
    }

    if (tamagotchi.sleep > 100) {
      tamagotchi.sleep = 100;
    }

    if (tamagotchi.health > 100) {
      tamagotchi.health = 100;
    }

    if (tamagotchi.food > 65) {
      $('#food-level').removeClass();
      $('#food-level').addClass('progress-bar progress-bar-success');
    } else if (tamagotchi.food < 65 && tamagotchi.food > 30) {
      $('#food-level').removeClass();
      $('#food-level').addClass('progress-bar progress-bar-warning');
    } else if (tamagotchi.food < 30) {
      $('#food-level').removeClass();
      $('#food-level').addClass('progress-bar progress-bar-danger');
    }

    if (tamagotchi.game > 65) {
      $('#game-level').removeClass();
      $('#game-level').addClass('progress-bar progress-bar-success');
    } else if (tamagotchi.game < 65 && tamagotchi.game > 30) {
      $('#game-level').removeClass();
      $('#game-level').addClass('progress-bar progress-bar-warning');
    } else if (tamagotchi.game < 30) {
      $('#game-level').removeClass();
      $('#game-level').addClass('progress-bar progress-bar-danger');
    }

    if (tamagotchi.sleep > 65) {
      $('#sleep-level').removeClass();
      $('#sleep-level').addClass('progress-bar progress-bar-success');
    } else if (tamagotchi.sleep < 65 && tamagotchi.sleep > 30) {
      $('#sleep-level').removeClass();
      $('#sleep-level').addClass('progress-bar progress-bar-warning');
    } else if (tamagotchi.sleep < 30) {
      $('#sleep-level').removeClass();
      $('#sleep-level').addClass('progress-bar progress-bar-danger');
    }

    if (tamagotchi.health > 65) {
      $('#health-level').removeClass();
      $('#health-level').addClass('progress-bar progress-bar-success');
    } else if (tamagotchi.health < 65 && tamagotchi.health > 30) {
      $('#health-level').removeClass();
      $('#health-level').addClass('progress-bar progress-bar-warning');
    } else if (tamagotchi.game < 30) {
      $('#health-level').removeClass();
      $('#health-level').addClass('progress-bar progress-bar-danger');
    }


    $('#food-level').css('width', tamagotchi.food + "%");
    $('#game-level').css('width', tamagotchi.game + "%");
    $('#sleep-level').css('width', tamagotchi.sleep + "%");
    $('#health-level').css('width', tamagotchi.health + "%");
    $('.money').empty();
    var moneyRounded = Math.round(tamagotchi.money * 100)/100;
    $('.money').append(moneyRounded.toFixed(2));
    $('.sleep').empty();
    $('.sleep').append(tamagotchi.sleep.toFixed());
    $('.game').empty();
    $('.game').append(tamagotchi.game.toFixed());
    $('.food').empty();
    $('.food').append(tamagotchi.food.toFixed());
    $('.health').empty();
    $('.health').append(tamagotchi.health.toFixed());
  }

});


// Games Section
