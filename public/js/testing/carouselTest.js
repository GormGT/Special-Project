// shorter query selectors
const $ = str => document.querySelector(str);
const $$ = str => document.querySelectorAll(str);

// get all levels
const levels = Array.from($$('.level'));

class Carousel {
    constructor(prevButton, nextButton, index) {
        this.prevButton = prevButton;
        this.nextButton = nextButton;
        this.index = index;
    }

    indexHandler(increment) {
        // change index
        if (increment) {
            this.index++;
        } else {
            this.index--;
        }
    }

    indexCheck(index) {
        if (index < 1) {
            index = levels.length;
        } else if (index > levels.length) {
            index = 1;
        }

        return index;
    }

    changeIndex(increment) {
        // change index
        this.indexHandler(increment);

        // make sure index stays within levels
        this.index = this.indexCheck(this.index);

        // add .hidden to all
        levels.forEach(level => {
            level.classList.add('hidden');
        });

        // remove .hidden from current index
        const currentLevel = $(`#level${this.index}`);
        currentLevel.classList.remove('hidden');
    }
}

// create class & add event listeners
const imgCarousel = new Carousel($('.prev'), $('.next'), 1);

imgCarousel.prevButton.addEventListener('click', () => {
    imgCarousel.changeIndex(false);
});
imgCarousel.nextButton.addEventListener('click', () => {
    imgCarousel.changeIndex(true)
});