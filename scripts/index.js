const initalCards = [
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

const editModal = document.querySelector("#edit-profile-modal");
const editFormElement = editModal.querySelector(".modal__form");
const editModalCloseButton = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalJobInput = editModal.querySelector("#profile-job-input");

/* const editModalSaveButton = document.querySelector(".modal__save-btn"); */

function openModal() {
    editModalNameInput.value = profileName.textContent;
    editModalJobInput.value = profileJob.textContent;
    editModal.classList.add("modal__opened");
}

function closeModal() {
    editModal.classList.remove("modal__opened");
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = editModalNameInput.value;
    profileJob.textContent = editModalJobInput.value;
    closeModal();
}

profileEditButton.addEventListener("click", openModal);
editModalCloseButton.addEventListener("click", closeModal);
editFormElement.addEventListener("submit", handleEditFormSubmit);
