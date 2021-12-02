// Импорт зависимостей ====================================================================================================================================================================================================================================================================================================
// Вспомогательные функции
// import { isMobile, getHash } from "../functions.js";
// Модуль прокрутки к блоку
// import { gotoBlock } from "./gotoblock.js";
//====================================================================================================================================================================================================================================================================================================

// Добавить класс при достижении объекта скроллом
// data-scroll-item, data-scroll-item="once" добавить класс только один раз
export function scrollItemClass(params) {
	window.addEventListener("load", function (e) {
		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				const targetElement = entry.target;
				if (entry.isIntersecting) {
					targetElement.classList.add('_scroll-view');
					targetElement.dataset.scrollItem === 'once' ? observer.unobserve(entry.target) : null;
				} else {
					targetElement.classList.remove('_scroll-view');
				}
			})
		}, { threshold: 0.3 })
		document.querySelectorAll('[data-scroll-item]').forEach(item => observer.observe(item));
	});
}

// Обозреватель объекта (в работе)
export function observerConstructor() {
	function observerConstructorInit(items, config) {
		if (items.length) {
			const observer = new IntersectionObserver((entries, observer) => {
				entries.forEach(entry => {
					const targetElement = entry.target;

					if (targetElement.dataset.observe === 'dataset value') {
						observer.unobserve(entry.target);
					}
				})
			}, config);
			items.forEach(item => observer.observe(item));
		}
	}
	observerConstructorInit(document.querySelectorAll('[data-observe]'), { threshold: 0.1 });
}

// Прокрутка страницы, работа с шапкой (в работе)
export function windowScroll(params) {
	let scrollDirection = 0;
	let timer;
	window.addEventListener("scroll", function (e) {
		const scrollTop = window.scrollY;
		const header = document.querySelector('.header');
		clearTimeout(timer);

		if (scrollTop >= window.innerHeight * 2) {
			!header.classList.contains('_header-scroll') ? header.classList.add('_header-scroll') : null;

			if (scrollTop > scrollDirection) {
				// downscroll code
				header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
			} else {
				// upscroll code
				!header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
			}
			timer = setTimeout(() => {
				!header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
			}, 500);

		} else {
			header.classList.contains('_header-scroll') ? header.classList.remove('_header-scroll') : null;
			header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
		}
		scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
	});
}

// Прилипающий блок (в работе)
export function stickyBlock(params) {

}