/**
 * Get position of an HTMLElement beside the page's top.
 * @param {HTMLElement} element 
 * @param {} acc
 * @returns {number}
 */
const offsetTop = (element, acc = 0) => {
    if (element.offsetParent) {
        return offsetTop(element.offsetParent, acc + element.offsetTop)
    }
    return acc + element.offsetTop
}

class Parallax {
    /**
     * 
     * @param {HTMLElement} element 
     */
    constructor(element) {
        this.element = element
        this.ratio = parseFloat(element.dataset.parallax)
        this.onScroll = this.onScroll.bind(this)
        this.onIntersection = this.onIntersection.bind(this)
        this.elementY = offsetTop(this.element) + this.element.offsetHeight / 2
        this.options = {
            rootMargin: `0px 0px ${window.innerHeight + 20}px 0px`
        }
        const observer = new IntersectionObserver(this.onIntersection, this.options)
        observer.observe(element)
        this.onScroll()
    }

    /**
     * 
     * @param {IntersectionObserverEntry[]} entries 
     */
    onIntersection(entries) {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                document.addEventListener('scroll', this.onScroll)
                this.elementY = offsetTop(this.element) + this.element.offsetHeight / 2
            } else {
                document.removeEventListener('scroll', this.onScroll)
            }
        }
    }

    onScroll() {
        window.requestAnimationFrame(() => {
            //console.log(this.element.getAttribute('id'))
            const screenY = window.scrollY + window.innerHeight / 2
            const diffY = this.elementY - screenY
            this.element.style.setProperty(`transform`, `translateY(${diffY * - 1 * this.ratio}px)`)
        })
    }
    /**
     * @returns {Parallax[]}
     */
    static bind() {
        Array.from(document.querySelectorAll('[data-parallax]')).map((element) => {
            return new Parallax(element)
        })
    }
}

Parallax.bind()