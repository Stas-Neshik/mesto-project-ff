import {deleteCardId, toggleLike} from './api';

// Функция создания карточки
  const createCard = (card, userId, cardId, myId,deleteCallback, popupImage) => {

  const cardTemplate = document.getElementById('card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const deleteBtn = cardElement.querySelector('.card__delete-button');
  const likeBtn = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__count');

  const renderLikes = (card) => {
    likeCount.textContent = card.likes.length
      if (card.likes.some(user => user._id === myId)) {
        likeBtn.classList.add('card__like-button_is-active')
      }
      else likeBtn.classList.remove('card__like-button_is-active')
  };
  renderLikes(card);


  likeBtn.addEventListener('click', () => {

    toggleLike(cardId, likeBtn.classList.contains('card__like-button_is-active')).then((data) => {
      renderLikes(data);
    })
    .catch(err => {console.log(err)})
    .finally(() => console.log('Выполнено успешно'))
}
  );

  if (userId === myId) {
    deleteBtn.classList.add('card__delete-button-visible');
    deleteBtn.disabled = false;
    deleteBtn.addEventListener('click', (evt) => {
      deleteCardId(cardId)
      .then(() => deleteCallback(evt))
      .catch(err => {console.log(err)})
      .finally(() => console.log('Выполнено успешно'))
    });
  };

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').addEventListener('click', popupImage)

  return cardElement;
};

// Ф. Удаление карточки (корзина)
function deleteCard (evt) {
  const listItem = evt.target.closest('.card');
  listItem.remove();
};


export {createCard, deleteCard};


