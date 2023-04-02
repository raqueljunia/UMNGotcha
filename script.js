let petName = "";
let selectedAvatar = "";
var eatBar = document.getElementById("eat-bar");
var sleepBar = document.getElementById("sleep-bar");
var gameBar = document.getElementById("game-bar");
var healthBar = document.getElementById("health-bar");

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
  const avatarId = localStorage.getItem("selectedAvatarId");
  const avatarSrc = document.getElementById(avatarId).getAttribute("src");
  const selectedAvatar = document.getElementById("selected-avatar");
  selectedAvatar.setAttribute("src", avatarSrc);
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
  const nameField = document.querySelector(".name-field");
  petName = nameField.value;
  selectedAvatar = document.querySelector(
    ".carousel-item.active img"
  ).src;

  localStorage.setItem("petName", petName);
  const selectedAvatarId = document.querySelector(
    ".carousel-item.active img"
  ).id;
  localStorage.setItem("selectedAvatarId", selectedAvatarId);

  clearPageContent();
  updateSelectedAvatar();
  startGame();
}