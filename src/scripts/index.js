import '../pages/index.css';
import {openModal, closeModal} from './modal';
import {createCard, deleteCard} from './card';
import {cardList, formElement, nameInput, jobInput, formAddCard, cardNameInput, urlInput, addCardBtn, closeBtns, renameProfileBtn, popupProfile, popupAddCard, popupImg, validationConfig, profileImg, popupAvatar, nameTitle, jobTitle, formAvatar, avatarInput, popupIsOpen, image, popupCaption} from './constants';
import {enableValidation, clearValidation} from './validation';
import {aboutMe, getCard, renameProfile, addCard, changeAvatar} from './api';

let myId;

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
  popupImg.querySelector(popupCaption).textContent = evt.target.alt;
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
  .then(() => closeModal(popupProfile))
  .catch(console.error)
  .finally(() => {
    evt.submitter.textContent = 'Сохранить';
    console.log('Выполнено успешно')})
} 

function handleFormSubmitAvatar(evt) {
  evt.preventDefault(); 
  const avatarValue = avatarInput.value;
  changeAvatar(avatarValue)
  .then(result => profileImg.style.backgroundImage = `url(${result})`)
  .then(evt.submitter.textContent = 'Cохранение...')
  .then(() => closeModal(popupAvatar))
  .catch(console.error)
  .finally(() => {
    profileImg.style.backgroundImage = `url(${avatarValue})`;
    evt.submitter.textContent = 'Сохранить';
    console.log('Выполнено успешно')})

   

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
  .then( evt.submitter.textContent = "Cохранение...")
  .then(() => closeModal(activePopup))
  .catch(console.error)
  .finally(() => {
    evt.submitter.textContent = 'Сохранить';
    console.log('Выполнено успешно')})
}


Promise.all([aboutMe(), getCard()])
.then(([userInfo, cards]) => {
myId = userInfo._id
cards.forEach(card => {

  nameTitle.textContent = userInfo.name;
  jobTitle.textContent = userInfo.about;
  profileImg.style.backgroundImage = `url('${userInfo.avatar}')`;
  const userId = card.owner._id;
  const cardId = card._id;


  cardList.append(createCard(card, userId, cardId, myId, deleteCard, openPopupImage))
  
})
})
.catch(console.error)
.finally(() => console.log('Выполнено успешно'));




enableValidation(validationConfig);
export {openModal};