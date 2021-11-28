/*
Урок №20
https://www.youtube.com/watch?v=rHHt64zhL-k
*/
// Проверка мобильного браузера
// import { isMobile } from "./functions";

/*
Переменная - это контейнер куда мы можем временно положить либо не временно какие то данные.
// Пусть переменная "num" будет!
let num;
console.log(typeof num);
console.log(num);

// Пусть переменная "num" содержит число 10
num = 10;
console.log(typeof num);
console.log(num);

// Пусть переменная "num" содержит строку Привет!
num = "Привет!";
console.log(typeof num);
console.log(num);
*/

// Пусть константа "mainPage" ВСЕГДА содержит объект с классом .page
// const mainPage = document.querySelector('.page');

/*
const user = {
	name: "Максим",
	age: "26"
}
можем поменять значение в константе в объекте
user.name = "Лоцы";
console.log(user.name);
*/

// Операторы
// - + * / 
// оператор сложения "+" НЕ преобразовывает тип данных
/*
let num = 100;
let sayHi = "Привет";
let blockHeight = num + sayHi;
console.log(typeof blockHeight);
console.log(blockHeight);
*/

/* let partOne = "Привет,";
let partTwo = "Вася";
let sayHi = partOne + partTwo;
console.log(sayHi); */


// Операторы сравнения > < >= <= == === != !==
/*
let numOne = 10;
let numTwo = "10";
let result = numOne !== numTwo;
console.log(typeof result);
console.log(result);
Оператор не строгого сравнения == это значит что он автоматически преобразовывает тип данных (строку в число). Он сперва преобразал строку "10" в число 10, а потом сравнил число 10 и число 10 и мы получаем true.
Оператор строгого сравнения ===  здесь абсолютно все тоже самое, но тут строка 10 не преобразовывается в число, а остается строкой и по этому строка 10 уже не равна числу и мы получаем false.
!= не равно, тоже преобразовывает строку в число. Тип данных меняется только в момент операции(сравнения), а не меняется сам тип данных переменной.
!== строгое не равенство не преобразовывает строку в число.
*/

// Условное ветвление
/*
let numOne = 10;
let numTwo = 30;

if (numOne > numTwo) {
	// Выполняем програму,
	// если условие выполненно (true)
	console.log('numOne больше чем numTwo');
} else if (numTwo === 20) {
	console.log('numTwo равно 20');
} else {
	console.log('Условия НЕ выполненны!');
}
*/

/*
let numOne;
// Возвращают false: undefined, 0, "", NaN
NaN - возникает когда операция не выполнима, означает что опарция не может быть завершена.
if (numOne) {
	console.log('numOne возвращает true');
} else {
	console.log('numOne возвращает FALSE');
}*/
/*
const mainPage = document.querySelector('.page');
if (mainPage) {
	console.log(mainPage);
}
*/

// Логические операторы || && !
/*
let numOne = 50;
let numTwo = 30;
if (numOne < numTwo && numOne === 50 || numTwo !== 40 && numOne > 35) {
	console.log('Выполняем код...');
}
Оператор && будет более приоритетным чем оператор ||.
Оператор не ! меняет булевое значение true на false, false на true.
*/
/*
const blockElement = document.querySelector('.block');
if (!blockElement.classList.contains('active')) {
	blockElement.classList.add('active');
}
*/

//let someVar = "Я строка!";
//let someVar = 'Я строка!';
// Обратные кавычки
//let someVar = `Я строка!`;
/*
let someNum = 21;
let someString = `Мне
			${someNum} лет`;
console.log(someString);
*/

/*
// Область видимости
let someNum = 10;
let someString;
if (10 > 5) {
	someString = "Привет!";
}
console.log(someString); таким образом мы увидим то что задали в блоке if.
*/

// Функции

// Создание функции
/*
function setConsole(someData) {
	// Выполняемый код
	console.log(someData);
}
// Вызов функции
setConsole("Привет!");
*/

/*
function getSumm(numOne = 5, numTwo = 10) {
	return numOne + numTwo;
}

let someNumber = 580;

if (someNumber === 100) {
	console.log(getSumm(80, 50));
} else {
	console.log(getSumm(10, 10));
}
*/
// ... продолжаем...

















































