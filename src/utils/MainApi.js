// класс для взаимодействия с сервером
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // проверка статуса запроса
  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // регистрация
  registerUser({ name, email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, email, password })
    })
      .then(res => this._checkResponse(res))
  }

/*   registerUser({ name, email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then(res => this._checkResponse(res));
  } */

  // вход
  loginUser({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(res => this._checkResponse(res));
  }

  // запрос данных пользователя
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers,
    }).then(res => this._checkResponse(res));
  }

  // запрос на редактирование данных пользователя
  updateUser({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, email }),
    }).then(res => this._checkResponse(res));
  }

  checkToken() {

    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
      .then(res => this._checkResponse(res));
  }

  logout() {
    return fetch(`${this._baseUrl}/logout`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  }

  // запрос фильмов
  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      credentials: 'include',
      headers: this._headers,
    }).then(res => this._checkResponse(res));
  }

  // сохранение фильма
  addNewMovie({ data }) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    }).then(res => this._checkResponse(res));
  }

  // удаление фильма из сохранённых
  deleteMovie({ data }) {
    return fetch(`${this._baseUrl}/movies/${data}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(res => this._checkResponse(res));
  }
}

const mainApi = new Api({
  // создаём экземляр класса работающего с API сервера
  baseUrl: 'https://api.diplomback.nomoredomains.xyz',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;