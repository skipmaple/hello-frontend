const API_URL = "https://api.themoviedb.org/3/discover/movie?api_key=ddcdc92c1c4fa840b006f6f6fe413fca&sort_by=popularity.desc&page=1&region=CN&language=zh"

const IMG_URL = "https://image.tmdb.org/t/p/w1280"
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=ddcdc92c1c4fa840b006f6f6fe413fca&page=1&region=CN&language=zh&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(API_URL)

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }

})

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview} = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `   
            <img src="${IMG_URL + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getVoteAverageColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `

        main.appendChild(movieEl)
    })
}

function getVoteAverageColor(vote_average) {
    if (vote_average >= 8.0) {
        return 'green'
    } else if (vote_average >= 5.0) {
        return 'orange'
    } else {
        return 'red'
    }
}
