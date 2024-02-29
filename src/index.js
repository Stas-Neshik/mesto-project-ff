import './pages/index.css';
import {initialCards} from './cards';
import {openModal, closeModal} from './modal';
import {createCard, deleteCard, like} from './card';
import {cardList, formElement, nameInput, jobInput, formAddCard, cardNameInput, urlInput, addCardBtn, closeBtns, renameProfileBtn, popupProfile, popupAddCard, popupImg, validationConfig, profileImg, popupAvatar, nameTitle, jobTitle} from './constants';
import {enableValidation, clearValidation} from './validation';
import {aboutMe, getCard, renameProfile, addCard, cards} from './api';
 let userId;


// Ф. Вывести карточки на страницу
// initialCards.forEach(element => {
//   cardList.append(createCard(element, deleteCard, like, openPopupImage));
// });

// Листенеры 
renameProfileBtn.addEventListener('click', () => {
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  openModal(popupProfile)
});

addCardBtn.addEventListener('click', () => {
  clearValidation(formAddCard, validationConfig);
  openModal(popupAddCard);
});

profileImg.addEventListener('click', (evt) => {
  abc(evt);
  openModal(popupAvatar)
})

function abc (evt) {
  console.log(evt.target);
}

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

  renameProfile(nameValue, jobValue);

  nameTitle.textContent = nameValue;
  jobTitle.textContent = jobValue;

  closeModal(popupProfile);
}

function addCardSubmit (evt) {
  evt.preventDefault(); 

  const placeValue = cardNameInput.value;
  const urlValue = urlInput.value;

  addCard(placeValue, urlValue)

  const activePopup = document.querySelector('.popup_is-opened');
  formAddCard.reset();
  closeModal(activePopup);
}


enableValidation(validationConfig);




// аватар 





Promise.all([aboutMe(), getCard()])
.then(([userInfo, cards]) => cards.forEach(card => {
  nameTitle.textContent = userInfo.name;
  jobTitle.textContent = userInfo.about;
  profileImg.style.backgroundImage = `url('${userInfo.avatar}')`;
  userId = userInfo._id;


  cardList.append(createCard(card, deleteCard, like, openPopupImage))
})
);



export {openModal};



