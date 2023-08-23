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
  addNewMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: 'https://api.nomoreparties.co' + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: 'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
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