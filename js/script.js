// Inspired by https://webdesign.tutsplus.com/tutorials/simple-full-screen-slideshow-with-vanilla-javascript--cms-34624

// varibales
const slideshow = document.querySelector(".slideshow");
const list = document.querySelector(".slideshow .slides");
const buttons = document.querySelectorAll(".slideshow .arrows .arrow");
const previousButton = document.querySelector(".slideshow .arrow-prev");
const previousButtonChild = document.querySelector(".slideshow .arrow-prev span");
const nextButton = document.querySelector(".slideshow .arrow-next");
const nextButtonChild = document.querySelector(".slideshow .arrow-next span");
const main = document.querySelector("main");
const autoplayInterval = parseInt(slideshow.dataset.autoplayInterval) || 4000;
const isActive = "is-active";
const isVisible = "is-visible";
let intervalID;

window.addEventListener("load", () => {
  changeSlide();
  autoPlay();
  stopAutoPlayOnHover();
  customizeArrows();
});

// change to next and previous slide
function changeSlide() {
  for (const button of buttons) {
    button.addEventListener("click", e => {
      const activeSlide = document.querySelector(".slide.is-active");
      activeSlide.classList.remove(isActive);

      if (e.currentTarget === nextButton) {
        activeSlide.nextElementSibling
          ? activeSlide.nextElementSibling.classList.add(isActive)
          : list.firstElementChild.classList.add(isActive);
      } 
		
		  else {
        activeSlide.previousElementSibling
          ? activeSlide.previousElementSibling.classList.add(isActive)
          : list.lastElementChild.classList.add(isActive);
      }
    });
  }
}

// autoplay and stop on hover
function autoPlay() {
  if (slideshow.dataset.autoplay === "true") {
    intervalID = setInterval(() => {
      nextButton.click();
    }, autoplayInterval);
  }
}

function stopAutoPlayOnHover() {
  if (
    slideshow.dataset.autoplay === "true" &&
    slideshow.dataset.stopAutoplayOnHover === "true"
  ) {
    slideshow.addEventListener("mouseenter", () => {
      clearInterval(intervalID);
    });

    slideshow.addEventListener("touchstart", () => {
      clearInterval(intervalID);
    });
  }
}

function customizeArrows() {
  slideshow.addEventListener("mousemove", mousemoveHandler);
  slideshow.addEventListener("touchmove", mousemoveHandler);
  slideshow.addEventListener("mouseleave", mouseleaveHandler);
  main.addEventListener("touchstart", mouseleaveHandler);
}

function mousemoveHandler(e) {
  const width = this.offsetWidth;
  const xPos = e.pageX;
  const yPos = e.pageY;
  const xPos2 = e.pageX - nextButton.offsetLeft - nextButtonChild.offsetWidth;

  if (xPos > width / 2) {
    previousButton.classList.remove(isVisible);
    nextButton.classList.add(isVisible);

    nextButtonChild.style.left = `${xPos2}px`;
    nextButtonChild.style.top = `${yPos}px`;
  } else {
    nextButton.classList.remove(isVisible);
    previousButton.classList.add(isVisible);

    previousButtonChild.style.left = `${xPos}px`;
    previousButtonChild.style.top = `${yPos}px`;
  }
}

function mouseleaveHandler() {
  previousButton.classList.remove(isVisible);
  nextButton.classList.remove(isVisible);
}