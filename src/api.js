 const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7',
  headers: {
    authorization: '7b5f82f8-b7e6-429e-81d8-a0bd057389a7',
    'Content-Type': 'application/json'
  }
}

const getResponsData = res => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`)
  }
  return res.json();
}

export const aboutMe = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(result => getResponsData(result))
};


export const getCard = () =>  {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(result => getResponsData(result))
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
  .then(res => getResponsData(res))
.then (data => console.log(data.avatar, data.name))
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
}