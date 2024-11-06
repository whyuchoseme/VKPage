import {
  cropText,
  getMonetaryFormat,
  createRandomInteger,
} from "./utils/utils.js";

const headerLogo = document.querySelector(".header-logo-svg").parentNode;
const headerAvatar = document.querySelector(".header-avatar-png"); // Чтобы в дальнейшем подгрузить ее с сервера
const whatIsNewAvatar = document.querySelector(".main-avatar-png"); // Чтобы в дальнейшем подгрузить ее с сервера
const history = document.querySelector(".history");
const historySlider = document.querySelector(".history__slider");
const sliderArrowRight = document.querySelector(".history-slider__arrow-right");
const sliderArrowLeft = document.querySelector(".history-slider__arrow-left");
const historySliderItemUser = document.querySelector(
  ".history-slider-item__user"
); // Чтобы в дальнейшем подгрузить ее с сервера
const userNews = document.querySelector(".user-news");

/* Запросы и создание контента */

// Должен подгружать картинку профиля пользователя в header-control__profile с сервера
headerAvatar.src = "./images/avatar/avatar.png";
// Должен подгружать картинку профиля пользователя в what-is-new__avatar с сервера
whatIsNewAvatar.src = "./images/avatar/avatar.png";

function createHistorySliderItem() {
  // Должен подгружать картинку профиля пользователя в history__slider с сервера
  historySliderItemUser.src =
    "./images/main-center/history-slider/history-slider-profile.jpg";

  // Создает слайдер в history__slider
  const maxCountImages = 6;
  for (let i = 0; i < maxCountImages; i++) {
    const historySliderItem = document.createElement("a");
    historySliderItem.classList.add(
      "history-slider__item",
      "history-slider-item"
    );
    historySlider.append(historySliderItem);

    const historySliderItemImage = document.createElement("img");
    historySliderItemImage.classList.add("history-slider-item__image");
    historySliderItemImage.src = `./images/main-center/history-slider/history-slider-image-${
      i + 1
    }.jpg`;
    historySliderItemImage.alt = `slider-image-${i + 1}.jpg`;
    historySliderItem.append(historySliderItemImage);

    const historySliderItemInfo = document.createElement("div");
    historySliderItemInfo.classList.add(
      "history-slider-item__info",
      "slider-item-info"
    );
    historySliderItem.append(historySliderItemInfo);

    const itemInfoLogo = document.createElement("div");
    itemInfoLogo.classList.add(
      "slider-item-info__logo",
      "slider-logo",
      "unseen"
    );
    historySliderItemInfo.append(itemInfoLogo);

    const itemInfoParagraph = document.createElement("p");
    itemInfoParagraph.classList.add("unseen");
    // const paragraphText = content[i].text; // Должно подгружаться с сервера
    /* Затычка (пока сервера нет) START */
    const paragraphText = `История №${i + 1}`;
    /* Затычка (пока сервера нет) END */

    if (paragraphText.length > 11) {
      itemInfoParagraph.textContent = `${cropText(`История №${i + 1}`, 8)}...`;
    } else {
      itemInfoParagraph.textContent = paragraphText;
    }

    historySliderItemInfo.append(itemInfoParagraph);

    const infoLogoImage = document.createElement("img");
    infoLogoImage.classList.add("slider-logo__image");
    infoLogoImage.src = `./images/main-center/history-slider/history-slider-image-${
      maxCountImages - i
    }.jpg`;
    infoLogoImage.alt = `slider-logo-image-${maxCountImages - i}`;
    itemInfoLogo.append(infoLogoImage);

    historySliderItem.addEventListener("click", () => {
      if (itemInfoLogo.classList.contains("unseen")) {
        itemInfoLogo.classList.remove("unseen");
        itemInfoParagraph.classList.remove("unseen");
      }
    });
  }
}

createHistorySliderItem();

async function getUserNews() {
  const response = await fetch(
    "https://603e38c548171b0017b2ecf7.mockapi.io/homes"
  );
  const content = await response.json();

  for (let i = 0; i < content.length; i++) {
    const userNewsItem = document.createElement("div");
    userNewsItem.classList.add("user-news__item", "user-news-item");
    userNews.append(userNewsItem);

    const userNewsItemLogo = document.createElement("div");
    userNewsItemLogo.classList.add("user-news-item__logo", "news-item-logo");
    userNewsItem.append(userNewsItemLogo);

    const newsItemLogoImage = document.createElement("div");
    newsItemLogoImage.classList.add("news-item-logo__image");
    userNewsItemLogo.append(newsItemLogoImage);

    const logoImagePicture = document.createElement("img");
    logoImagePicture.classList.add("user-news-logo-image");
    logoImagePicture.src = `./images/main-center/user-news/user-news-item-image-${
      content.length - i
    }.jpeg`;
    logoImagePicture.alt = `news-item-image-${content.length - i}`;
    newsItemLogoImage.append(logoImagePicture);

    const newsItemLogoTitle = document.createElement("div");
    newsItemLogoTitle.classList.add("news-item-logo__title");
    newsItemLogoTitle.textContent = content[i].title;
    userNewsItemLogo.append(newsItemLogoTitle);

    const userNewsDescription = document.createElement("div");
    userNewsDescription.classList.add("user-news__description");
    // Здесь должен быть контент добавленный пользователем
    userNewsDescription.innerHTML = `Address: ${content[i].address}<br>
        Price: <b>${getMonetaryFormat(
          "en-US",
          "currency",
          "EUR",
          0,
          content[i].price
        )}</b>`;
    userNewsItem.append(userNewsDescription);

    const userNewsImage = document.createElement("img");
    userNewsImage.classList.add("user-news__media");
    userNewsImage.src = `./images/main-center/user-news/user-news-item-image-${
      i + 1
    }.jpeg`;
    userNewsImage.alt = `news-item-image-${i + 1}`;
    userNewsItem.append(userNewsImage);

    const userNewsReaction = document.createElement("div");
    userNewsReaction.classList.add("user-news__reaction", "user-news-reaction");
    userNewsItem.append(userNewsReaction);

    const randomIntegerLikes = createRandomInteger(0, 1000);

    // Создаем 3 кнопки реакции
    for (let i = 0; i < 3; i++) {
      const userNewsReactionButton = document.createElement("button");
      userNewsReactionButton.classList.add(
        "user-news-reaction__buttons",
        `user-news-reaction__button-${i + 1}`
      );

      if (
        randomIntegerLikes <= 0 &&
        userNewsReactionButton.classList.contains(
          "user-news-reaction__button-1"
        )
      ) {
        userNewsReactionButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="currentColor" fill-rule="nonzero" d="M16 4a5.95 5.95 0 0 0-3.89 1.7l-.12.11-.12-.11A5.96 5.96 0 0 0 7.73 4 5.73 5.73 0 0 0 2 9.72c0 3.08 1.13 4.55 6.18 8.54l2.69 2.1c.66.52 1.6.52 2.26 0l2.36-1.84.94-.74c4.53-3.64 5.57-5.1 5.57-8.06A5.73 5.73 0 0 0 16.27 4zm.27 1.8a3.93 3.93 0 0 1 3.93 3.92v.3c-.08 2.15-1.07 3.33-5.51 6.84l-2.67 2.08a.04.04 0 0 1-.04 0L9.6 17.1l-.87-.7C4.6 13.1 3.8 11.98 3.8 9.73A3.93 3.93 0 0 1 7.73 5.8c1.34 0 2.51.62 3.57 1.92a.9.9 0 0 0 1.4-.01c1.04-1.3 2.2-1.91 3.57-1.91z"/></svg>`;
      } else if (
        randomIntegerLikes > 0 &&
        userNewsReactionButton.classList.contains(
          "user-news-reaction__button-1"
        )
      ) {
        userNewsReactionButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="currentColor" fill-rule="nonzero" d="M16 4a5.95 5.95 0 0 0-3.89 1.7l-.12.11-.12-.11A5.96 5.96 0 0 0 7.73 4 5.73 5.73 0 0 0 2 9.72c0 3.08 1.13 4.55 6.18 8.54l2.69 2.1c.66.52 1.6.52 2.26 0l2.36-1.84.94-.74c4.53-3.64 5.57-5.1 5.57-8.06A5.73 5.73 0 0 0 16.27 4zm.27 1.8a3.93 3.93 0 0 1 3.93 3.92v.3c-.08 2.15-1.07 3.33-5.51 6.84l-2.67 2.08a.04.04 0 0 1-.04 0L9.6 17.1l-.87-.7C4.6 13.1 3.8 11.98 3.8 9.73A3.93 3.93 0 0 1 7.73 5.8c1.34 0 2.51.62 3.57 1.92a.9.9 0 0 0 1.4-.01c1.04-1.3 2.2-1.91 3.57-1.91z"/></svg>
        <span class="user-news__like-count">${randomIntegerLikes}</span>`;
      } else if (
        userNewsReactionButton.classList.contains(
          "user-news-reaction__button-2"
        )
      ) {
        userNewsReactionButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="currentColor" fill-rule="nonzero" d="M16.9 4H7.1c-1.15 0-1.73.11-2.35.44-.56.3-1 .75-1.31 1.31C3.11 6.37 3 6.95 3 8.1v5.8c0 1.15.11 1.73.44 2.35.3.56.75 1 1.31 1.31l.15.07c.51.25 1.04.35 1.95.37h.25v2.21c0 .44.17.85.47 1.16l.12.1c.64.55 1.6.52 2.21-.08L13.37 18h3.53c1.15 0 1.73-.11 2.35-.44.56-.3 1-.75 1.31-1.31.33-.62.44-1.2.44-2.35V8.1c0-1.15-.11-1.73-.44-2.35a3.17 3.17 0 0 0-1.31-1.31A4.51 4.51 0 0 0 16.9 4zm-10 1.8h9.99c.88 0 1.18.06 1.5.23.25.13.44.32.57.57.17.32.23.62.23 1.5v6.16c-.02.61-.09.87-.23 1.14-.13.25-.32.44-.57.57-.32.17-.62.23-1.5.23h-4.02a.9.9 0 0 0-.51.26l-3.47 3.4V17.1c0-.5-.4-.9-.9-.9H6.74a2.3 2.3 0 0 1-1.14-.23 1.37 1.37 0 0 1-.57-.57c-.17-.32-.23-.62-.23-1.5V7.74c.02-.61.09-.87.23-1.14.13-.25.32-.44.57-.57.3-.16.58-.22 1.31-.23z"/></svg>`;
      } else if (
        userNewsReactionButton.classList.contains(
          "user-news-reaction__button-3"
        )
      ) {
        userNewsReactionButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="currentColor" fill-rule="nonzero" d="M12 3.73c-1.12.07-2 1-2 2.14v2.12h-.02a9.9 9.9 0 0 0-7.83 10.72.9.9 0 0 0 1.61.46l.19-.24a9.08 9.08 0 0 1 5.84-3.26l.2-.03.01 2.5a2.15 2.15 0 0 0 3.48 1.69l7.82-6.14a2.15 2.15 0 0 0 0-3.38l-7.82-6.13c-.38-.3-.85-.46-1.33-.46zm.15 1.79c.08 0 .15.03.22.07l7.82 6.14a.35.35 0 0 1 0 .55l-7.82 6.13a.35.35 0 0 1-.57-.28V14.7a.9.9 0 0 0-.92-.9h-.23l-.34.02c-2.28.14-4.4.98-6.12 2.36l-.17.15.02-.14a8.1 8.1 0 0 1 6.97-6.53.9.9 0 0 0 .79-.9V5.87c0-.2.16-.35.35-.35z"/></svg>`;
      }

      userNewsReaction.append(userNewsReactionButton);
    }
  }

  // Логика реагирования на нажатие кнопки ".user-news-reaction__button-1"
  const allButtonsLikes = document.querySelectorAll(
    ".user-news-reaction__button-1"
  );

  allButtonsLikes.forEach((specificLikeButton) => {
    let likesCount = specificLikeButton.textContent;

    /* specificLikeButton.addEventListener("click", (e) => { // Добавить, если нужна возможность "накрутить" лайки вручную
      if (e.currentTarget.classList.contains("contains-user-like")) {
        e.currentTarget.disabled = true;
      } else {
        e.currentTarget.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path
            fill="currentColor"
            fill-rule="nonzero"
            d="M16 4a5.95 5.95 0 0 0-3.89 1.7l-.12.11-.12-.11A5.96 5.96 0 0 0 7.73 4 5.73 5.73 0 0 0 2 9.72c0 3.08 1.13 4.55 6.18 8.54l2.69 2.1c.66.52 1.6.52 2.26 0l2.36-1.84.94-.74c4.53-3.64 5.57-5.1 5.57-8.06A5.73 5.73 0 0 0 16.27 4zm.27 1.8a3.93 3.93 0 0 1 3.93 3.92v.3c-.08 2.15-1.07 3.33-5.51 6.84l-2.67 2.08a.04.04 0 0 1-.04 0L9.6 17.1l-.87-.7C4.6 13.1 3.8 11.98 3.8 9.73A3.93 3.93 0 0 1 7.73 5.8c1.34 0 2.51.62 3.57 1.92a.9.9 0 0 0 1.4-.01c1.04-1.3 2.2-1.91 3.57-1.91z"
          />
        </svg>
        <span class="user-news__like-count">${++likesCount}</span>
        `;
      }
    }); */

    // specificLikeButton.addEventListener("contextmenu", (e) => { // Заменить на нее, если нужна возможность "накрутить" лайки вручную
    specificLikeButton.addEventListener("click", (e) => {
      if (!e.currentTarget.classList.contains("contains-user-like")) {
        e.currentTarget.classList.add("contains-user-like");
        e.currentTarget.innerHTML = `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
          >
            <circle cx="12" cy="12" r="12" fill="currentColor" />
            <path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span class="user-news__like-count-user">${++likesCount}</span>
          `;
      } else {
        e.currentTarget.classList.remove("contains-user-like");
        // e.currentTarget.disabled = false; // Добавить, если нужна возможность "накрутить" лайки вручную
        e.currentTarget.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path
            fill="currentColor"
            fill-rule="nonzero"
            d="M16 4a5.95 5.95 0 0 0-3.89 1.7l-.12.11-.12-.11A5.96 5.96 0 0 0 7.73 4 5.73 5.73 0 0 0 2 9.72c0 3.08 1.13 4.55 6.18 8.54l2.69 2.1c.66.52 1.6.52 2.26 0l2.36-1.84.94-.74c4.53-3.64 5.57-5.1 5.57-8.06A5.73 5.73 0 0 0 16.27 4zm.27 1.8a3.93 3.93 0 0 1 3.93 3.92v.3c-.08 2.15-1.07 3.33-5.51 6.84l-2.67 2.08a.04.04 0 0 1-.04 0L9.6 17.1l-.87-.7C4.6 13.1 3.8 11.98 3.8 9.73A3.93 3.93 0 0 1 7.73 5.8c1.34 0 2.51.62 3.57 1.92a.9.9 0 0 0 1.4-.01c1.04-1.3 2.2-1.91 3.57-1.91z"
          />
        </svg>
        <span class="user-news__like-count">${--likesCount}</span>
        `;
        if (likesCount <= 0) {
          document.querySelector(".user-news__like-count").remove();
        }
      }
    });
  });
}

getUserNews();

/* Логика отдельных кнопок и блоков */

headerLogo.addEventListener("click", () => {
  // Создает эффект подергивания vk-icon при клике и обновляет страницу
  headerLogo.style.animation = "header-logo-animation 0.1s";
  setTimeout(() => (window.location.href = "/VKPage/"), 200);
});

history.addEventListener("mouseover", () => {
  // Задает поведение для стрелок скролла историй в history-image (history-image__arrow-right, history-image__arrow-left)
  if (!historySlider.classList.contains("move-image-right")) {
    sliderArrowRight.style.display = "flex";
  } else {
    sliderArrowLeft.style.display = "flex";
  }

  arrowRightInstructions();
  arrowLeftInstructions();
});

history.addEventListener("mouseout", () => {
  // Задает поведение для стрелок скролла историй в history-image (history-image__arrow-right, history-image__arrow-left)
  sliderArrowRight.style.display = "none";
  sliderArrowLeft.style.display = "none";
});

function arrowRightInstructions() {
  // Описывает поведение правой стрелки в history__slider
  sliderArrowRight.addEventListener("mouseover", () => {
    historySlider.classList.add("charge-image-right");
  });

  sliderArrowRight.addEventListener("mouseout", () => {
    historySlider.classList.remove("charge-image-right");
  });

  sliderArrowRight.addEventListener("click", () => {
    sliderArrowRight.style.display = "none";
    historySlider.classList.add("move-image-right");
    historySlider.classList.remove("charge-image-right");
  });
}

function arrowLeftInstructions() {
  // Описывает поведение левой стрелки в history__slider
  sliderArrowLeft.addEventListener("mouseover", () => {
    historySlider.classList.add("charge-image-left");
  });

  sliderArrowLeft.addEventListener("mouseout", () => {
    historySlider.classList.remove("charge-image-left");
  });

  sliderArrowLeft.addEventListener("click", () => {
    sliderArrowLeft.style.display = "none";
    historySlider.classList.remove("move-image-right");
    historySlider.classList.remove("charge-image-left");
  });
}
