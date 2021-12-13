// Импорт функционала ====================================================================================================================================================================================================================================================================================================
// Вспомогательные функции.
import { isMobile } from "../functions.js";
// Импорт класса наблюдателя.
import { ScrollWatcher } from "../../libs/watcher.js";
// Модуль прокрутки к блоку (раскомментировать при использовании)
import { gotoBlock } from "./gotoblock.js";
//====================================================================================================================================================================================================================================================================================================

// Запуск наблюдателя
// Создание дополнительной обработки элемента
// Требует импорта ScrollWatcher
export function scrollWatcher(logging = false) {
	new ScrollWatcher({
		logging: true
	});
}
// Плавная навигация по странице
export function pageNavigation() {
	// data-goto - указать ID блока
	// data-goto-header - учитывать header
	// data-goto-speed - скорость (только если используется доп плагин)
	// Работаем при клике на пункт
	document.addEventListener("click", pageNavigationAction);
	// Если подключен scrollWatcher, подсвечиваем текущий пукт меню
	document.addEventListener("watcherCallback", pageNavigationAction);
	// Основная функция
	function pageNavigationAction(e) {
		if (e.type === "click") {
			const targetElement = e.target;
			if (targetElement.closest('[data-goto]')) {
				const gotoLink = targetElement.closest('[data-goto]');
				const noHeader = gotoLink.hasAttribute('data-goto-header') ? true : false;
				const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : '500';
				gotoBlock(`#${gotoLink.dataset.goto}`, noHeader, gotoSpeed);
				e.preventDefault();
			}
		} else if (e.type === "watcherCallback") {
			if (e.detail) {
				const entry = e.detail.entry;
				const targetElement = entry.target;
				// Обработка пунктов навигации, если указано значение navigator подсвечиваем текущий пукт меню
				if (targetElement.dataset.watch === 'navigator') {
					const navigatorItem = targetElement.id;
					const navigatorActiveItem = document.querySelector(`[data-goto]._navigator-active`);
					const navigatorCurrentItem = document.querySelector(`[data-goto="${navigatorItem}"]`);
					if (entry.isIntersecting) {
						// Видим объект
						// navigatorActiveItem ? navigatorActiveItem.classList.remove('_navigator-active') : null;
						navigatorCurrentItem ? navigatorCurrentItem.classList.add('_navigator-active') : null;
					} else {
						// Не видим объект
						navigatorCurrentItem ? navigatorCurrentItem.classList.remove('_navigator-active') : null;
					}
				}
			}
		}
	}
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