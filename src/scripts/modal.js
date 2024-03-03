// Ф. Открыть Попап
function openModal(popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
  window.addEventListener('keydown', closeEsc);
  window.addEventListener('click', closeArea);
}

// Ф. Закрыть Попап
function closeModal (popup) {
  popup.classList.remove('popup_is-opened');
  window.removeEventListener('keydown', closeEsc);
  window.removeEventListener('click', closeArea);
}

function closeArea (evt) {
  if (evt.target.classList.contains('popup')){
    closeModal(evt.target)
  }
}

function closeEsc (evt) {
  if (evt.key === 'Escape')
  {
    const activePopup = document.querySelector('.popup_is-opened');
    closeModal(activePopup);
  }
 }

 export {openModal, closeModal};
