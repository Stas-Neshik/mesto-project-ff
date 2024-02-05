import './pages/index.css';
import {initialCards} from './cards';
import {openModal, closeModal} from './modal';
import {createCard, deleteCard, like} from './card';

// Элементы 
const cardList = document.querySelector('.places__list');
const formElement = document.forms['edit-profile'];
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const formAddCard = document.forms['new-place'];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');
 
// Кнопки 
const addCardBtn= document.querySelector('.profile__add-button');
const closeBtns = document.querySelectorAll('.popup__close');
const renameProfileBtn = document.querySelector('.profile__edit-button');

// Попапы
const popupProfile = document.querySelector('.popup_type_edit')
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup_type_image');

// Ф. Вывести карточки на страницу
initialCards.forEach(function addCard(element){
  cardList.append(createCard(element, deleteCard, like, openPopupImage));
});

// Листенеры 
renameProfileBtn.addEventListener('click', () => {
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  openModal(popupProfile)
});

addCardBtn.addEventListener('click', () => {
  openModal(popupAddCard)
});

formAddCard.addEventListener('submit', addCardSubmit);

formElement.addEventListener('submit', handleFormSubmitProfile);

// Ф. Попап картинки
function openPopupImage(evt) {
  popupImg.querySelector('.popup__image').src = evt.target.src;
  popupImg.querySelector('.popup__image').alt = evt.target.alt;
  popupImg.querySelector('.popup__caption').textContent = evt.target.alt;
  openModal(popupImg);
}

closeBtns.forEach((btn) =>{
btn.addEventListener('click', (evt) => {
  closeModal(evt.target.closest('.popup'))
})
});

function handleFormSubmitProfile(evt) {
  evt.preventDefault(); 

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  
  const nameTitle = document.querySelector('.profile__title');
  const jobTitle = document.querySelector('.profile__description');

  nameTitle.textContent = nameValue;
  jobTitle.textContent = jobValue;

  closeModal(popupProfile);
}

function addCardSubmit (evt) {
  evt.preventDefault(); 

  const placeValue = cardNameInput.value;
  const urlValue = urlInput.value;

  const newCard = {
    name: placeValue,
    link: urlValue
  }

  cardList.prepend(createCard(newCard, deleteCard));
  const activePopup = document.querySelector('.popup_is-opened');
  formAddCard.reset();
  closeModal(activePopup);
}

export {openModal};