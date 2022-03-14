const header = document.querySelector('.header')

function headerOpacity() {
    let offsetTop = window.pageYOffset

    if (offsetTop > 1) {
        header.style.background = 'rgba(0, 0, 0, .9)'
    } else {
        header.style.background = ''
    }
}

window.addEventListener('load', headerOpacity)

window.addEventListener('scroll', headerOpacity)


const burgerMenu = document.querySelector('.burger-menu')

burgerMenu.addEventListener('click', function () {
    console.log('dasdas')
    const burgerContent = document.querySelector('.nav__content')

    burgerContent.classList.toggle('active')
})