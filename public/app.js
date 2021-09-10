/**
 * PAGE GENERATION ------------------------------
 * PAGE GENERATION ------------------------------
 * PAGE GENERATION ------------------------------
 */

const nav = document.querySelector('.navbar')
const cvContainer = document.querySelector('.cvContainer')
const enButton = document.querySelector('#enButton')
const frButton = document.querySelector('#frButton')
const introContainer = document.querySelector('.intro__container')
const contactContainer = document.querySelector('#Contact')
const worksContainer = document.querySelector('.worksContainer')

/**
 * 
 * @param {string} type 
 * @param {string} className 
 * @returns 
 */
const createHTMLElement = (type, className) => {
    let element = document.createElement(type)
    if (className !== null) {
        element.classList.add(className)
    }
    return element
}

/**
 * 
 * @param {Array} data 
 */
const getNavigation = (data) => {
    data.forEach(element => {
        let a = createHTMLElement('a', 'navbar__link')
        a.href = `#${element.sectionName}`
        a.innerHTML = element.sectionName
            //a.setAttribute('id', element.sectionName)
        nav.appendChild(a)
    })
}

/**
 * 
 * @param {Array} data 
 */
const getIntroduction = (data) => {
        let title = createHTMLElement('h1')
        let bio = createHTMLElement('p')
        title.innerHTML = data[0].sectionName
        bio.innerHTML = data[0].bio
        introContainer.appendChild(title)
        introContainer.appendChild(createHTMLElement('hr'))
        introContainer.appendChild(bio)

    }
    /**
     * 
     * @param {Object} object 
     * @param {HTMLElement} elementContainer 
     */
const getCVElement = (object, elementContainer) => {
    for (const [key, value] of object) {
        if (key === "sectionName") {
            let title = document.createElement('h3')
            title.innerHTML = value
            elementContainer.prepend(createHTMLElement('div', 'cv__titleDecoration'))
            elementContainer.prepend(title)
        } else {
            elementContainer.innerHTML += `
            <div class="year">${value.year}</div>
            <div class="action">${value.occupation}</div>
            `
        }
    }
}

/**
 * Create elements container in CV part.
 * @param {Object} data 
 */
const getCV = (data, i) => {

    let elementsContainer = createHTMLElement('div', 'elementsContainer')
    cvContainer.append(elementsContainer)
    getCVElement(Object.entries(data[i]), elementsContainer)

}

/* *
 * 
 * @param {Array} data 
 */
const getProductions = (data) => {
    let title = createHTMLElement('h3')
    title.innerHTML = data[2].sectionName
    worksContainer.appendChild(title)

    let carouselContainer = createHTMLElement('div', 'carouselContainer')
    worksContainer.appendChild(carouselContainer)
    carouselContainer.appendChild(createHTMLElement('div', 'articlesContainer'))
    for (const [key, value] of Object.entries(data[2])) {
        if (key === "sectionName") return
        else {
            let articleContainer = createHTMLElement('article', 'articleContainer')
            console.log('test')
        }
    }

}

/**
 * 
 * @param {Array} data 
 */
const getContactForm = (data) => {
    contactContainer.innerHTML = `
    <section>
    <h2>Contact</h2>
    <a href="mailto:galliot.arthur@gmail.com">${data[3].sendMeMail}</a>

    <form action="" class="contact__form">
        <input type="text" placeholder="${data[3].name}">
        <input type="email" placeholder="${data[3].mail}">
        <input type="phone" placeholder="${data[3].phone}">
        <textarea name="message" id="message" cols="30" rows="10"></textarea>
        <button type="submit">${data[3].send}</button>
    </form>
</section>`
}

/**
 * 
 * @param {Array} data 
 */
const pageGeneration = (data) => {
    // clean elements
    introContainer.innerHTML = ""
    cvContainer.innerHTML = ""
    nav.innerHTML = ""
    worksContainer.innerHTML = ""
        // generate elements
    getNavigation(data)
    getIntroduction(data)
    getCV(data, 1)
    getCV(data, 2)
    getProductions(data)
    getContactForm(data)
}


window.onload = () => {
    pageGeneration(dataEn)
}

frButton.onclick = () => pageGeneration(dataFr)
enButton.onclick = () => pageGeneration(dataEn)






/**
 * SCROLL SPY ------------------------------
 * SCROLL SPY ------------------------------
 * SCROLL SPY ------------------------------
 */

const ratio = .6
let observer = null
const spies = document.querySelectorAll('[data-spy]')

/**
 * 
 * @param {HTMLElement} element 
 */
const activateLink = (element) => {
    const id = element.getAttribute('id')
    const anchor = document.querySelector(`a[href="#${id}"]`)
    if (anchor === null) {
        return null
    }
    anchor.parentElement
        .querySelectorAll('.active')
        .forEach(node => node.classList.remove('active'))
    anchor.classList.add('active')
}

/**
 * 
 * @param {HTMLElement} element 
 */
const animateBlock = (element) => {
    document
        .querySelectorAll('.sectionActive')
        .forEach(node => node.classList.remove('sectionActive'))
    element.childNodes[1].classList.add('sectionActive')
}

/**
 * 
 * @param {IntersectionObserverEntry[]} entries 
 * @param {IntersectionObserver} observer 
 */
const callback = (entries, observer) => {
    entries.forEach(entry => {
        console.log(entry.intersectionRatio)
        if (entry.intersectionRatio > 0) {
            activateLink(entry.target)
            animateBlock(entry.target)
        }
    })
}


/**
 * 
 * @param {NodeListOf.<Element>} elements 
 */
const observe = (elements) => {
    if (observer !== null) {
        elements.forEach(element => observer.unobserve(element))
    }
    const y = Math.floor(window.innerHeight * ratio)
    observer = new IntersectionObserver(callback, {
        rootMargin: `-${window.innerHeight - y - 1}px 0px -${y}px 0px`
    })
    spies.forEach(spy => observer.observe(spy))
    let hr_y = createHTMLElement('hr', 'hr_y')
    let hr_y_bis = createHTMLElement('hr', 'hr_y')
    hr_y.style.top = `${window.innerHeight - y - 3}px`
    hr_y_bis.style.top = `${y}px`
        //document.querySelector('body').appendChild(hr_y)
        //document.querySelector('body').appendChild(hr_y_bis)
}

/**
 * Avoid unnecessary calculations
 * @param {Function} callback 
 * @param {number} delay 
 * @returns {Function}
 */
const debounce = (callback, delay) => {
    let timer
    return () => {
        let args = arguments
        let context = this
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback.apply(context, args)
        }, delay)
    }
}

if (spies.length > 0) {
    observe(spies)
    let windowH = window.innerHeight
    window.onresize = () => {
        if (window.innerHeight !== windowH) {
            debounce(observe(spies), 500)
            windowH = window.innerHeight
        }
    }
}

let archive = function() {

}


for (var i = 0; i < 5; i++) {
    console.log(i)
}
console.log('n :', n)