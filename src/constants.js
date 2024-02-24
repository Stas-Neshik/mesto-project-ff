// Элементы 
export const cardList = document.querySelector('.places__list');
export const formElement = document.forms['edit-profile'];
export const nameInput = formElement.querySelector('.popup__input_type_name');
export const jobInput = formElement.querySelector('.popup__input_type_description');
export const formAddCard = document.forms['new-place'];
export const cardNameInput = document.querySelector('.popup__input_type_card-name');
export const urlInput = document.querySelector('.popup__input_type_url');
 
// Кнопки 
export const addCardBtn= document.querySelector('.profile__add-button');
export const closeBtns = document.querySelectorAll('.popup__close');
export const renameProfileBtn = document.querySelector('.profile__edit-button');

// Попапы
export const popupProfile = document.querySelector('.popup_type_edit')
export const popupAddCard = document.querySelector('.popup_type_new-card');
export const popupImg = document.querySelector('.popup_type_image');