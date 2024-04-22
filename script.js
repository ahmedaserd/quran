const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((navItem, i) => {
  navItem.addEventListener("click", () => {
    navItems.forEach((item, j) => {
      item.className = "nav-item";
    });
    navItem.className = "nav-item active";
  });
});

const containers = document.querySelectorAll(".containers");

containers.forEach((container) => {
  let isDragging = false;
  let startX;
  let scrollLeft;

  container.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const x = e.pageX - container.offsetLeft;
    const step = (x - startX) * 0.6;
    container.scrollLeft = scrollLeft - step;
  });

  container.addEventListener("mouseup", () => {
    isDragging = false;
  });

  container.addEventListener("mouseleave", () => {
    isDragging = false;
  });
});

const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const forwardButton = document.querySelector(".controls button.forward");
const backwardButton = document.querySelector(".controls button.backward");
const rotatingImage = document.getElementById("rotatingImage");
const songName = document.querySelector(".music-player h2");
const artistName = document.querySelector(".music-player p");

let rotating = false;
let currentRotation = 0;
let rotationInterval;

const songs = [
  {
    title: "سورة البقرة",
    name: "عبد الباسط عبد الصمد",
    source:
      "https://server7.mp3quran.net/basit/Almusshaf-Al-Mojawwad/002.mp3",
    cover:
      "alp.jpg",
  },
  {
    title: "سورة يوسف",
    name: "الحصري",
    source:
      "https://server13.mp3quran.net/husr/012.mp3",
    cover:
      "https://i.pinimg.com/564x/3f/da/7e/3fda7ed5056347e700cac64d07e164c3.jpg",
  },
  {
    title: "سورة الفرقان",
    name: "المنشاوي",
    source:
      "https://server10.mp3quran.net/minsh/025.mp3",
    cover:
      "https://i.pinimg.com/564x/88/e0/44/88e0449e73816003c09354e85def9465.jpg",
  },
  {
    title: "سورة البقرة",
    name: "المنشاوي",
    source:
      "https://server10.mp3quran.net/minsh/002.mp3",
    cover:
      "https://i.pinimg.com/564x/88/e0/44/88e0449e73816003c09354e85def9465.jpg",
  },
  {
    title: "سورة الاعراف",
    name: "المنشاوي",
    source:
      "https://server10.mp3quran.net/minsh/007.mp3",
    cover:
      "https://i.pinimg.com/564x/88/e0/44/88e0449e73816003c09354e85def9465.jpg",
  },
  {
    title: "سورة يوسف",
    name: "المنشاوي",
    source:
      "https://server10.mp3quran.net/minsh/012.mp3",
    cover:
      "https://i.pinimg.com/564x/88/e0/44/88e0449e73816003c09354e85def9465.jpg",
  },
  {
    title: "سورة النمل",
    name: "المنشاوي",
    source:
      "https://server10.mp3quran.net/minsh/027.mp3",
    cover:
      "https://i.pinimg.com/564x/88/e0/44/88e0449e73816003c09354e85def9465.jpg",
  },
];


let currentSongIndex = 0;

function startRotation() {
  if (!rotating) {
    rotating = true;
    rotationInterval = setInterval(rotateImage, 50);
  }
}

function pauseRotation() {
  clearInterval(rotationInterval);
  rotating = false;
}

function rotateImage() {
  currentRotation += 1;
  rotatingImage.style.transform = `rotate(${currentRotation}deg)`;
}

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;
  rotatingImage.src = songs[currentSongIndex].cover;

  song.addEventListener("loadeddata", function () {});
}

song.addEventListener("loadedmetadata", function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
});

song.addEventListener("ended", function () {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});

song.addEventListener("timeupdate", function () {
  if (!song.paused) {
    progress.value = song.currentTime;
  }
});

function playPause() {
  if (song.paused) {
    song.play();
    controlIcon.classList.add("fa-pause");
    controlIcon.classList.remove("fa-play");
    startRotation();
  } else {
    song.pause();
    controlIcon.classList.remove("fa-pause");
    controlIcon.classList.add("fa-play");
    pauseRotation();
  }
}

playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", function () {
  song.currentTime = progress.value;
});

progress.addEventListener("change", function () {
  song.play();
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
  startRotation();
});

forwardButton.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});

backwardButton.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  playPause();
});

updateSongInfo();

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  speed: 600,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 10,
    stretch: 120,
    depth: 200,
    modifier: 1,
    slideShadows: false,
  },
   on: {
    click(event) {
      swiper.slideTo(this.clickedIndex);
    },
  },
  pagination: {
    el: ".swiper-pagination",
  },
});