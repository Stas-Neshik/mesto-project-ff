import {likeCounterCards} from './api';

// Функция создания карточки
  const createCard = (cardData, deleteCallback, like, popupImage) => {

  const cardTemplate = document.getElementById('card-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallback);
  cardElement.querySelector('.card__like-button').addEventListener('click', like);
  cardElement.querySelector('.card__image').addEventListener('click', popupImage)

  return cardElement;
}

// Ф. Удаление карточки (корзина)
function deleteCard (evt) { 
  const listItem = evt.target.closest('.card');
  listItem.remove();
} 

// Ф. лайка карточки
// function like(evt) {
//     evt.target.classList.toggle('card__like-button_is-active');
// }


const like = () => {}

export {createCard, deleteCard, like};