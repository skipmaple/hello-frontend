const password = document.getElementById('password')
const background = document.getElementById('background')

password.addEventListener('input', (e) => {
    const input = e.target.value
    // console.log(input)
    background.style.filter = `blur(${(10 - input.length) * 2}px)`
})