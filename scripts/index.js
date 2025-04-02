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

const modal = document.querySelector(".modal");
const editModal = document.querySelector("#edit-profile-modal");
const editFormElement = document.forms.editProfile;
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editFormElement.elements.name;
const editModalJobInput = editFormElement.elements.job;

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const addCardButton = document.querySelector(".profile__add-img");
const cardLink = document.querySelector(".card__image");
const cardCaption = document.querySelector(".card__paragraph");

const cardModal = document.querySelector("#add-post-modal");
const cardFormElement = document.forms.addPost;
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
const cardLinkInput = cardFormElement.elements.link;
const cardCaptionInput = cardFormElement.elements.caption;

const previewModal = document.querySelector("#previewModal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previewModalImgEl = previewModal.querySelector(".modal__img");

function toggleLike(evt) {
    const heartIcon = evt.target;
    heartIcon.classList.toggle("card__btn-heart_filled");

    if (heartIcon.classList.contains("card__btn-heart_filled")) {
        heartIcon.src = "./images/heart-filled.svg";
    } else {
        heartIcon.src = "./images/heart-empty.svg";
    }
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
    const deleteButton = cardElement.querySelector(".card__btn-delete");

    cardNameEl.textContent = data.name;
    cardImgEl.src = data.link;
    cardImgEl.alt = data.name;

    heartLikeButton.addEventListener("click", toggleLike);
    deleteButton.addEventListener("click", handleDeleteCard);
    cardImgEl.addEventListener("click", () => {
        openModal(previewModal);
        previewModalImgEl.src = data.link;
        previewModalCaptionEl.textContent = data.name;
    });

    return cardElement;
}

function openModal(modal) {
    modal.classList.add("modal_opened");
}

function closeModal(modal) {
    modal.classList.remove("modal_opened");
}

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
    closeModal(cardModal);
}

profileEditButton.addEventListener("click", () => {
    openModal(editModal);
});

addCardButton.addEventListener("click", () => {
    openModal(cardModal);
});

editModalCloseBtn.addEventListener("click", () => {
    closeModal(editModal);
});

cardModalCloseBtn.addEventListener("click", () => {
    closeModal(cardModal);
});

previewModalCloseBtn.addEventListener("click", () => {
    closeModal(previewModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((card) => {
    const cardElement = getCardElement(card);
    return cardsList.prepend(cardElement);
});
