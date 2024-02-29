// Элементы 
export const cardList = document.querySelector('.places__list');
export const formElement = document.forms['edit-profile'];

export const nameInput = formElement.querySelector('.popup__input_type_name');
export const jobInput = formElement.querySelector('.popup__input_type_description');
export const formAddCard = document.forms['new-place'];
export const cardNameInput = document.querySelector('.popup__input_type_card-name');
export const urlInput = document.querySelector('.popup__input_type_url');
export const nameTitle = document.querySelector('.profile__title');
export const jobTitle = document.querySelector('.profile__description');
 
// Кнопки 
export const addCardBtn= document.querySelector('.profile__add-button');
export const closeBtns = document.querySelectorAll('.popup__close');
export const renameProfileBtn = document.querySelector('.profile__edit-button');
export const profileImg = document.querySelector('.profile__image');

// Попапы
export const popupProfile = document.querySelector('.popup_type_edit')
export const popupAddCard = document.querySelector('.popup_type_new-card');
export const popupImg = document.querySelector('.popup_type_image');
export const popupAvatar = document.querySelector('.popup_type_avatar');

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'form__input-error_active',
  errorClass: 'popup__error_visible'
}