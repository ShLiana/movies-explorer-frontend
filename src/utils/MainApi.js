// Содержит описание запросов к нашему Api

import { checkResponse, BASE_URL } from './Constants';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

// Получаем информацию о пользователе с сервера
export const getUserInfo = () => {
  const token = localStorage.getItem('jwt');
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
};

// Обновляем информацию о пользователе
export const updateUserInfo = (data, jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      ...headers,
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  }).then((res) => checkResponse(res));
};




