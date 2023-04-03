let petName = "";
let selectedAvatar = "";
var eatBar = document.getElementById("eat-bar");
var sleepBar = document.getElementById("sleep-bar");
var gameBar = document.getElementById("game-bar");
var healthBar = document.getElementById("health-bar");
const nameField = document.querySelector(".name-field");
const greeting = document.getElementById('greeting');
const time = document.getElementById('time');
const gameContent = document.getElementById("game-content");

function updateStatusBar() {
  setInterval(() => {
    eatBar -= 1;
    sleepBar -= 1;
    gameBar -= 1;
    healthBar -= 1;

    document.getElementById("eat-bar").style.width = `${eatBar}%`;
    document.getElementById("sleep-bar").style.width = `${sleepBar}%`;
    document.getElementById("game-bar").style.width = `${gameBar}%`;
    document.getElementById("health-bar").style.width = `${healthBar}%`;
  }, 1000);
}

function eat() {
  if (eatBar <= 90) {
    eatBar += 10;
  } else {
    eatBar = 100;
  }
  updateStatusBar();
}

function sleep() {
  if (sleepBar <= 90) {
    sleepBar += 10;
  } else {
    sleepBar = 100;
  }
  updateStatusBar();
}

function play() {
  if (gameBar <= 90) {
    gameBar += 10;
  } else {
    gameBar = 100;
  }
  updateStatusBar();
}

function medicine() {
  if (healthBar <= 90) {
    healthBar += 10;
  } else {
    healthBar = 100;
  }
  updateStatusBar();
}

function updateSelectedAvatar() {
  // Mendapatkan gambar avatar dari localStorage
  const selectedAvatar = localStorage.getItem("selectedAvatar");

  // Menampilkan gambar avatar pada halaman
  const avatarImage = document.querySelector("#avatar-image");
  avatarImage.src = selectedAvatar;
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

function playGame() {
  petName = nameField.value;
  selectedAvatar = document.querySelector(".carousel-item.active img").getAttribute('src');


  localStorage.setItem("petName", petName);
  const selectedAvatarId = document.querySelector(".carousel-item.active img").getAttribute('id');

  localStorage.setItem("selectedAvatarId", selectedAvatarId);

  document.getElementById("selected-avatar").setAttribute('src', selectedAvatar);


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

const start = () => {
  window.location.href = 'games.html'
}

let level = document.getElementById("levelval");
var leveling = document.getElementById("levelup");
leveling = 0;

function levelup(){
    if(level.value == 1000){
        level.value -=1000;
        leveling +=1;
        document.getElementById("levelup").innerHTML = leveling;
    }
}
// Games Section
