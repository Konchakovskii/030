/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

document.addEventListener('DOMContentLoaded', () => {


const adv = document.querySelectorAll('.promo__adv img'),
    poster = document.querySelector('.promo__bg'),
    genre = poster.querySelector('.promo__genre'),
    movieList = document.querySelector('.promo__interactive-list'),
    addForm = document.querySelector('form.add'),
    addInput = addForm.querySelector('.adding__input'),
    checkbox = addForm.querySelector('[type="checkbox"]');

addForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let newFilm = addInput.value;
    const favorite = checkbox.checked;

    if (newFilm) {

        if (newFilm.length > 21) {
            newFilm = `${newFilm.substring(0, 22)}...`;
        }

        if (favorite) {
            console.log('New movie added');
        }
        movieDB.movies.push(newFilm);
        sortArr(movieDB.movies);

        createMovieList(movieDB.movies, movieList);
    }

    

    event.target.reset();
});

//УДАЛЕНИЕ РЕКЛАМЫ

const deleteAdv = (arr) => {
    arr.forEach (item => {
     item.remove();
    });
};



const makeChanges = () => {
    genre.textContent = 'Драма';
    poster.style.backgroundImage = "url('img/bg.jpg')";
};



const sortArr = (arr) => {
    arr.sort();
};




// for (let i = 0; i < filmList.length; i++) {
//     filmList[i].innerHTML = `<li>${movieDB.movies[i]}</li>`;
// }



// const form = document.querySelector('.add');

// const formBtn = form.querySelector('button');

// formBtn.addEventListener('click', (event) => {
//     event.preventDefault();
//     let movieName = form.querySelector('.adding__input');
//     if (movieName.value.length > 21) {
//         movieName.value = movieName.value.slice(0, 21) + '...';
//     }
//     movieDB.movies.push(movieName.value);
//     console.log(movieDB.movies);

//     movieList.innerHTML += `
//          <li class="promo__interactive-item">${movieDB.movies.length} ${movieName.value}
//             <div class="delete"></div>
//         </li>
//     `;
// });



function createMovieList(films, parent) {
    parent.innerHTML = "";
    sortArr(films);

    films.forEach((film, i) => {
        parent.innerHTML += `
             <li class="promo__interactive-item">${i + 1} ${film}
                <div class="delete"></div>
            </li>
        `;
    });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(films, parent);
            });
    });


}


deleteAdv(adv);
makeChanges();
createMovieList(movieDB.movies, movieList);

});

