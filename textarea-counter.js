const textarea =  document.querySelector('textarea');

const textareaCounter = document.querySelector('[name=textareaCounter]');

const counter = textarea.getAttribute('maxLength') - textarea.value.length;

this.actualiceCounter(counter);

function actualiceCounter (n) {
    textareaCounter.innerHTML = n;
}

function newValue(event) {
    actualiceCounter(textarea.getAttribute('maxLength') - textarea.value.length);
}

textarea.addEventListener('input', this.newValue);