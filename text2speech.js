const msg = new SpeechSynthesisUtterance();

let vowel = 'i';
const vowelList = ['a', 'e', 'i', 'o', 'u'];
const accents = {
    a:{
        l: 'á', u: 'Á'
    },
    e:{
        l: 'é', u: 'É'
    },
    i:{
        l: 'í', u: 'Í'
    },
    o:{
        l: 'ó', u: 'Ó'
    },
    u:{
        l: 'ú', u: 'Ú'
    },
}
const vowelSelection = document.querySelector('[name="vowel"]');

const translateButton = document.querySelector('#translate');
const translateAllButton = document.querySelector('#translateAll');
const speakButton = document.querySelector('#speak');

const vowelsListHtml = document.querySelector('#vowelsList');

msg.text = document.querySelector('[name="text"]').value;

const showTranslation = document.querySelector('#translation');

function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg);
    }
}

function setOption() {
    msg[this.name] = this.value;
    toggle();
}

function changeVowels(str, newVowel = 'i') {
    return str.replace(/[aeiou]/g, newVowel).replace(/[AEIOU]/g, newVowel.toUpperCase())
        .replace(/[áéíóú]/g, accents[newVowel].l).replace(/[ÁÉÍÓÚ]/g, accents[newVowel].u);
}

function translate() {
    showTranslation.innerText = changeVowels(document.querySelector('[name="text"]').value, vowel);
    msg.text = showTranslation.innerText;
}

function translateAll() {
    document.querySelectorAll('h1, label, option, p, button').forEach((e) => {
        e.innerText = changeVowels(e.innerText, vowel);
    })
}

function actualiceSelectedLetter() {
    document.querySelectorAll('input[type="radio"]').forEach((e) => {if(e.checked)vowel=e.value});
}

function populateVovelsSelect() {

    vowelsListHtml.innerHTML = vowelList.map(v => `
            <input type="radio" name="vowels" value="${v}" id="vowel${v}" ${v === 'i' ? 'checked' : ''}>
            <label for="vowel${v}">${v}</label>
        `)
        .join('');
}


populateVovelsSelect()
speakButton.addEventListener('click', toggle);
translateButton.addEventListener('click', () => translate(false));
translateAllButton.addEventListener('click', () => translateAll(false));

const radioInputList = document.querySelectorAll('input[type="radio"]');

radioInputList.forEach((e) => {
    e.addEventListener('change', actualiceSelectedLetter);
});
