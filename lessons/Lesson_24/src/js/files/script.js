// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
// import { isMobile } from "./functions.js";
// import { formsModules } from "./forms/forms.js";


const pcsRemove = document.querySelector('.pcs__remove');
const pcsRemove2 = document.querySelector('#removeBtn');
const clearAll = document.querySelector('.clear-all');
const pcsWrapper = document.querySelector('.pcs__wrapper');
const pcsWrapper2 = document.querySelector('#wrapp');


function removeWrapper(event) {
	pcsWrapper.classList.add('_active')
}
function removeWrapper2(event) {
	pcsWrapper2.classList.add('_active')
}
function removeAll(event) {
	pcsWrapper.classList.add('_active')
	pcsWrapper2.classList.add('_active')
}
pcsRemove.addEventListener('click', removeWrapper)
pcsRemove2.addEventListener('click', removeWrapper2)
clearAll.addEventListener('click', removeAll)