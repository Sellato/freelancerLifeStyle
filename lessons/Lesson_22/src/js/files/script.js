// Задача - сделать "Показать еще"
// написать фишку, которая будет отображать скрытые изначально элементы
const card = document.querySelector('.block__card');

document.addEventListener("click", more)
function more(e) {
	const targetElement = e.target
	if (targetElement.closest('.block__btn')) {
		targetElement.previousElementSibling.classList.toggle('_active')
	}
	if (targetElement.closest('.block__btn-2')) {
		if (targetElement.previousElementSibling.hidden) {

			targetElement.previousElementSibling.hidden = false
		} else {
			targetElement.previousElementSibling.hidden = true
		}
	}
}

