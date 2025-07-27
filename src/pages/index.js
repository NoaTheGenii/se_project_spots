import {
  settings,
  disableButton,
  enableValidation,
  resetValidation,
} from "../scripts/validation.js";
import "./index.css";
import Api from "../utils/Api.js";
import setButtonText from "../utils/helpers.js";
import logoImage from "../images/logo.svg";
import profileAvatar from "../images/bessie-colman.png";
import profileEditBtn from "../images/edit-button-pencil.svg";
import addPostBtn from "../images/post-button.svg";
import closeBtn from "../images/close-button.svg";
import whitePencil from "../images/pencil-white.svg";

const profileLogo = document.querySelector("#header-logo");
const avatar = document.querySelector("#bessie-colman-avatar");
const avatarBtn = document.querySelector("#profile-avatar-btn");
const editBtn = document.querySelector("#profile-edit-btn");
const postBtn = document.querySelector("#profile-add-btn");
const profileClose = document.querySelector("#edit-profile-close-btn");
const addPostClose = document.querySelector("#add-post-close-btn");
const avatarClose = document.querySelector("#avatar-close-btn");

profileLogo.src = logoImage;
avatar.src = profileAvatar;
avatarBtn.src = whitePencil;
editBtn.src = profileEditBtn;
postBtn.src = addPostBtn;
profileClose.src = closeBtn;
addPostClose.src = closeBtn;
avatarClose.src = closeBtn;

const closeButtons = document.querySelectorAll(".modal__close-btn");
const allModals = document.querySelectorAll(".modal");

const profileModal = document.querySelector("#edit-profile-modal");
const profileFormElement = document.forms.editProfile;
const profileNameInput = profileModal.querySelector("#profile-name-input");
const profileJobInput = profileModal.querySelector("#profile-job-input");
const profileEditButton = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__text");

const cardModal = document.querySelector("#add-post-modal");
const cardSubmitButton = document.querySelector(".modal__save-btn");
const cardFormElement = document.forms.addPost;
const cardLinkInput = cardFormElement.elements.link;
const cardCaptionInput = cardFormElement.elements.caption;
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const addCardButton = document.querySelector(".profile__add-img");

const previewModal = document.querySelector("#preview-modal");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previewModalImgEl = previewModal.querySelector(".modal__img");

const avatarModal = document.querySelector("#avatar-modal");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarFormElement = document.forms.changeAvatar;
const avatarInput = avatarFormElement.elements.avatar;

const deleteModal = document.querySelector("#delete-modal");
const deleteFormElement = deleteModal.querySelector(".modal__delete-buttons");
const deleteCancelButton = deleteModal.querySelector(".modal__cancel-btn");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a90bdb36-e55c-4a6c-9bf2-6ab2312d2f70",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    avatar.src = userInfo.avatar;
    avatar.alt = "Avatar of " + userInfo.name;
    profileName.textContent = userInfo.name;
    profileJob.textContent = userInfo.about;

    cards.forEach((card) => {
      const cardElement = getCardElement(card);
      return cardsList.prepend(cardElement);
    });
  })
  .catch((err) => {
    console.error("Error fetching initial data:", err);
  });

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

allModals.forEach((modal) => {
  modal.addEventListener("click", exitModal);
});

// Card functions

let selectedCard, selectedCardId;

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  setButtonText(evt.submitter, true, "Deleting...", "Delete");
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
      disableButton(cardSubmitButton);
    })
    .catch((err) => {
      console.error("Error deleting card:", err);
    })
    .finally(() => {
      setButtonText(evt.submitter, false, "Deleting...", "Delete");
    });
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

  if (data.isLiked) {
    heartLikeButton.classList.add("card__btn-heart_filled");
  } else {
    heartLikeButton.classList.remove("card__btn-heart_filled");
  }

  heartLikeButton.addEventListener("click", (evt) => {
    toggleLike(evt, data);
  });
  deleteButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    handleDeleteCard(cardElement, data);
  });
  cardImgEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImgEl.src = data.link;
    previewModalImgEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
  });

  return cardElement;
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  setButtonText(evt.submitter, true);
  api
    .addNewCard({
      name: cardCaptionInput.value,
      link: cardLinkInput.value,
    })
    .then((data) => {
      const newCard = getCardElement(data);
      cardsList.prepend(newCard);
      cardFormElement.reset();
      disableButton(evt.submitter);
      closeModal(cardModal);
    })
    .catch((err) => {
      console.error("Error adding new card:", err);
    })
    .finally(() => {
      setButtonText(evt.submitter, false);
    });
}

function toggleLike(evt, data) {
  const heartIcon = evt.target;
  api
    .changeLikeStatus(data._id, data.isLiked)
    .then(() => {
      heartIcon.classList.toggle("card__btn-heart_filled");
      data.isLiked = !data.isLiked;
    })
    .catch((err) => {
      console.error("Like status not changed:", err);
    });
}

addCardButton.addEventListener("click", () => {
  openModal(cardModal);
});

cardFormElement.addEventListener("submit", handleAddCardSubmit);
deleteFormElement.addEventListener("submit", handleDeleteSubmit);
deleteCancelButton.addEventListener("click", () => {
  closeModal(deleteModal);
});

// Profile functions

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  setButtonText(evt.submitter, true);
  api
    .editUserInfo({
      name: profileNameInput.value,
      about: profileJobInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileJob.textContent = data.about;
      disableButton(evt.submitter);
      closeModal(profileModal);
    })
    .catch((err) => {
      console.error("Error updating user info:", err);
    })
    .finally(() => {
      setButtonText(evt.submitter, false);
    });
}

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  resetValidation(
    profileFormElement,
    [profileNameInput, profileJobInput],
    settings
  );
  openModal(profileModal);
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// Avatar functions

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  setButtonText(evt.submitter, true);
  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      avatar.src = data.avatar;
      avatar.alt = "Avatar of " + data.name;
      console.log(evt.submitter);
      disableButton(evt.submitter);
      closeModal(avatarModal);
      avatarFormElement.reset();
    })
    .catch((err) => {
      console.error("Error updating avatar:", err);
    })
    .finally(() => {
      setButtonText(evt.submitter, false);
    });
}

avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
  resetValidation(avatarFormElement, [avatarInput], settings);
});

avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);

enableValidation(settings);
