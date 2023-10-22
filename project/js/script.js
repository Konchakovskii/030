/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {           //создаем объект, в котором создаем массив с фильмами
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

document.addEventListener('DOMContentLoaded', () => {   


const adv = document.querySelectorAll('.promo__adv img'),       //создаем необходимые переменные
    poster = document.querySelector('.promo__bg'),                      //постер
    genre = poster.querySelector('.promo__genre'),                         //жанр фильма
    movieList = document.querySelector('.promo__interactive-list'),         //интерактивный список
    addForm = document.querySelector('form.add'),                           //форма
    addInput = addForm.querySelector('.adding__input'),                     //ввод названия фильма
    checkbox = addForm.querySelector('[type="checkbox"]');                  //флажок

addForm.addEventListener('submit', (event) => {     //событие на отправку формы
    event.preventDefault();     //отменяем обновление сттраницы

    let newFilm = addInput.value;   //присваиваем переменной значение ввода
    const favorite = checkbox.checked;  //присваиваем переменной статус флажка

    if (newFilm) {  //проверяем, не пустая ли строка

        if (newFilm.length > 21) {  //проверяем на длину
            newFilm = `${newFilm.substring(0, 22)}...`; //если больше, то прибавляем ... - интерполяция + подсртрока
        }

        if (favorite) {     //проверяем статус флажка
            console.log('New movie added'); //если утснановлен, то вывод в консоль
        }
        movieDB.movies.push(newFilm);   //добавляем в массив новый фильм - push()
        sortArr(movieDB.movies);    //сортируем массив

        createMovieList(movieDB.movies, movieList); //создаем новый интерактивный список
    }

    

    event.target.reset();   //сбрасываем данные в форме
});

//УДАЛЕНИЕ РЕКЛАМЫ

const deleteAdv = (arr) => {    //создаем функцию
    arr.forEach (item => {      //перебираем массив
     item.remove();                //удаляем каждый элемент
    });
};

//ВНОСИМ ИЗМЕНЕНИЯ В ПОСТЕР

const makeChanges = () => {
    genre.textContent = 'Драма';    //меняем жанр через textContent
    poster.style.backgroundImage = "url('img/bg.jpg')"; //меняем фон
};

//СОРТИРУЕМ СПИСОК

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



function createMovieList(films, parent) {       //создание интерактивного списка
    parent.innerHTML = "";      //сбрасываем старый список
    sortArr(films);

    films.forEach((film, i) => {    //для каждого добавляем структуру разметки
        parent.innerHTML += `       
             <li class="promo__interactive-item">${i + 1} ${film} 
                <div class="delete"></div>
            </li>
        `;
    });

        document.querySelectorAll('.delete').forEach((btn, i) => {      //выбираем все корзины
            btn.addEventListener('click', () => {       //при нажатии на кнопку удаляется родитель
                btn.parentElement.remove();             //из списка как родитель кнопки
                movieDB.movies.splice(i, 1);            //из массива как номер по порядку

                createMovieList(films, parent);         //заново создаем список
            });
    });


}


deleteAdv(adv);
makeChanges();
createMovieList(movieDB.movies, movieList);

});

