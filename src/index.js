import './pages/index.css';
import {initialCards} from './cards';
import {openModal, closeModal} from './modal';
import {createCard, deleteCard, like} from './card';
import {cardList, formElement, nameInput, jobInput, formAddCard, cardNameInput, urlInput, addCardBtn, closeBtns, renameProfileBtn, popupProfile, popupAddCard, popupImg, validationConfig, profileImg, popupAvatar, nameTitle, jobTitle, formAvatar, avatarInput} from './constants';
import {enableValidation, clearValidation} from './validation';
import {aboutMe, getCard, renameProfile, addCard, changeAvatar} from './api';
 let userId;



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

profileImg.addEventListener('click', () => {
  clearValidation(formAvatar, validationConfig);
  openModal(popupAvatar)
})

 formAddCard.addEventListener('submit', addCardSubmit);

formElement.addEventListener('submit', handleFormSubmitProfile);

formAvatar.addEventListener('submit', handleFormSubmitAvatar);

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

 let url = 'https://avatars.mds.yandex.net/i?id=766637e7fecd215c2916b5d4741bd5f4_l-5282144-images-thumbs&n=27&h=480&w=480';
 changeAvatar(url); // работает, аватарка меняется в зависимости от положенной ссылки в url

function handleFormSubmitAvatar(evt) {
  evt.preventDefault(); 
  const avatarValue = avatarInput.value;
  console.log(avatarValue); // выводится ссылка из инпута
  changeAvatar(avatarValue); // но аватарка не меняется

  closeModal(popupAvatar);
};


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

