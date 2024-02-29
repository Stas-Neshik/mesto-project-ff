import { profileImg } from "./constants";

export const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7',
  headers: {
    authorization: '7b5f82f8-b7e6-429e-81d8-a0bd057389a7',
    'Content-Type': 'application/json'
  }
}

export function getResponsData (res) {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`)
  }
  return res.json();
}

export function aboutMe () {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(result => getResponsData(result))
};

export function getCard () {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(result => getResponsData(result))
};

export function renameProfile (nameUser, job) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameUser,
      about: job
    })
  })
};

export function addCard (place, linkUrl) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: place,
      link: linkUrl
    })
  })
  .then(data => data.json())
}







export function cards () {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(result => getResponsData(result))
  .then(data => console.log(data))
}











const nameTitle = document.querySelector('.profile__title');
const jobTitle = document.querySelector('.profile__description');







