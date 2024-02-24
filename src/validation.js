function showInputError (form, input, errorMessage) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.classList.add('form__input-error_active');
  input.classList.add('popup__input_error');

  errorElement.textContent = errorMessage;


};

function hideInputError (form, input) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove('popup__input_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

function checkInputValidity (form, input) {
  if (!input.validity.valid) {
     showInputError(form, input, input.validationMessage)
  }
  else hideInputError(form, input)
};



function hasInvalidInput (inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};


function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    console.log('toggleButtonState работает')
    // buttonElement.classList.add('');
  }
  else {
    buttonElement.disabled = false;
    console.log('toggleButtonState работает')
    // buttonElement.classList.remove('');
  };
};


// На чем закончил = сделал функцию про кнопку! посмотри еще раз ее. на сейчас все работает.
// Нужно сделать класс для неактивной кнопки, потом начать делать кастомные предложения по валидации.




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


 export {checkInputValidity, enableValidation};
