import './pages/index.css';
import { initialCards } from './cards';

// Элементы 
const cardList = document.querySelector('.places__list');
const formElement = document.forms['edit-profile'];
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

// Кнопки 
const addCardBtn= document.querySelector('.profile__add-button');
const closeBtns = document.querySelectorAll('.popup__close');
const renameProfileBtn = document.querySelector('.profile__edit-button');

// Попапы

const popupProfile = document.querySelector('.popup_type_edit')
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup_type_image');


// Функция создания карточки

const createCard = (cardData, deleteCallback) => {

  const cardTemplate = document.getElementById('card-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallback);
  cardElement.querySelector('.card__like-button').addEventListener('click', function(evt){
    evt.target.classList.toggle('card__like-button_is-active');
  });
  cardElement.querySelector('.card__image').addEventListener('click', () => {

  popupImg.querySelector('.popup__image').src = cardData.link;
  popupImg.querySelector('.popup__image').alt = cardData.name;
  popupImg.querySelector('.popup__caption').textContent = cardData.name;
    openPopup(popupImg);
  })

  return cardElement;
}

// Ф. Удаление карточки (корзина)
function deleteCard (evt) { 
  const listItem = evt.target.closest('.card');
  listItem.remove();
} 
// Ф. Вывести карточки на страницу
initialCards.forEach(function addCard(element){
  cardList.append(createCard(element, deleteCard));
});

// Ф. Открыть Попап
function openPopup(popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
   window.addEventListener('keydown', closeEsc);
   window.addEventListener('click', closeArea);
}

// Ф. Закрыть Попап

function closePopup (popup) {
  popup.classList.remove('popup_is-opened');
   window.removeEventListener('keydown', closeEsc);
   window.removeEventListener('click', closeArea);
}


// Листенеры 
renameProfileBtn.addEventListener('click', () => {
  openPopup(popupProfile)
});

addCardBtn.addEventListener('click', () => {
  openPopup(popupAddCard)
});


closeBtns.forEach((btn) =>{
btn.addEventListener('click', (evt) => {
  closePopup(evt.target.closest('.popup'))
})
});

function closeArea (evt) {
  if (evt.target.classList.contains('popup')){
    closePopup(evt.target)
  }
}

function closeEsc (evt) {
  if (evt.key === 'Escape')
  {
    const activePopup = document.querySelector('.popup_is-opened');
    closePopup(activePopup);
  }
 }

function handleFormSubmit(evt) {
    evt.preventDefault(); 

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const nameTitle = document.querySelector('.profile__title');
  const jobTitle = document.querySelector('.profile__description');

  nameTitle.textContent = nameValue;
  jobTitle.textContent = jobValue;
  
  const activePopup = document.querySelector('.popup_is-opened');
  closePopup(activePopup);
}

formElement.addEventListener('submit', handleFormSubmit);

const formAddCard = document.forms['new-place'];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');



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
  closePopup(activePopup);
}


formAddCard.addEventListener('submit', addCardSubmit);