/* УРОК №23
https://youtu.be/zpDx4gdE2V4  
 */

// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
// import { isMobile } from "./functions.js";


// Требование
// Максимальное управление из HTML
// Привязка к размеру шрифта

// Мозговой штурм
/*
data-showmore="" - главный блок. Может принимать значения items или text
data-showmore-content - блок с контентом. Может принимать значения кол-ва либо высоты
data-showmore-button - кнопка показа
*/

// Основная функция
function showMore() {
	const showMoreBlocks = document.querySelectorAll('[data-showmore]');
	if (showMoreBlocks.length) {
		showMoreInit(showMoreBlocks);
		document.addEventListener("click", showMoreActions);
	}
	// Функция инициализации
	function showMoreInit() {
		showMoreBlocks.forEach(showMoreBlock => {
			showMoreInitItem(showMoreBlock);
		});
	}
	// Функция инициализации
	// конкретного блока
	function showMoreInitItem(showMoreBlock) {
		setHiddenHeight(showMoreBlock, getHiddenHeight(showMoreBlock));
	}

	function showMoreActions(e) {
		const targetElement = e.target;
		if (targetElement.closest('[data-showmore-button]')) {
			const showMoreButton = targetElement.closest('[data-showmore-button]');
			const showMoreBlock = showMoreButton.closest('[data-showmore]');
			const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
			const showMoreOriginalHeight = getOriginalHeight(showMoreBlock);
			const showMoreHiddenHeight = getHiddenHeight(showMoreBlock);
			if (showMoreBlock.classList.contains('_show-more')) {
				showMoreContent.style.height = `${showMoreHiddenHeight}px`;
			} else {
				showMoreContent.style.height = `${showMoreOriginalHeight}px`;
			}
			showMoreBlock.classList.toggle('_show-more');
		}
	}

	function setHiddenHeight(showMoreBlock, hiddenHeight) {
		const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
		showMoreContent.style.height = `${hiddenHeight}px`;
	}
	function getHiddenHeight(showMoreBlock) {
		const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
		const showMoreType = showMoreBlock.dataset.showmore;
		const showMoreSize = showMoreContent.dataset.showmoreContent;
		let hiddenHeight = 0;
		if (!showMoreType) {
			showMoreType = `text`;
		}
		if (!showMoreSize) {
			if (!showMoreType) {
				showMoreSize = `150`;
			} else {
				showMoreSize = `3`;
			}
		}
		if (showMoreType === 'text') {
			hiddenHeight = showMoreSize;
		} else {
			// 
		}
		return hiddenHeight;

	}
	function getOriginalHeight(showMoreBlock) {
		const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
		const showMoreContentChildren = Array.from(showMoreContent.children);
		showMoreContent.style.height = '';
		let showMoreOriginalHeight = 0;
		if (showMoreContentChildren.length) {
			showMoreContentChildren.forEach(showMoreContentChild => {
				showMoreOriginalHeight += showMoreContentChild.offsetHeight;
			});
		}
		return showMoreOriginalHeight;
	}
}

window.addEventListener("load", function (e) {
	// нам нужно дождаться полной загрузки страницы и тогда начать работать с объектом
	showMore();
});


/*
Вычисление кол-ва строк от высоты текст (плохо текст может быть раный)
const lineHeight = parseInt(window.getComputedStyle(showMoreContent).getPropertyValue("line-height"));
const linesQuantity = Math.floor(showMoreSize / lineHeight);
showMoreContent.style['-webkit-line-clamp'] = linesQuantity;
*/


