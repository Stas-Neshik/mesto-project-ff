
// Показ ошибки
function showInputError (form, input, errorMessage) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.classList.add('form__input-error_active');
  input.classList.add('popup__input_error');
  errorElement.textContent = errorMessage;
};

// Удаление ошибки
function hideInputError (form, input) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove('popup__input_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

// Проверка валидации, кастомная ошибка + обычная

function checkInputValidity (form, input) {

  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
} 
  else input.setCustomValidity("");

  if (!input.validity.valid) {
     showInputError(form, input, input.validationMessage);
  }
  else hideInputError(form, input);
};


  // Проверка валидации для кнопки (возвращает true (?) в зависимости от того как прошла валидация)
function hasInvalidInput (inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

  // Закрашиваем кнопку в зависимости от проверки валидации формы
function toggleButtonState (inputList, buttonElement) {

  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
     buttonElement.classList.add('popup__button_inactive');
  }
  else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_inactive');
  };
};



// повесил слушатели на все инпуты в форме (Работает)
function setEventListeners (formEl) {
  const inputList = Array.from(formEl.querySelectorAll('.popup__input'));
  const btn = formEl.querySelector('.popup__button');

  inputList.forEach(input => {
    input.addEventListener('input', function () {
     checkInputValidity(formEl ,input);
     toggleButtonState(inputList, btn);
    });
  });
};

// выбрал все формы на странице (Работает)
function enableValidation () {
  const formList = document.querySelectorAll('.popup__form');

  formList.forEach(formEl => {
    setEventListeners(formEl);
  });
}


 export {enableValidation};
