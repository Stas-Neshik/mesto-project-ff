import {openModal} from './modal';

const initialCards = [
    {
      name: "Парк штата Огненная Долина, США",
      link: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Иссландия",
      link: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Долина Йосемити ,США",
      link: "https://images.unsplash.com/photo-1502512571217-6a08d302fe5a?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Эльбрус",
      link: "https://images.unsplash.com/photo-1627414363144-8982a29a0922?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Алтай",
      link: "https://images.unsplash.com/photo-1626538481998-0629afebd684?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Камчатка",
      link: "https://images.unsplash.com/photo-1535557142533-b5e1cc6e2a5d?q=80&w=3029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
];

// Функция создания карточки
const createCard = (cardData, deleteCallback) => {

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

function like(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

// Ф. Попап картинки
const popupImg = document.querySelector('.popup_type_image');

function popupImage(evt) {
  console.log(evt.target)
  popupImg.querySelector('.popup__image').src = evt.target.src;
  popupImg.querySelector('.popup__image').alt = evt.target.alt;
  popupImg.querySelector('.popup__caption').textContent = evt.target.alt;
  openModal(popupImg);
}

 export {initialCards, createCard, deleteCard, like, popupImage};
//  module.exports = {initialCards}; 