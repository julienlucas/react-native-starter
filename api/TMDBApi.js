const API_TOKEN = 'daef24dca8a2ace576b6cf5e565b81dc'

export function getFilmsFormApiWithSearchedText(text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page=' + page
    return fetch(url)
    .then((res) => res.json())
    .catch((error) => console.log(error))
}

export function getImageFromApi(name) {
    return 'https://image.tmdb.org/t/p/w300' + name
}

export function getFilmDetailFromApi (id) {
    return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr')
        .then((response) => response.json())
        .catch((error) => console.error(error))
}
