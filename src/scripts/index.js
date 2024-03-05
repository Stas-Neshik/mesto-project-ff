import '../pages/index.css';
import {openModal, closeModal} from './modal';
import {createCard, deleteCard} from './card';
import {cardList, formElement, nameInput, jobInput, formAddCard, cardNameInput, urlInput, addCardBtn, closeBtns, renameProfileBtn, popupProfile, popupAddCard, popupImg, validationConfig, profileImg, popupAvatar, nameTitle, jobTitle, formAvatar, avatarInput, popupIsOpen, image} from './constants';
import {enableValidation, clearValidation} from './validation';
import {aboutMe, getCard, renameProfile, addCard, changeAvatar} from './api';
let userId;
let cardId;
const myId = '9d8b63c668c0e327bc0f805d';

// Листенеры 
renameProfileBtn.addEventListener('click', () => {

  nameInput.value = nameTitle.textContent;
  jobInput.value = jobTitle.textContent;
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
  image.src = evt.target.src;
  image.alt = evt.target.alt;
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

  evt.submitter.textContent = 'Cохранение...';

  renameProfile(nameValue, jobValue)
  .then(() => {  
    nameTitle.textContent = nameValue;
    jobTitle.textContent = jobValue;
  })
  .catch(err => {console.log(err)})
  .finally(() => closeModal(popupProfile))
} 

function handleFormSubmitAvatar(evt) {
  evt.preventDefault(); 
  const avatarValue = avatarInput.value;

  changeAvatar(avatarValue)
  .then(result => profileImg.style.backgroundImage = `url(${result})`)
  .catch(err => {console.log(err)})
  .finally(() => closeModal(popupAvatar))

  profileImg.style.backgroundImage = `url(${avatarValue})`;

};


function addCardSubmit (evt) {
  evt.preventDefault(); 
  const placeValue = cardNameInput.value;
  const urlValue = urlInput.value;
  const activePopup = document.querySelector(popupIsOpen);
  addCard(placeValue, urlValue)
  .then((res) => {
    const cardElements = createCard(
      res,
      myId,
      res._id,
      myId,
      deleteCard,
      openPopupImage
    );
    cardList.prepend(cardElements);
  })
  .then(() => formAddCard.reset())
  .catch(err => {console.log(err)})
  .finally(() => closeModal(activePopup))
  evt.submitter.textContent = "Cохранение...";
}


Promise.all([aboutMe(), getCard()])
.then(([userInfo, cards]) => cards.forEach(card => {

  nameTitle.textContent = userInfo.name;
  jobTitle.textContent = userInfo.about;
  profileImg.style.backgroundImage = `url('${userInfo.avatar}')`;

  userId = card.owner._id;
  console.log(userId);
  cardId = card._id;


  cardList.append(createCard(card, userId, cardId, myId, deleteCard, openPopupImage))
  
})
)
.catch(err => {console.log(err)})
.finally(() => console.log('Выполнено успешно'));




enableValidation(validationConfig);
export {openModal};