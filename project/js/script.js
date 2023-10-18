/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const adv = document.querySelectorAll('.promo__adv img'),
    poster = document.querySelector('.promo__bg'),
    genre = poster.querySelector('.promo__genre'),
    movieList = document.querySelector('.promo__interactive-list');

// adv.forEach (item => {
//     item.remove();
// })

adv.forEach (function (item) {
    item.remove();
})

genre.textContent = 'Драма';

poster.style.backgroundImage = "url('img/bg.jpg')";

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};



movieList.innerHTML = "";

movieDB.movies.sort();

// for (let i = 0; i < filmList.length; i++) {
//     filmList[i].innerHTML = `<li>${movieDB.movies[i]}</li>`;
// }



const form = document.querySelector('.add');

const formBtn = form.querySelector('button');

formBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let movieName = form.querySelector('.adding__input');
    if (movieName.value.length > 21) {
        movieName.value = movieName.value.slice(0, 21) + '...';
    }
    movieDB.movies.push(movieName.value);
    console.log(movieDB.movies);

    movieList.innerHTML += `
         <li class="promo__interactive-item">${movieDB.movies.length} ${movieName.value}
            <div class="delete"></div>
        </li>
    `;
});

movieDB.movies.forEach((film, i) => {
    movieList.innerHTML += `
         <li class="promo__interactive-item">${i + 1} ${film}
            <div class="delete"></div>
        </li>
    `;
});


const items = document.querySelectorAll('.promo__interactive-list');

items.forEach(item => {
    item.addEventListener('click', (event) => {
        event.target.remove();
    });

});


});

