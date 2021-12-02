/* УРОК №22
https://youtu.be/nD8ibHumf80
 */
/*
// =========================================================================================
// =========================================================================================
// =========================================================================================
// Навигация
const block = document.querySelector('.block');

// const blockPrev = document.querySelector('.some-block-prev');
// const blockNext = document.querySelector('.some-block-next');


// Предыдущий того же уровня
const blockPrev = block.previousElementSibling;
// console.log(blockPrev);
// Следующий того же уровня
const blockNext = block.nextElementSibling;
//console.log(blockNext);

// Родитель
const blockParent = block.parentElement;
//console.log(blockParent);

// closest - ближайший родитель либо сам элемент

// Дочерние элементы первого уровня
const blocksChildren = block.children;
//console.log(blocksChildren);

// Все потомки (или поиск в блоке)
// const blocksChildren = block.querySelectorAll('*');

// Первый дочерний элемент
const blocksFirstChild = block.firstElementChild;
//console.log(blocksFirstChild);
// Последний дочерний элемент
const blocksLastChild = block.lastElementChild;
//console.log(blocksLastChild);
=========================================================================================
// Задача - сделать мини спойлеры(на 29:50)
// Решение:
//1) Событие документу (использовать делегирование для нашей работы)
//2) Создаем функцию
//3) Работа с атрибутом или с классами

Нам нужно получить событие на документе*/

// document.addEventListener("click", liteSpoller);  /* - нам нужно по событию клик отправиться в liteSpoller */
// function liteSpoller(e) {
// 	const targetElement = e.target;  /* - С помощью target мы получаем нажаьтый объект. Теперь в константу targetElement будет попадать любой объект на который мы кликнем.  target - это нажатый объект, это параметр который отвечает за объект на который мы нажали, с которым мы взаимодействуем.*/
// 	if (targetElement.closest('.block__title')) { /* находим наш тайтл */
/* Работа со свойством (атрибутом) (первый вариант). Атрибут hidden - это в html, а в js это называется свойство. */
// 		if (targetElement.nextElementSibling.hidden) {  /*что бы сделать тоже самое без использования css (без использования классов) тогда нам нужно было сначала сделать проверку. */
// 			targetElement.nextElementSibling.hidden = false;  /*работа с атрибутом в js очень удабная, потому что это булевое значение, то есть hidden он или есть или его нет - то есть true или false */
/* nextElementSibling - мы просто получаем следующий после нее элемент в дереве ДОМ именно этой кнопки. Теперь при клике у нас откроется именно тот объект который нужен, при клике на другой заголовок другой объект. */
// 		} else {
// 			targetElement.nextElementSibling.hidden = true;
// 		}
//targetElement.nextElementSibling.hidden = !targetElement.nextElementSibling.hidden; /* - это уже усложненная конструкция того что выше */

// Работа с классами (второй вариант)
//targetElement.nextElementSibling.classList.toggle('_active');
// }
// }
// =========================================================================================

// =========================================================================================
// =========================================================================================
// =========================================================================================


// Размеры
// const sector = document.querySelector('.sector');

// Ширина
// const sectorWidth = sector.offsetWidth; /* и получаем 500px */
// console.log(`Ширина объекта: ${sectorWidth}px`);
// Высота
// const sectorHeight = sector.offsetHeight;
// console.log(`Высота объекта: ${sectorHeight}px`);
/* Часто при написании какого то решения на js в разрезе верстки нам нужно получить высоту либо ширину - размеры объекта, его положение и это важно */

// =========================================================================================
/*
https://www.youtube.com/watch?v=nD8ibHumf80
*/
// Задача:
// В момент достижения блока шапка отлипает.


// Решение:
/*
1) Слушать скролл страницы
2) Измерять положение целевого блока
3) В нужный момент работать с классами шапки
*/

/*  Получение объектов */

// const header = document.querySelector('.sector'); /* это шапка */
// const block = document.querySelector('.some-block');/*  это какой то блок-контент под шапкой */
/* Получение высоты шапки */
// const headerHeight = header.offsetHeight; /* запросим высоту шапки */

// const moment = headerHeight + 10; /* что бы был немнного отступ( прибавляем 10px) */

/*  Полежение объекта относительно вьюпота */
// getBoundingClientRect().top
// getBoundingClientRect().left

/* Полежение объекта относительно страницы */
// offsetTop
// offsetLeft

/*  Событие прокрутки окна */
// window.addEventListener("scroll", setHeaderStyle);/* Событие scroll вешается только на глобальный объект window(окно), то есть скролится не документ, а скролится окно, по этому вешать событие scroll мы можем только на window */

// function setHeaderStyle(e) {
/* Кол-во прокрученных пикселей */
// window.scrollY /* - эта переменная будет возращать количество прокрученых пикселей в данный момент. Прям сейчас нам эти переменные не нужны, мы можем без них обойтись, но они очень важные, очень хорошо помогают когда мы работаем с window скрол. */
// window.scrollX
//console.log(`Объект ниже верхней части экрана на ${block.getBoundingClientRect().top}`); /*  - это метод (getBoundingClientRect()) который относится к размерам,  */
/* это метод (getBoundingClientRect()) который возращает положение объекта либо сверху либо слева (в данном случае нам нужно сверху), но не относительно viewport, а относительно всего документа (прокрученой части).
Мы получаем его положение относительно верха сайта. Соответственно чем ближе объект к верху экрана, тем меньше у нас пикселей будет появляться то есть тем меньше пикселей вернет getBoundingClientRect.
Когда в консоли показывает 0 то объект точно поверху viewport. А за пределы viewport будет показывать отрицательные числа.*/
//console.log(`Момент ${moment}`);

// if (block.getBoundingClientRect().top <= moment) {
// console.log('Сработало!'); /* момент когда наш объект находится на меньше количество пикселей растояние до верха экрана от нашего момента появляется "Сработало!" 
// И в этот момент у нас третяя задача 3) В нужный момент работать с классами шапки*/

/* нам нужно положение объекта(контента.some - block), просто уже не getBoundingClientRect().top от вьюпорта, то есть нам нужно уже положение уже не от вьюпорта,
	а положения его от верха страницы включая проскроленный объект. */
// header.style.top = `${block.offsetTop - moment}px`; /* - offsetTop - это положение объекта(сверху сайта) относительно страницы, не верха вьюпорта, а верха страницы. Соответственно потом нам это значение нужно будет убрать.*/
// header.classList.add('_active');
// } else {
// header.style.top = ``;
// header.classList.remove('_active'); /* если мы будем отъезжать опять, что бы шапка у нас опять прилипала */
// }
// }
// ----------------------------
/* Задача что бы при клике на эту кнопку  блок подъехал в нужный нам момент */
// const sectorButton = document.querySelector('.sector__button');

// sectorButton.addEventListener("click", function (e) { /* будем слушать на ней клик */

// const goTo = block.offsetTop - moment;
/* для этого нам нужно свойство scrollTo, которое позволяет нам указать сколько пикселей сверху прокрутить.*/
// window.scrollTo({
// top: goTo,
// behavior: "smooth"
/*Поддержка браузерами у smooth довольно не плохая уже, есть только одна проблема - мы никак не можем регулировать скорость прокрутки.
В js файле gotoblock.js()  есть маленькое дополнение которое позволяет указывать настройки, в том числе скорость, в том числе и тип анимации. Она умеет учитывать header.  */
// });
// });

// =========================================================================================
//========================================================================================================================================================
/*
Задача
1:44:00
При достижении конца экрана, объект разместить справа

Решение

1) Получаем объекты
2) Слушаем прокрутку
3) Получаем высоту экрана
4) Высчитываем процент прокрученной области
5) Используя проценты из п.4 влияем на квадрат
*/

/* 1) Получаем объекты */
// const screen = document.querySelector('.screen');
// const screenItem = screen.querySelector('.screen__item');

/* Создадим объект размера. */
// const screenItemSizes = {
// width: screenItem.offsetWidth,
// height: screenItem.offsetHeight,
// }

/*  Событие прокрутки окна */
// window.addEventListener("scroll", moveItemOnScroll);

// function moveItemOnScroll() {
/* Получаем высоту экрана */
/* Высота вьюпорта минус ширина объекта */
// const windowHeight = window.innerHeight - screenItemSizes.width; /* обращаемся к экрану window и ищем innerHeight - это как раз у нас viewport */
/* Ширина вьюпорта */
// const windowWidth = window.innerWidth; /* здесь вычесляем процент от ширины вьюпорта */

/* Кол-во прокрученных пикселей */
// const scrollTop = window.scrollY;
/* Получаем процент прокрученной облаcти */
// const scrollProcent = scrollTop / windowHeight * 100; /*(процент прокрученной области) в момент 100 % экрана объект уедет за край, то есть его left будет 100%.*/
// console.log(scrollProcent);
/* Вычисляем left */
// const currentPointLeft = (windowWidth - screenItemSizes.width) / 100 * scrollProcent;
/* Вычисляем rotate */
// const currentPointRotate = 360 / 100 * scrollProcent;
/* Вычисляем scale */
// const currentPointScale = 1 - (0.5 / 100 * scrollProcent);

// Влияем на стили
// screenItem.style.cssText = `
// 		left: ${currentPointLeft}px;
// 		transform: scale(${currentPointScale}) rotate(${currentPointRotate}deg);
// 	`;
// }
// =========================================================================================
//========================================================================================================================================================
// 2:40:00
// Работа с атрибутами

/* const button = document.querySelector('.button');
// Получение значения дата атрибута
const buttonAttr = button.dataset.sanches; 56247


// Есть ли значение у дата атрибута
if (button.dataset.sanches) {
	console.log('Есть');
}

// Проверяем наличие атрибута
if (button.hasAttribute('data-sanches')) {
	console.log('Есть атрибут');

	// Указываем значение
	//button.setAttribute('data-sanches', '456');

	// Получить значение
	let buttonAttr = button.getAttribute('data-sanches');
	console.log(buttonAttr);
}

button.addEventListener("click", function (e) {
	const buttonAttr = button.dataset.sanches;
	if (buttonAttr > 10) {
		console.log('Больше 10');
	} else {
		console.log('Меньше 10');
	}
});

 */

//========================================================================================================================================================

// Задача - сделать "Показать еще"
// написать фишку, которая будет отображать скрытые изначально элементы

//========================================================================================================================================================



