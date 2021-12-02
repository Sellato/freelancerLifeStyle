// Импорт зависимостей ==============================================================================================================================================================================================================================================================================================================================
// Вспомогательные функции
import { isMobile, _slideUp, _slideDown, _slideToggle } from "../functions.js";
// Модуль попапа
// import { popupItem } from "../popups.js";
// Модуль прокрутки к блоку
// import { gotoBlock } from "../scroll/gotoblock.js";
//==============================================================================================================================================================================================================================================================================================================================

/*
Чтобы поле участвовало в валидации добавляем атрибут data-required
Особые проверки:
data-required="email" - вадидация E-mail

Чтобы поле валидировалось при потере фокуса, 
к атрибуту data-required добавляем атрибут data-validate
*/

// Работа с полями формы. Добавление классов, работа с placeholder
export function formFieldsInit() {
	const formFields = document.querySelectorAll('input[placeholder],textarea[placeholder]');
	if (formFields.length) {
		formFields.forEach(formField => {
			formField.dataset.placeholder = formField.placeholder;
		});
	}
	document.body.addEventListener("focusin", function (e) {
		const targetElement = e.target;
		if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
			if (targetElement.dataset.placeholder) {
				targetElement.placeholder = '';
			}
			targetElement.classList.add('_focus');
			targetElement.parentElement.classList.add('_focus');

			formValidate.removeError(targetElement);
		}
	});
	document.body.addEventListener("focusout", function (e) {
		const targetElement = e.target;
		if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
			if (targetElement.dataset.placeholder) {
				targetElement.placeholder = targetElement.dataset.placeholder;
			}
			targetElement.classList.remove('_focus');
			targetElement.parentElement.classList.remove('_focus');

			// Моментальная валидация
			if (targetElement.hasAttribute('data-validate')) {
				formValidate.validateInput(targetElement);
			}
		}
	});
}
// Валидация форм
export let formValidate = {
	getErrors(form) {
		let error = 0;
		let formRequiredItems = form.querySelectorAll('*[data-required]');
		if (formRequiredItems.length) {
			formRequiredItems.forEach(formRequiredItem => {
				if (formRequiredItem.offsetParent !== null) {
					error += this.validateInput(formRequiredItem);
				}
			});
		}
		return error;
	},
	validateInput(formRequiredItem) {
		let error = 0;
		if (formRequiredItem.dataset.required === "email") {
			formRequiredItem.value = formRequiredItem.value.replace(" ", "");
			if (this.emailTest(formRequiredItem)) {
				this.addError(formRequiredItem);
				error++;
			} else {
				this.removeError(formRequiredItem);
			}
		} else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
			this.addError(formRequiredItem);
			error++;
		} else {
			if (!formRequiredItem.value) {
				this.addError(formRequiredItem);
				error++;
			} else {
				this.removeError(formRequiredItem);
			}
		}
		return error;
	},
	addError(formRequiredItem) {
		formRequiredItem.classList.add('_error');
		formRequiredItem.parentElement.classList.add('_error');
		let inputError = formRequiredItem.parentElement.querySelector('.form__error');
		if (inputError) formRequiredItem.parentElement.removeChild(inputError);
		if (formRequiredItem.hasAttribute('data-error') && formRequiredItem.getAttribute('data-error')) {
			formRequiredItem.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + formRequiredItem.getAttribute('data-error') + '</div>');
		}
	},
	removeError(formRequiredItem) {
		formRequiredItem.classList.remove('_error');
		formRequiredItem.parentElement.classList.remove('_error');
		if (formRequiredItem.parentElement.querySelector('.form__error')) {
			formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('.form__error'));
		}
	},
	formClean(form) {
		let inputs = form.querySelectorAll('input,textarea');
		for (let index = 0; index < inputs.length; index++) {
			const el = inputs[index];
			el.parentElement.classList.remove('_focus');
			el.classList.remove('_focus');
			el.value = el.dataset.placeholder;
		}
		let checkboxes = form.querySelectorAll('.checkbox__input');
		if (checkboxes.length > 0) {
			for (let index = 0; index < checkboxes.length; index++) {
				const checkbox = checkboxes[index];
				checkbox.checked = false;
			}
		}
		let selects = form.querySelectorAll('select');
		if (selects.length > 0) {
			for (let index = 0; index < selects.length; index++) {
				const select = selects[index];
				const select_default_value = select.getAttribute('data-default');
				select.value = select_default_value;
				select_item(select);
			}
		}
	},
	emailTest(formRequiredItem) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
	}
}
/* Отправка форм */
export function formSubmit(validate) {
	const forms = document.forms;
	if (forms.length) {
		for (const form of forms) {
			form.addEventListener('submit', formSubmit);
		}
	}
	async function formSubmit(e) {
		const form = e.target;
		const error = validate ? formValidate.getErrors(form) : 0;
		if (error === 0) {
			const message = form.getAttribute('data-message');
			const ajax = form.hasAttribute('data-ajax');
			//SendForm
			if (ajax) {
				e.preventDefault();
				const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
				const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
				const formData = new FormData(form);

				form.classList.add('_sending');
				const response = await fetch(formAction, {
					method: formMethod,
					body: formData
				});
				if (response.ok) {
					let responseResult = await response.json();
					form.classList.remove('_sending');
					if (message) {
						// Нужно подключить зависимость
						popupItem.open(`#${message}`);
					}
					formValidate.formClean(form);
				} else {
					alert("Ошибка");
					form.classList.remove('_sending');
				}
			}
			// If test
			if (form.hasAttribute('data-test')) {
				e.preventDefault();
				if (message) {
					// Нужно подключить зависимость
					popupItem.open(`#${message}`);
				}
				formValidate.formClean(form);
			}
		} else {
			const formError = form.querySelector('._error');
			if (formError && form.hasAttribute('data-goto-error')) {
				// Нужно подключить зависимость
				gotoBlock(formError, 1000, 50);
			}
			e.preventDefault();
		}
	}
}
/* Модуь формы "показать пароль" */
export function formViewpass() {
	document.addEventListener("click", function (e) {
		let targetElement = e.target;
		if (targetElement.closest('[class*="__viewpass"]')) {
			let inputType = targetElement.classList.contains('active') ? "password" : "text";
			targetElement.parentElement.querySelector('input').setAttribute("type", inputType);
			targetElement.classList.toggle('active');
		}
	});
}
/* Модуь формы "колличество" */
export function formQuantity() {
	document.addEventListener("click", function (e) {
		let targetElement = e.target;
		if (targetElement.closest('.quantity__button')) {
			let value = parseInt(targetElement.closest('.quantity').querySelector('input').value);
			if (targetElement.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				--value;
				if (value < 1) value = 1;
			}
			targetElement.closest('.quantity').querySelector('input').value = value;
		}
	});
}
/* Модуь звездного рейтинга */
export function formRating() {
	const ratings = document.querySelectorAll('.rating');
	if (ratings.length > 0) {
		initRatings();
	}
	// Основная функция
	function initRatings() {
		let ratingActive, ratingValue;
		// "Бегаем" по всем рейтингам на странице
		for (let index = 0; index < ratings.length; index++) {
			const rating = ratings[index];
			initRating(rating);
		}
		// Инициализируем конкретный рейтинг
		function initRating(rating) {
			initRatingVars(rating);

			setRatingActiveWidth();

			if (rating.classList.contains('rating_set')) {
				setRating(rating);
			}
		}
		// Инициализайция переменных
		function initRatingVars(rating) {
			ratingActive = rating.querySelector('.rating__active');
			ratingValue = rating.querySelector('.rating__value');
		}
		// Изменяем ширину активных звезд
		function setRatingActiveWidth(index = ratingValue.innerHTML) {
			const ratingActiveWidth = index / 0.05;
			ratingActive.style.width = `${ratingActiveWidth}%`;
		}
		// Возможность указать оценку 
		function setRating(rating) {
			const ratingItems = rating.querySelectorAll('.rating__item');
			for (let index = 0; index < ratingItems.length; index++) {
				const ratingItem = ratingItems[index];
				ratingItem.addEventListener("mouseenter", function (e) {
					// Обновление переменных
					initRatingVars(rating);
					// Обновление активных звезд
					setRatingActiveWidth(ratingItem.value);
				});
				ratingItem.addEventListener("mouseleave", function (e) {
					// Обновление активных звезд
					setRatingActiveWidth();
				});
				ratingItem.addEventListener("click", function (e) {
					// Обновление переменных
					initRatingVars(rating);

					if (rating.dataset.ajax) {
						// "Отправить" на сервер
						setRatingValue(ratingItem.value, rating);
					} else {
						// Отобразить указанную оцнку
						ratingValue.innerHTML = index + 1;
						setRatingActiveWidth();
					}
				});
			}
		}
		async function setRatingValue(value, rating) {
			if (!rating.classList.contains('rating_sending')) {
				rating.classList.add('rating_sending');

				// Отправика данных (value) на сервер
				let response = await fetch('rating.json', {
					method: 'GET',

					//body: JSON.stringify({
					//	userRating: value
					//}),
					//headers: {
					//	'content-type': 'application/json'
					//}

				});
				if (response.ok) {
					const result = await response.json();

					// Получаем новый рейтинг
					const newRating = result.newRating;

					// Вывод нового среднего результата
					ratingValue.innerHTML = newRating;

					// Обновление активных звезд
					setRatingActiveWidth();

					rating.classList.remove('rating_sending');
				} else {
					alert("Ошибка");

					rating.classList.remove('rating_sending');
				}
			}
		}
	}
}


export function other() {

	//Placeholers
	let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
	inputs_init(inputs);

	function inputs_init(inputs) {
		if (inputs.length > 0) {
			for (let index = 0; index < inputs.length; index++) {
				const input = inputs[index];
				const input_g_value = input.getAttribute('data-value');
				input_placeholder_add(input);
				if (input.value != '' && input.value != input_g_value) {
					input_focus_add(input);
				}
				input.addEventListener('focus', function (e) {
					if (input.value == input_g_value) {
						input_focus_add(input);
						input.value = '';
					}
					if (input.getAttribute('data-type') === "pass") {
						if (input.parentElement.querySelector('.viewpass')) {
							if (!input.parentElement.querySelector('.viewpass').classList.contains('_active')) {
								input.setAttribute('type', 'password');
							}
						} else {
							input.setAttribute('type', 'password');
						}
					}
					if (input.classList.contains('_date')) {
						/*
						input.classList.add('_mask');
						Inputmask("99.99.9999", {
							//"placeholder": '',
							clearIncomplete: true,
							clearMaskOnLostFocus: true,
							onincomplete: function () {
								input_clear_mask(input, input_g_value);
							}
						}).mask(input);
						*/
					}
					if (input.classList.contains('_phone')) {
						//'+7(999) 999 9999'
						//'+38(999) 999 9999'
						//'+375(99)999-99-99'
						input.classList.add('_mask');
						Inputmask("+375 (99) 9999999", {
							//"placeholder": '',
							clearIncomplete: true,
							clearMaskOnLostFocus: true,
							onincomplete: function () {
								input_clear_mask(input, input_g_value);
							}
						}).mask(input);
					}
					if (input.classList.contains('_digital')) {
						input.classList.add('_mask');
						Inputmask("9{1,}", {
							"placeholder": '',
							clearIncomplete: true,
							clearMaskOnLostFocus: true,
							onincomplete: function () {
								input_clear_mask(input, input_g_value);
							}
						}).mask(input);
					}
					form_remove_error(input);
				});
				input.addEventListener('blur', function (e) {
					if (input.value == '') {
						input.value = input_g_value;
						input_focus_remove(input);
						if (input.classList.contains('_mask')) {
							input_clear_mask(input, input_g_value);
						}
						if (input.getAttribute('data-type') === "pass") {
							input.setAttribute('type', 'text');
						}
					}
				});
				if (input.classList.contains('_date')) {
					const calendarItem = datepicker(input, {
						customDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
						customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
						overlayButton: 'Применить',
						overlayPlaceholder: 'Год (4 цифры)',
						startDay: 1,
						formatter: (input, date, instance) => {
							const value = date.toLocaleDateString()
							input.value = value
						},
						onSelect: function (input, instance, date) {
							input_focus_add(input.el);
						}
					});
					const dataFrom = input.getAttribute('data-from');
					const dataTo = input.getAttribute('data-to');
					if (dataFrom) {
						calendarItem.setMin(new Date(dataFrom));
					}
					if (dataTo) {
						calendarItem.setMax(new Date(dataTo));
					}
				}
			}
		}
	}
	function input_placeholder_add(input) {
		const input_g_value = input.getAttribute('data-value');
		if (input.value == '' && input_g_value != '') {
			input.value = input_g_value;
		}
	}
	function input_focus_add(input) {
		input.classList.add('_focus');
		input.parentElement.classList.add('_focus');
	}
	function input_focus_remove(input) {
		input.classList.remove('_focus');
		input.parentElement.classList.remove('_focus');
	}
	function input_clear_mask(input, input_g_value) {
		input.inputmask.remove();
		input.value = input_g_value;
		input_focus_remove(input);
	}
}

