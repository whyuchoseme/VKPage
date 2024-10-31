import { cropText } from "./utils/utils.js";

const audio = document.getElementById("standard-player-audio");
const btnPrev = document.querySelector(".player-vk__prev");
const btnPlay = document.querySelector(".player-vk__play");
const btnNext = document.querySelector(".player-vk__next");
const audioTrackName = document.querySelector(".player-vk__audio-name");

const playlist = [
  "PARTICLES feat. кошечка - Прекрасное далёко.mp3",
  "Akon - Ghetto.mp3",
  "50 Cent - You don't know.mp3",
];

let IndexOfTrack; // Переменная с индексом трека
let audioCurrentTimeTrack; // В дальнейшем будет храниться текущее время трека
let audioFullTimeTrack; // В дальнейшем будет храниться общее время трека

// Событие после полной загрузкой страницы
window.onload = function () {
  IndexOfTrack = 0;
  audio.volume = 0.1;

  getCorrectLengthTrackName();
};

btnPrev.addEventListener("click", function () {
  btnPlay.classList.remove("not-playing");
  btnPlay.innerHTML = `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="gray"
        viewBox="0 0 512 512"
      >
        <path
          fill-rule="evenodd"
          d="M256 0C114.625 0 0 114.609 0 256c0 141.375 114.625 256 256 256s256-114.625 256-256C512 114.609 397.375 0 256 0Zm0 448c-106.031 0-192-85.969-192-192S149.969 64 256 64s192 85.969 192 192-85.969 192-192 192Zm-96-128h64V192h-64Zm128 0h64V192h-64Z"
        />
      </svg>`;

  if (IndexOfTrack > 0) {
    IndexOfTrack--;
    switchTrack(IndexOfTrack);
  } else {
    IndexOfTrack = playlist.length - 1;
    switchTrack(IndexOfTrack);
  }
});

btnPlay.addEventListener("click", function () {
  if (btnPlay.classList.contains("not-playing")) {
    audio.play();

    audio.addEventListener("timeupdate", () => {
      audioCurrentTimeTrack = Math.round(audio.currentTime);
      audioFullTimeTrack = Math.round(audio.duration);

      if (
        audioCurrentTimeTrack == audioFullTimeTrack &&
        IndexOfTrack < playlist.length - 1
      ) {
        IndexOfTrack++;
        switchTrack(IndexOfTrack);
      } else if (
        audioCurrentTimeTrack == audioFullTimeTrack &&
        IndexOfTrack >= playlist.length - 1
      ) {
        IndexOfTrack = 0;
        switchTrack(IndexOfTrack);
      }
    });

    btnPlay.classList.remove("not-playing");
    btnPlay.innerHTML = `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="gray"
        viewBox="0 0 512 512"
      >
        <path
          fill-rule="evenodd"
          d="M256 0C114.625 0 0 114.609 0 256c0 141.375 114.625 256 256 256s256-114.625 256-256C512 114.609 397.375 0 256 0Zm0 448c-106.031 0-192-85.969-192-192S149.969 64 256 64s192 85.969 192 192-85.969 192-192 192Zm-96-128h64V192h-64Zm128 0h64V192h-64Z"
        />
      </svg>`;
  } else {
    audio.pause();

    btnPlay.classList.add("not-playing");
    btnPlay.innerHTML = `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 512 512"
        fill="gray"
      >
        <path
          fill-rule="evenodd"
          d="M256 512C114.625 512 0 397.375 0 256 0 114.609 114.625 0 256 0s256 114.609 256 256c0 141.375-114.625 256-256 256Zm0-448C149.969 64 64 149.969 64 256s85.969 192 192 192 192-85.969 192-192S362.031 64 256 64Zm-64 96 160 96-160 96Z"
        />
      </svg>`;
  }
});

btnNext.addEventListener("click", function () {
  btnPlay.classList.remove("not-playing");
  btnPlay.innerHTML = `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="gray"
        viewBox="0 0 512 512"
      >
        <path
          fill-rule="evenodd"
          d="M256 0C114.625 0 0 114.609 0 256c0 141.375 114.625 256 256 256s256-114.625 256-256C512 114.609 397.375 0 256 0Zm0 448c-106.031 0-192-85.969-192-192S149.969 64 256 64s192 85.969 192 192-85.969 192-192 192Zm-96-128h64V192h-64Zm128 0h64V192h-64Z"
        />
      </svg>`;

  if (IndexOfTrack < playlist.length - 1) {
    IndexOfTrack++;
    switchTrack(IndexOfTrack);
  } else {
    IndexOfTrack = 0;
    switchTrack(IndexOfTrack);
  }
});

function getCorrectLengthTrackName(numTrack = 0) {
  // Корректное отображение имени треков
  if (playlist[numTrack].length > 34) {
    audioTrackName.innerHTML = `${cropText(
      playlist[numTrack].slice(0, -4),
      34
    )}...`;
  } else {
    audioTrackName.innerHTML = playlist[numTrack].slice(0, -4);
  }
}

function switchTrack(numTrack) {
  // Меняем значение атрибута src
  audio.src = "./audio/" + playlist[numTrack];
  // Назначаем время песни ноль
  audioCurrentTimeTrack = 0;
  getCorrectLengthTrackName(numTrack);
  // Включаем песню
  audio.play();
}
