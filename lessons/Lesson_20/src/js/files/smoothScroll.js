//==== Основной модуль работы с прокруткой ====================================================================================================================================================================================================================================================================================

/* Подключение дополнения */
import "../libs/smoothScroll";

export let gotoBlock = (targetBlock, speed = 500, offset = 0, noHeader = false) => {
	let headerItem = '';
	//OffsetHeader
	if (noHeader) {
		headerItem = 'header.header';
	}
	let options = {
		speedAsDuration: true,
		speed: speed,
		header: headerItem,
		offset: offset,
		easing: 'easeOutQuad',
	};
	let scr = new SmoothScroll();
	scr.animateScroll(targetBlock, '', options);
};