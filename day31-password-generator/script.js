const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const clipboardIconEl = document.getElementById('clipboard-icon')


clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = resultEl.innerText

    if (!password) {return}

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    clipboardIconEl.classList.remove('far')
    clipboardIconEl.classList.remove('fa-clipboard')
    clipboardIconEl.classList.add('fas')
    clipboardIconEl.classList.add('fa-clipboard-check')

    setTimeout(() => {
        clipboardIconEl.classList.remove('fas')
        clipboardIconEl.classList.remove('fa-clipboard-check')
        clipboardIconEl.classList.add('far')
        clipboardIconEl.classList.add('fa-clipboard')
    }, 3000)
})

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = ''
    const typesCount = lower + upper + number + symbol
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])

    if (typesCount === 0) {
        return ''
    }

    for (let i = 0; i < length; i++) {
        const funcHash = typesArr[Math.floor(Math.random()*(typesCount))]
        const funcName = Object.keys(funcHash)[0]
        generatedPassword += randomFunc[funcName]()
    }

    return generatedPassword
}

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value // add '+' to make length to number
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})


const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}