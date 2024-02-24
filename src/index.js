import './pages/index.css';
import {initialCards} from './cards';
import {openModal, closeModal} from './modal';
import {createCard, deleteCard, like} from './card';
import {cardList, formElement, nameInput, jobInput, formAddCard, cardNameInput, urlInput, addCardBtn, closeBtns, renameProfileBtn, popupProfile, popupAddCard, popupImg} from './constants';

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

  cardList.prepend(createCard(newCard, deleteCard, like));
  const activePopup = document.querySelector('.popup_is-opened');
  formAddCard.reset();
  closeModal(activePopup);
}

export {openModal};