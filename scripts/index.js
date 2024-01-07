// @todo: Темплейт карточки

// @todo: DOM узлы

const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content; // Выбрал template, получил содержимое (.content) 
const card = document.querySelector('.card');



// const deleteBtn = cardTemplate.querySelector('.card__delete-button');
// const likeBtn = cardTemplate.querySelector('.card__like-button');

// @todo: Функция создания карточки

initialCards.forEach( function addCard(element) {  // для каждого элемента массива срабатывает колбэк addCard
  const cardElement = cardTemplate.cloneNode(true); // копирование template карточки

  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = 'Красивое место';
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__like-button').addEventListener('click', function(evt){
    console.log(evt);
    // evt.target.classList.toggle('card__like-button_is-active');
  });

  cardList.append(cardElement);

})



// @todo: Функция удаления карточки

function deleteCard (item) {
  item.remove();
  
}




// @todo: Вывести карточки на страницу

