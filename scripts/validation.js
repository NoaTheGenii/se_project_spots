const settings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__save-btn",
    inactiveButtonClass: "modal__save-btn_disabled",
    inputErrorClass: "modal__input_invalid",
    errorClass: "modal__error",
};

const showInputError = (formEl, inputEl, errorMsg, config) => {
    const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorMsgEl.textContent = errorMsg;
    inputEl.classList.add(config.inputErrorClass);
};

const hideInputError = (formEl, inputEl, config) => {
    const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorMsgEl.textContent = "";
    inputEl.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (formEl, inputEl, config) => {
    if (!inputEl.validity.valid) {
        showInputError(formEl, inputEl, inputEl.validationMessage, config);
    } else {
        hideInputError(formEl, inputEl, config);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputEl) => {
        return !inputEl.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonEl, config) => {
    if (hasInvalidInput(inputList)) {
        buttonEl.classList.add(config.inactiveButtonClass);
        buttonEl.disabled = true;
    } else {
        buttonEl.classList.remove(config.inactiveButtonClass);
        buttonEl.disabled = false;
    }
};

const setEventListeners = (formEl, config) => {
    const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
    const buttonEl = formEl.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonEl, config);
    inputList.forEach((inputEl) => {
        inputEl.addEventListener("input", function () {
            toggleButtonState(inputList, buttonEl, config);
            checkInputValidity(formEl, inputEl, config);
        });
    });
};

const enableValidation = (config) => {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((formEl) => {
        setEventListeners(formEl, config);
    });
};

enableValidation(settings);
