



// Показ ошибки
function showInputError (validationConfig, form, input) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.classList.add(validationConfig.inputErrorActive);
  input.classList.add(validationConfig.inputError);
  errorElement.textContent = input.validationMessage;
};

// Удаление ошибки
function hideInputError (validationConfig ,form, input) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.classList.remove(validationConfig.inputErrorActive);
  input.classList.remove(validationConfig.inputError);

  errorElement.textContent = '';
};

// Проверка валидации, кастомная ошибка + обычная

function checkInputValidity (form, input, validationConfig) {

  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
} 
  else input.setCustomValidity("");

  if (!input.validity.valid) {
     showInputError(validationConfig ,form, input);
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
function toggleButtonState (inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
     buttonElement.classList.add(validationConfig.inactiveButtonClass);
  }
  else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  };
};



function setEventListeners (formEl, validationConfig) {

  const inputList = Array.from(formEl.querySelectorAll(validationConfig.inputSelector));
  const btn = formEl.querySelector(validationConfig.submitButtonSelector);


  inputList.forEach(input => {
    input.addEventListener('input', function () {
     checkInputValidity(formEl ,input, validationConfig);
     toggleButtonState(inputList, btn, validationConfig);
    });
  });
};

// выбрал все формы на странице (Работает)
function enableValidation (validationConfig) {

  const formList = document.querySelectorAll(validationConfig.formSelector);
  formList.forEach(formEl => {
    setEventListeners(formEl, validationConfig);
  });
}


function clearValidation  (formElement, validationConfig) {

// const {inputSelector ,submitButtonSelector, inactiveButtonClass} = validationConfig

  const btn = formElement.querySelector(validationConfig.submitButtonSelector )
  btn.classList.add(validationConfig.inactiveButtonClass);
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));

inputList.forEach(input => {
  input.value = '';
  hideInputError(validationConfig, formElement, input);
  btn.disabled = true;
  btn.classList.add(validationConfig.inactiveButtonClass);
})

}

 export {enableValidation, clearValidation};
