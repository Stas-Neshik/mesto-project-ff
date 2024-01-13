'use strict';
// @todo: Темплейт карточки

// @todo: DOM узлы

const cardList = document.querySelector('.places__list');
  // const cardTemplate = document.getElementById('card-template').content;
  // const cardElement = cardTemplate.cloneNode(true); 

// @todo: Функция создания карточки


const createCard = (cardData) => {

  const cardTemplate = document.getElementById('card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const deleteBtn = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__like-button').addEventListener('click', function(evt){
    evt.target.classList.toggle('card__like-button_is-active');
  });
  deleteBtn.addEventListener('click', function () {
    const listItem = deleteBtn.closest('.card')
    listItem.remove();
  })
  
  return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard (){ 
} 

// @todo: Вывести карточки на страницу

initialCards.forEach(function addCard(element){
  cardList.append(createCard(element));
});