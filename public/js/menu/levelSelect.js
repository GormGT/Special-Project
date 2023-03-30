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

    indexHandler(index, increment) {
        // change index
        if (increment) {
            index++;
        } else {
            index--;
        }

        return index;
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
        this.index = this.indexHandler(this.index, increment);

        // make sure index stays within levels
        this.index = this.indexCheck(this.index);

        // get previous & next image
        let prevIndex = this.indexHandler(this.index, false);
        let nextIndex = this.indexHandler(this.index, true);

        // make sure next & previous index stays within levels
        prevIndex = this.indexCheck(prevIndex);
        nextIndex = this.indexCheck(nextIndex);

        // add .hidden to all & remove .leftImg & .rightImg from all
        levels.forEach(level => {
            level.classList.add('hidden');

            level.classList.remove('leftImg');
            level.classList.remove('rightImg');
        });

        // remove .hidden from current index
        const currentLevel = $(`#level${this.index}`);
        currentLevel.classList.remove('hidden');

        // add .leftImg & .rightImg to previous & next index
        const leftImage = $(`#level${prevIndex}`);
        const rightImage = $(`#level${nextIndex}`);

        leftImage.classList.add('leftImg');
        rightImage.classList.add('rightImg');

        // remove hidden from left & right image
        leftImage.classList.remove('hidden');
        rightImage.classList.remove('hidden');
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