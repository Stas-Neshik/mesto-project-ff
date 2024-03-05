import {validationConfig} from './constants';



// Показ ошибки
function showInputError (validationConfig, form, input, errorMessage) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.classList.add(validationConfig.inputErrorActive);
  input.classList.add(validationConfig.inputError);
  errorElement.textContent = errorMessage;
};

// Удаление ошибки
function hideInputError (validationConfig ,form, input) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.classList.remove(validationConfig.inputErrorActive);
  input.classList.remove(validationConfig.inputError);

  errorElement.textContent = '';
};

// Проверка валидации, кастомная ошибка + обычная

function checkInputValidity (form, input) {

  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
} 
  else input.setCustomValidity("");

  if (!input.validity.valid) {
     showInputError(validationConfig ,form, input, input.validationMessage);
  }
  else hideInputError(validationConfig, form, input);
};


  // Проверка валидации для кнопки (возвращает true (?) в зависимости от того как прошла валидация)
function hasInvalidInput (inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

  // Закрашиваем кнопку в зависимости от проверки валидации формы
function toggleButtonState (inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
     buttonElement.classList.add(inactiveButtonClass);
  }
  else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  };
};




function setEventListeners (formEl, formConfig) {
  const {inputSelector, submitButtonSelector, inactiveButtonClass} = formConfig
  const inputList = Array.from(formEl.querySelectorAll(inputSelector));
  const btn = formEl.querySelector(submitButtonSelector);


  inputList.forEach(input => {
    input.addEventListener('input', function () {
     checkInputValidity(formEl ,input);
     toggleButtonState(inputList, btn, inactiveButtonClass);
    });
  });
};

// выбрал все формы на странице (Работает)
function enableValidation (validationConfig) {

  const {formSelector, ...formConfig} = validationConfig
  const formList = document.querySelectorAll(formSelector);

  formList.forEach(formEl => {
    setEventListeners(formEl, formConfig);
  });
}

function clearValidation  (formElement, validationConfig) {

const {inputSelector ,submitButtonSelector, inactiveButtonClass} = validationConfig

  const btn = formElement.querySelector(submitButtonSelector)
  btn.classList.add(inactiveButtonClass);
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

inputList.forEach(input => {
  input.value = '';
  hideInputError(validationConfig, formElement, input);
  btn.disabled = true;
  btn.classList.add(inactiveButtonClass);
})

}

 export {enableValidation, clearValidation};
