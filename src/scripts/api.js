 const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7',
  headers: {
    authorization: '7b5f82f8-b7e6-429e-81d8-a0bd057389a7',
    'Content-Type': 'application/json'
  }
}

const checkData = res => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
  return res.json();
}

export const aboutMe = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(result => checkData(result))
  .catch(err => {console.log(err)}); 
};


export const getCard = () =>  {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(result => checkData(result))
  .catch(err => {console.log(err)}); 
};

export const renameProfile = (nameUser, job) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameUser,
      about: job
    })
  })
  .catch(err => {console.log(err)}); 
};

export const changeAvatar = url => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: `${config.headers.authorization}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: url
    })
  })
  .then(result => checkData(result))
  .catch(err => {console.log(err)}); 
}


export const addCard = (place, linkUrl) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: place,
      link: linkUrl
    })
  })
  .then(data => data.json())
  .catch(err => {console.log(err)}); 
}

export const deleteCardId = (userId) => {
  return fetch(`${config.baseUrl}/cards/${userId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(result => checkData(result))
};


export const toggleLike = (element, isLiked) => {
  return fetch(`${config.baseUrl}/cards/likes/${element}`, {
    method: isLiked ? 'DELETE': 'PUT',
    headers: config.headers
  })
  .then(result => checkData(result))
};