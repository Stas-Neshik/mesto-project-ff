import './pages/index.css';
import { initialCards } from './cards';
const cardList = document.querySelector('.places__list');
const profileBtn = document.querySelector('.profile__edit-button');

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
  
  return cardElement;
}

// Функция удаления карточки

function deleteCard (evt) { 
  const listItem = evt.target.closest('.card');
  listItem.remove();
} 

// Вывести карточки на страницу

initialCards.forEach(function addCard(element){
  cardList.append(createCard(element, deleteCard));
});

profileBtn.addEventListener('click', openPopup)

function openPopup() {
  // console.log('hello');
  const popup = document.querySelector('.popup_type_edit')
  popup.classList.add('popup_is-opened');
}