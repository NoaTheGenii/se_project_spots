import {
  settings,
  disableButton,
  enableValidation,
  resetValidation,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
import "./index.css";
import logoImage from "../images/logo.svg";
import profileAvatar from "../images/bessie-colman.png";
import profileEditBtn from "../images/edit-button-pencil.svg";
import addPostBtn from "../images/post-button.svg";
import closeBtn from "../images/close-button.svg";

const initialCards = [
  {
    name: "Saint George's Hall",
    link: "https://images.unsplash.com/photo-1738866021351-9b1ca041a52e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBsYWNlcyUyMHdpdGglMjBuYW1lc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Taj Mahal",
    link: "https://images.unsplash.com/photo-1524473994769-c1bbbf30e944?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBsYWNlcyUyMHdpdGglMjBuYW1lc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Aboe Simbel",
    link: "https://images.unsplash.com/photo-1738580786680-b4490a382221?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHBsYWNlcyUyMHdpdGglMjBuYW1lc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Villa Celimontana",
    link: "https://images.unsplash.com/photo-1666456157988-4a97b08e02d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fHBsYWNlcyUyMHdpdGglMjBuYW1lc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Punta Leona",
    link: "https://images.unsplash.com/photo-1643400812282-4ef456a7b352?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fHBsYWNlcyUyMHdpdGglMjBuYW1lc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Cologne Cathedral",
    link: "https://images.unsplash.com/photo-1672429656671-ed83605b2062?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzgzfHxwbGFjZXMlMjB3aXRoJTIwbmFtZXN8ZW58MHx8MHx8fDA%3D",
  },
];

const profileEditButton = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__text");

const closeButtons = document.querySelectorAll(".modal__close-btn");
const allModals = document.querySelectorAll(".modal");

const editModal = document.querySelector("#edit-profile-modal");
const editFormElement = document.forms.editProfile;
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalJobInput = editModal.querySelector("#profile-job-input");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const addCardButton = document.querySelector(".profile__add-img");

const cardModal = document.querySelector("#add-post-modal");
const cardSubmitButton = document.querySelector(".modal__save-btn");
const cardFormElement = document.forms.addPost;
const cardLinkInput = cardFormElement.elements.link;
const cardCaptionInput = cardFormElement.elements.caption;

const previewModal = document.querySelector("#previewModal");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previewModalImgEl = previewModal.querySelector(".modal__img");

const profileLogo = document.querySelector("#header-logo");
const avatar = document.querySelector("#bessie-colman-avatar");
const editBtn = document.querySelector("#profile-edit-btn");
const postBtn = document.querySelector("#profile-add-btn");
const profileClose = document.querySelector("#edit-profile-close-btn");
const addPostClose = document.querySelector("#add-post-close-btn");

profileLogo.src = logoImage;
avatar.src = profileAvatar;
editBtn.src = profileEditBtn;
postBtn.src = addPostBtn;
profileClose.src = closeBtn;
addPostClose.src = closeBtn;

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a90bdb36-e55c-4a6c-9bf2-6ab2312d2f70",
    "Content-Type": "application/json",
  },
});

function toggleLike(evt) {
  const heartIcon = evt.target;
  heartIcon.classList.toggle("card__btn-heart_filled");
}

function handleDeleteCard(evt) {
  const cardElement = evt.target.closest(".card");
  cardElement.remove();
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__paragraph");
  const cardImgEl = cardElement.querySelector(".card__image");
  const heartLikeButton = cardElement.querySelector(".card__btn-heart");
  const deleteButton = cardElement.querySelector(".card__button-delete");

  cardNameEl.textContent = data.name;
  cardImgEl.src = data.link;
  cardImgEl.alt = data.name;

  heartLikeButton.addEventListener("click", toggleLike);
  deleteButton.addEventListener("click", handleDeleteCard);
  cardImgEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImgEl.src = data.link;
    previewModalImgEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
  });

  return cardElement;
}

function exitModal(evt) {
  closeModal(evt.target);
}

function handleModalEscape(evt) {
  if (evt.key === "Escape" || evt.key === 27) {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleModalEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleModalEscape);
}

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileJob.textContent = editModalJobInput.value;
  closeModal(editModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardCaptionInput.value,
    link: cardLinkInput.value,
  };
  const cardEl = getCardElement(newCard);
  cardsList.prepend(cardEl);
  cardFormElement.reset();
  disableButton(cardSubmitButton);
  closeModal(cardModal);
}

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalJobInput.value = profileJob.textContent;
  resetValidation(
    editFormElement,
    [editModalNameInput, editModalJobInput],
    settings
  );
  openModal(editModal);
});

addCardButton.addEventListener("click", () => {
  openModal(cardModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardFormElement.addEventListener("submit", handleAddCardSubmit);
allModals.forEach((modal) => {
  modal.addEventListener("click", exitModal);
});

initialCards.forEach((card) => {
  const cardElement = getCardElement(card);
  return cardsList.prepend(cardElement);
});

enableValidation(settings);
