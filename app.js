/**
 * PAGE GENERATION ------------------------------
 * PAGE GENERATION ------------------------------
 * PAGE GENERATION ------------------------------
 */

const nav = document.querySelector('.navbar')
const cvContainer = document.querySelector('.cvContainer')

/**
 * 
 * @param {string} type 
 * @param {string} className 
 * @returns 
 */
const createHTMLElement = (type, className) => {
    let element = document.createElement(type)
    element.classList.add(className)
    return element
}

/**
 * 
 * @param {Array} data 
 */
const getNavigation = (data) => {
    data.forEach(element => {
        let a = createHTMLElement('a', 'nav__link')
        a.href = `#${element.sectionName}`
        a.innerHTML = element.sectionName
        //a.setAttribute('id', element.sectionName)
        nav.appendChild(a)
    })
}
/**
 * 
 * @param {Object} object 
 * @param {HTMLElement} elementContainer 
 */
const getCVElement = (object, elementContainer) => {
    for(const [key, value] of object) {
        if (key === "sectionName") {
            let title = document.createElement('h3')
            title.innerHTML = value
            elementContainer.prepend(createHTMLElement('div', 'cv__titleDecoration'))
            elementContainer.prepend(title)
        } else {
            elementContainer.innerHTML+= `
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


window.onload = () => {
    getNavigation(dataEn)
    getCV(dataEn, 0)
    getCV(dataEn, 1)
    //getRealisations(dataEn)
}

/**
 * SCROLL SPY ------------------------------
 * SCROLL SPY ------------------------------
 * SCROLL SPY ------------------------------
 */

 const ratio = .6
 let observer = null
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
        if (entry.intersectionRatio > 0) {
            activateLink(entry.target)
            animateBlock(entry.target)
        }
    })
}

const spies =  document.querySelectorAll('[data-spy]')


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
}

/**
 * Avoid unnescessary calculs
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
        if (window.innerHeight !== windowH){
            debounce(observe(spies), 500)
            windowH = window.innerHeight
        }
    }
}
